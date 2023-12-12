import {fetchArticle, fetchArticles} from "@/_api/articleApi";
import markdownHtml from "zenn-markdown-html";
import Link from "next/link";
import 'zenn-content-css';

export async function generateStaticParams() {
    const articles = await fetchArticles();

    return articles.map(article => ({id: article.id}));
}

export default async function ArticlePage({params}: {
    params: { id: string }
}) {
    const {id} = params;
    const article = await fetchArticle(id);

    return (
        <main className={"max-w-screen-md"}>
            {article ?
                <div className={"flex flex-col gap-16 mt-4"}>
                    <div className={"flex flex-col gap-4 items-start"}>
                        <h1 className={"text-2xl"}>{article.title}</h1>
                        <div className={"text-gray-400 text-sm"}>{article.created_at.toLocaleDateString()}</div>
                    </div>
                    <div
                        className="znc"
                        // htmlを渡す
                        dangerouslySetInnerHTML={{
                            __html: markdownHtml(article.markdown),
                        }}
                    />
                </div>
                : // エラー
                <>
                    <h1>記事が見つかりませんでした</h1>
                    <Link href={"/articles"}>記事一覧へ戻る</Link>
                </>
            }
        </main>
    )
}