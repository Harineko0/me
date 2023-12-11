import {Metadata} from "next";

export const metadata: Metadata = {
  title: 'Articles',
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