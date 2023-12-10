import Link from "next/link";

export default function Custom404() {
  return <main className={"h-96 flex flex-col justify-center gap-8 items-center"}>
    <p className={"text-center text-xl"}>404 - ページが見つかりませんでした</p>
    <Link href={'/'}>
      トップへもどる
    </Link>
  </main>
}