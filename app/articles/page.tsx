import {Article, fetchArticles} from "@/_api/articleApi";
import {parseTextFromMarkDown} from "@/lib/markdownUtils";
import Link from "next/link";

function ArticleItem(props: Article) {
    const parsedMarkdown = parseTextFromMarkDown(props.markdown);

    return (
      <Link href={`/articles/${props.id}`} className={"no-underline pressable"}>
          <div className={"flex flex-col gap-4"}>
              <h2 className={"text-lg"}>{props.title}</h2>
              <p className={"content text-sm leading-8 text-foreground-variant"}>{parsedMarkdown}</p>
          </div>
          <p className={"text-right text-sm text-foreground-variant"}>{props.created_at.toLocaleDateString()}</p>
      </Link>
    )
}

export default async function Articles() {
    const articles = await fetchArticles();

    return (
      <main className={"flex flex-col gap-6"}>
          <h1 className={""}>Articles</h1>
          <div className={"articles-container"}>
              {articles.map(article => <ArticleItem key={article.id} {...article}/>)}
          </div>
      </main>
    )
}