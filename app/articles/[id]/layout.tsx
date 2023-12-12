import {Metadata} from "next";
import {fetchArticle} from "@/_api/articleApi";

type Props = {
    params: { id: string }
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
    const id = params.id
    const product = await fetchArticle(id);

    return {
        title: product ? product.title : "記事が見つかりません",
    }
}

export default function Page({children}: {
    children: React.ReactNode
}) {
    return (
      <>
          {children}
      </>
    )
}