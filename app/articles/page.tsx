import "./articles.css";

type Article = {
  id: string,
  title: string,
  content: string,
  created_at: Date,
}

function ArticleItem(props: Article) {
  return (
    <div>
      {props.title}
    </div>
  )
}

export default function Articles() {
  const articles: Article[] = [
    {id: "firestore-paging", title: "Firestoreのページング方法3選", content: "", created_at: new Date()},
    {id: "firestore-paging", title: "Firestoreのページング方法3選", content: "", created_at: new Date()},
    {id: "firestore-paging", title: "Firestoreのページング方法3選", content: "", created_at: new Date()},
  ];

  return (
    <main className={"flex flex-col gap-6"}>
      <h1 className={""}>Articles</h1>
      <div className={"articles-container"}>
        {articles.map(article => <ArticleItem key={article.id} {...article}/>)}
      </div>
    </main>
  )
}