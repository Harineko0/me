import MailIcon from "@/components/icon/MailIcon";
import Image from "next/image";
import './home.css';
import TwitterIcon from "@/components/icon/TwitterIcon";
import InstagramIcon from "@/components/icon/InstagramIcon";
import GitHubIcon from "@/components/icon/GitHubIcon";
import QiitaIcon from "@/components/icon/QiitaIcon";
import TwitterHarineko from "@/assets/images/twitter_harineko0.png";
import TwitterHarinekoUniv from "@/assets/images/twitter_harineko_univ.png";
import GitHubHarineko from "@/assets/images/github_harineko0.png";
import GitHubMincra from "@/assets/images/github_mincra.jpg";
import GitHubGDSC from "@/assets/images/github_gdsc.jpg";
import {fetchArticles} from "@/_api/articleApi";
import Link from "next/link";
import {StaticImport} from "next/dist/shared/lib/get-img-props";

function Heading(props: {
  children?: React.ReactNode
}) {
  return (
    <h4 className={'text-foreground text-base'}>{props.children}</h4>
  )
}

function MyselfLink(props: {
  src: StaticImport,
  alt: string,
  href: string,
  id: string,
}) {
  return (
    <div className={"flex flex-row items-center gap-4"}>
      <Image className={'rounded-full'} src={props.src} alt={props.alt}
             width={40} height={40}/>
      <a href={props.href} target={"_blank"}>
        {props.id}
      </a>
    </div>
  )
}

export default async function Home() {
  const articles = (await fetchArticles()).slice(0, 5); // 最新から5つ

  return (
    <main className="grid-container">
      <div className="grid-item-wide grid-item-outlined">
        <Heading>
          About
        </Heading>
        <ul className={'dashed'}>
          <li>kusozako software developer</li>
          <li>Java / Spigot / C / React / Next.js / Flutter / Firebase / C# / Unity / Figma</li>
          <li>MincraServer Developer (2020-)</li>
          <li>Osaka University CS (2023.04-)</li>
          <li>GDSC Osaka (2023.04-)</li>
        </ul>
      </div>
      <div className="grid-item-square grid-item-outlined">
        <Heading>
          Works
        </Heading>
        <ul className={'dashed'}>
          <li>MincraServer (2021-)</li>
          <li><a href={'https://pibrary.net'} target={'_blank'}>Pibrary</a> (2021-2022)</li>
          <li><a href={'https://machikane-coffee.web.app/'} target={'_blank'}>machikane-coffee</a> (2023-)</li>
        </ul>
      </div>
      <div className="grid-item-square grid-item-outlined">
        <Heading>
          Contact
        </Heading>
        <div className={"flex flex-col gap-1"}>
          <div className={"flex flex-row gap-2 items-center"}>
            <MailIcon/>
            <a href={'mailto:harineko0927@gmail.com'} className={"text-sm"}>
              harineko0927@gmail.com
            </a>
          </div>
        </div>
      </div>
      <div className="grid-item-square grid-item-outlined">
        <Heading>
          Articles
        </Heading>
        <ul className={"dashed"}>
          {articles.map(article => <li key={article.id}>
            <Link href={`/articles/${article.id}`}>
              {article.title}
            </Link>
          </li>)}
        </ul>
      </div>
      <div className="github grid-item-square">
        <div className={"flex flex-row gap-4"}>
          <GitHubIcon width={24} height={24}/>
          <h4 className={'text-base'}>GitHub</h4>
        </div>
        <div className={"flex flex-col gap-3"}>
          <MyselfLink src={GitHubHarineko} alt={"github-harineko0-icon"} href={"https://github.com/Harineko0"} id={"Harineko0"}/>
          <MyselfLink src={GitHubMincra} alt={"github-mincra-icon"} href={"https://github.com/MincraServer"} id={"MincraServer"}/>
          <MyselfLink src={GitHubGDSC} alt={"github-gdsc-icon"} href={"https://github.com/gdsc-osaka"} id={"GDSC Osaka"}/>
        </div>
      </div>
      <div className="twitter grid-item-square">
        <div className={"flex flex-row gap-4"}>
          <TwitterIcon width={24} height={24}/>
          <h4 className={'text-base'}>X / Twitter</h4>
        </div>
        <div className={"flex flex-col gap-3"}>
          <MyselfLink src={TwitterHarineko} alt={"twitter-harineko0-icon"} href={"\"https://twitter.com/harineko0"} id={"harineko0"}/>
          <MyselfLink src={TwitterHarinekoUniv} alt={"twitter-harineko_univ-icon"} href={"https://twitter.com/harineko_univ"} id={"harineko_univ"}/>
        </div>
      </div>
      <div className="instagram grid-item-half">
        <div className={"flex flex-row gap-4"}>
          <InstagramIcon width={24} height={24}/>
          <h4 className={'text-base'}>Instagram</h4>
        </div>
        <MyselfLink src={TwitterHarineko} alt={"instagram-harineko0-icon"} href={"https://www.instagram.com/harineko0"} id={"harineko0"}/>
      </div>
      <div className="qiita grid-item-half">
        <div className={"flex flex-row gap-4"}>
          <QiitaIcon width={24} height={24}/>
          <h4 className={'text-base'}>Qiita</h4>
        </div>
        <MyselfLink src={TwitterHarineko} alt={"qiita-harineko0-icon"} href={"https://qiita.com/Harineko0"} id={"Harineko0"}/>
      </div>
      <div className="sizume grid-item-half">
        <h4 className={'text-base'}>sizu.me</h4>
        <MyselfLink src={TwitterHarineko} alt={"sizume-harineko0-icon"} href={"https://sizu.me/harineko"} id={"harineko"}/>
      </div>
    </main>
  )
}
