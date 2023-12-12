import path from "path";
import fsPromises from "fs/promises";

export type Article = {
    id: string,
    title: string,
    filename: string,
    created_at: Date,
    markdown: string,
}

type JSONArticle = Omit<Article, "created_at" | "markdown"> & {
    created_at: string,
}

function parseJSONArticle(data: any): JSONArticle | undefined {
    const d = data as Partial<JSONArticle>;

    if (
        !(
            typeof d.id === "string" &&
            typeof d.title === "string" &&
            typeof d.filename === "string" &&
            typeof d.created_at === "string"
        )
    ) {
        console.error("data is not RawArticle");
        return undefined;
    }

    return d as JSONArticle;
}

async function fetchArticleMarkdown(filename: string) {
    const filePath = path.join(process.cwd(), "assets", "articles", filename);
    const buffer = await fsPromises.readFile(filePath);
    return buffer.toString();
}

function parseArticle(data: JSONArticle, markdown: string): Article | undefined {
    try {
        const createdAt = new Date(data.created_at);

        return {
            id: data.id,
            title: data.title,
            filename: data.filename,
            created_at: createdAt,
            markdown
        }

    } catch (e) {
        console.error("Can't parse created_at to date in article_data.json");
        return undefined;
    }
}

async function fetchJSONArticles() {
    const filePath = path.join(process.cwd(), '/assets/article_data.json');
    const buffer = await fsPromises.readFile(filePath);
    const objectData = JSON.parse(buffer.toString());

    if (!(objectData instanceof Array)) {
        return Promise.reject("article_data.json is not array.");
    }

    return objectData
        .map(d => parseJSONArticle(d))
        .filter((d): d is JSONArticle => d !== undefined);
}

export async function fetchArticles() {
    const jsonArticles = await fetchJSONArticles();
    const promises = jsonArticles
        .map(async (d) => {
            const markdown = await fetchArticleMarkdown(d.filename);
            return parseArticle(d, markdown);
        });
    const articles = await Promise.all(promises);

    return articles
        .filter((article): article is Article => article !== undefined)
        .sort((a, b) => b.created_at.getTime() - a.created_at.getTime());
}

export async function fetchArticle(id: string) {
    const jsonArticles = await fetchJSONArticles();
    const jsonArticle = jsonArticles
        .find(article => article.id === id);

    if (jsonArticle === undefined) {
        console.error(`Not found article data: ${id}`)
        return undefined;
    }

    const markdown = await fetchArticleMarkdown(jsonArticle.filename);
    const article = parseArticle(jsonArticle, markdown);

    if (article === undefined) {
        console.error(`Article of ${id} is undefined.`)
        return undefined;
    }

    return article;
}