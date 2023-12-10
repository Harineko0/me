import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from "next/link";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'harineko/me',
  description: 'Introduce my works',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <header className={'flex flex-row justify-between px-16 py-8'}>
          <Link href={'/'} className={'no-underline'}>
            harineko/me
          </Link>
          {/*<div className={'flex flex-row gap-8'}>*/}
          {/*  <Link href={'/'}>*/}
          {/*    About*/}
          {/*  </Link>*/}
          {/*  <Link href={'/'}>*/}
          {/*    Works*/}
          {/*  </Link>*/}
          {/*  <Link href={'/'}>*/}
          {/*    Contact*/}
          {/*  </Link>*/}
          {/*</div>*/}
        </header>
        {children}
        <footer>

        </footer>
      </body>
    </html>
  )
}
