import {Metadata} from "next";

export const metadata: Metadata = {
  title: 'Articles | harineko/me',
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