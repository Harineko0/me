[GDSC Japan Advent Calender 2023](https://qiita.com/advent-calendar/2023/gdsc-japan) 1日目

## はじめに
先日、Firestore を使用してとあるアプリを開発していたところ、以下の機能が必要になりました。

* データを1画面に複数件表示し、複数ページに分ける
* ページ番号を指定して表示する
* 作成日でソートし、昇順・降順を切り替える
* どの期間のデータを表示するかを指定可能

この機能を実装するためにあれこれ調べたので、これを例としてFirebase Firestoreでページングを実装する方法を3パターン紹介します。

## ところで: RDBではどう実装するのか？
FirestoreはNoSQLですが、実装方法を考えるためにMySQLなどのRDBでページングを実現する方法も調べてみました。
どうやら以下の2つの方法があるようです。

1. オフセット法
1. シーク法

オフセット法は、単純にデータをある順番に並び替えたあと、`前から n 番目以降を m 件取得`というクエリを発行する方法です。メリットは実装が単純なこと、デメリットは読み出し速度が遅いこと。

シーク法は、前ページの最後のデータをキーにしてクエリを発行する方法です。メリットは読み出しが早いこと、デメリットは実装が複雑なことと任意のページに飛んで表示するのが面倒なこと。

[参考1: offsetでページネーションは遅い。これからはシーク法だ！](https://qiita.com/madilloar/items/b4e786a932ef9d4551b9#%E3%82%B7%E3%83%BC%E3%82%AF%E6%B3%95%E3%81%AE%E7%89%B9%E5%BE%B4)
[参考2: で、オフセット法に比べてシーク法のページネーションはどれだけ早いの？RDB毎に。](https://qiita.com/madilloar/items/5625e61cf3e348d08ef8#%E5%8B%95%E6%A9%9F)

以上を参考に、Firestoreのページングについて考察していきます。

## 案1: オフセット法
Firebase Admin SDK (サーバーが使うやつ) には, MySQLのような `offset` が実装されています。
[API Reference](https://googleapis.dev/nodejs/firestore/latest/CollectionReference.html#offset)

```TypeScript
const firestore = getFirestore();
firestore.collection('foo').limit(10).offset(20);
```

### メリット
* 実装が割と簡単 (なように見えて、Admin SDKなのでバックエンドのAPIを用意しないといけないため割と面倒)

### デメリット
* [読み飛ばした分も課金対象になる](https://www.youtube.com/watch?v=poqTHxtDXwU&t=570s)
* Admin SDK はセキュリティルールが (恐らく?) 適用されないため、DBのアクセス権限を別途で実装しなければいけない
* 作成日降順でソートしているとき、あるページを読み込んだ後に新しいデータが追加されると次ページを表示したときに同じデータが表示される
  詳しくは[こちら](https://qiita.com/madilloar/items/b4e786a932ef9d4551b9#%E3%82%AA%E3%83%95%E3%82%BB%E3%83%83%E3%83%88%E6%B3%95%E3%81%AE%E7%89%B9%E5%BE%B4)を参照してください。

|コスト|手軽さ|パフォーマンス|
|----|----|----|
|☆☆☆|★★☆|?|

## 案2: シーク法もどき
Firestore公式は (シーク法という言葉は使っていないものの) シーク法のアルゴリズムでページングすることを推奨しています。
ただ、シーク法には任意のページだけを取得する、言い換えると前ページのデータを取得していない状態でページを取得することが難しいという欠点があります。
MySQL等では各ページの最後の値だけを取得するクエリを発行できますが、現状Firestoreではそのようなクエリを発行できません。

解決策として、Firestoreのドキュメントに`index` (ソートされた状態で前から数えた番号)を持たせます。
例えば作成日順でソートする場合、`新規作成データのindex = 最新データのindex + 1` となります。
読み取り時は `startAt()` でオフセット分だけずらして取得します。以下は読み取りコードの例です。
```TypeScript
// 昇順の場合
const limPerPage = 10; // 1ページあたりに表示する件数
const page = 2; // 表示したいページ番号
const fooCollectionRef = collection(db, 'foo');
const offset = (page - 1) * limPerPage; // ここがキモ、indexをページ分ずらす
const ascQuery = query(fooCollectionRef, limit(limPerPage), 
    orderBy('index', 'asc'),  startAt(offset));
```

```TypeScript
// 降順の場合
const limPerPage = 10; // 1ページあたりに表示する件数
const page = 2; // 表示したいページ番号
const maxIndex = 100; // コレクション内で最大ののindex, 事前に取得しておく
const fooCollectionRef = collection(db, 'foo');
const offset = (page - 1) * limPerPage; // ここがキモ、indexをページ分ずらす
const ascQuery = query(fooCollectionRef, limit(limPerPage), 
    orderBy('index', 'desc'),  startAt(maxIndex - offset));
```

ある期間に作成されたデータを取得したい場合、事前にその期間の最初または最後にあるデータの `index` を取得してクエリに渡します。

```TypeScript
// ある期間以降の最初のデータのindexを取得する
const from: Timestamp = // Timestampで期間を指定
const fooCollectionRef = collection(db, 'foo');
const q = query(fooCollectionRef, limit(1), 
    orderBy('created_at', 'asc'),  startAt(from)); // created_at はドキュメントの作成日
const snapshot = await getDocs(q);

if (!snapshot.empty) { // クエリに一致するドキュメントが存在すれば
    const fooData = snapshot.docs[0].data();
    const startAtIndex = fooData.index;
}
```

### メリット
* オフセット法よりコストが低い
* `maxIndex` を更新しない限り、[ページを送ったときに同じデータが表示される問題](https://qiita.com/madilloar/items/b4e786a932ef9d4551b9#%E3%82%AA%E3%83%95%E3%82%BB%E3%83%83%E3%83%88%E6%B3%95%E3%81%AE%E7%89%B9%E5%BE%B4)が発生しない

### デメリット
* 作成順以外でソートしたい場合、データが追加されるたびに既存のドキュメントの `index` を再設定する必要がある。
  例えば、以下のようなコレクションに新しく金額が¥150のデータを追加する場合、金額が¥200, ¥400のデータの`index`に1加算しなければなりません。

  | index | 金額 |
    | ---- | ---- |
  | 1 | ¥100 |
  | 2 | ¥200 |
  | 3 | ¥400 |

* キーとなる `index` をクライアント側で保存する必要がある
* 読み取り時、最大の `index` を取得するために余分に1だけ読み取りが発生する

|コスト|手軽さ|パフォーマンス|
|----|----|----|
|★★★|★☆☆|★★★|

## 案3: BigQueryを使う
BigQueryはDWH(データウェアハウス)の一つで、標準SQLでクエリを書けます。
また、Firestoreの"Stream Firestore to BigQuery"というExtensionを使用して、FirestoreのデータをBigQueryに流すことができます。

RDBとDWHは微妙に違うようで、MySQLともSQLの仕様が少し異なるらしく、先に述べたRDBでシーク法を実装するSQL文は使えませんでした。
(アドベントカレンダーの公開まで間に合わないので) 実際のクエリは省略します。

(BigQuery慣れてないので嘘言ってたらごめんなさい)

<details><summary>参考: BigQueryの料金</summary>

|対象|料金|無料枠|
|----|----|----|
|ストリーミング挿入|$0.012/200MB|なし|
|クエリ(オンデマンド)|$6.00 per TB| 毎月 1 TB|
</details>

|コスト|手軽さ|パフォーマンス|
|----|----|----|
|★★☆|★☆☆|?|

## まとめ
以上の3つをページングの手法として挙げましたが、個人的にはシーク法(もどき)をおすすめします。
要件や規模にもよりますが、任意ページ目を取得する機能を諦めるならソートするフィールドによらずにページングを実装できます。

そもそも複雑な複合クエリが必要となるシステムでは、NoSQLではなくRDBを採用するでしょうからね。
Firestoreを使ったシステムならシーク法で十分でしょう。

||コスト|手軽さ|パフォーマンス|
|----|----|----|----|
|オフセット法|☆☆☆|★★☆|?|
|シーク法もどき|★★★|★☆☆|★★★|
|BigQuery|★★☆|★☆☆|?|

## 参考サイト
https://mokajima.com/how-to-paginate-data-in-cloud-firestore/

https://qiita.com/madilloar/items/5625e61cf3e348d08ef8#%E5%8B%95%E6%A9%9F
