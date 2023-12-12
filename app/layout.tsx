import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from "next/link";
import './globals.css';
import Image from "next/image";
import Logo from "@/assets/images/harinekome_logo.png";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'harineko/me',
    template: '%s | harineko/me'
  },
  description: 'harineko\'s portfolio',
  metadataBase: new URL('https://harineko0.github.io'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const year = new Date().getFullYear();

  return (
    <html lang="ja">
      <body className={inter.className}>
        <header className={'flex flex-row justify-between pl-4 pr-8 py-4'}>
          <Link href={'/'} className={'no-underline flex flex-row items-center gap-1'}>
            <Image src={Logo} alt={'harineko-logo'} width={36}/>
            harineko/me
          </Link>
          <div className={'flex flex-row items-center gap-6'}>
            <Link href={'/articles'} className={'no-underline'}>
              Articles
            </Link>
          </div>
        </header>
        {children}
        <footer>
        </footer>
      </body>
    </html>
  )
}
