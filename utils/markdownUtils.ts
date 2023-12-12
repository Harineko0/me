import * as jsdom from "jsdom";
import markdownHtml from 'zenn-markdown-html';

export async function parseTextFromMarkDown(markdown: string) {
    const html = markdownHtml(markdown);
    const dom = new jsdom.JSDOM(html);
    const doc = dom.window.document;

    const walker = doc.createTreeWalker(doc, 0x4);

    const textList: string[] = [];
    let currentNode: Node | null = walker.currentNode;

    while (currentNode) {
        if (currentNode.textContent !== null) {
            textList.push(currentNode.textContent);
        }
        currentNode = walker.nextNode();
    }

    return textList;
}