import {Metadata} from "next";
import "./articles.css";

export const metadata: Metadata = {
  title: {
    template: '%s | harineko/me', // /articles/[id] の title のために必要
    default: 'Articles'
  },
  description: '',
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