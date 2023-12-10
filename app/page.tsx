import Image from 'next/image'
import MailIcon from "@/component/icon/MailIcon";

function Heading(props: {
  children?: React.ReactNode
}) {
  return (
    <h4 className={'text-foreground text-base'}>{props.children}</h4>
  )
}

export default function Home() {
  return (
    <main className="root-container">
      <div className="about common-item">
        <Heading>
          About
        </Heading>
        <ul className={'dashed'}>
          <li>kusozako software developer</li>
          <li>Java / Spigot / C / React / Next.js / Flutter / Firebase / C# / Unity / Figma</li>
          <li>MincraServer Developer (2020-)</li>
          <li>Osaka University (2023.04-)</li>
          <li>GDSC Osaka (2023.04-)</li>
        </ul>
      </div>
      <div className="works common-item">
        <Heading>
          Works
        </Heading>
        <ul className={'dashed'}>
          <li>MincraServer (2021-)</li>
          <li><a href={'https://pibrary.net'} target={'_blank'}>Pibrary</a> (2021-2022)</li>
          <li><a href={'https://machikane-coffee.web.app/'} target={'_blank'}>machikane-coffee</a> (2023-)</li>
        </ul>
      </div>
      <div className="contact common-item">
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
      <div className="twitter">
        <div className={"flex flex-row gap-4"}>
          <img src={'twitter.svg'} alt={'x-logo'} width={24}/>
          <h4 className={'text-base'}>X / Twitter</h4>
        </div>
        <div className={"flex flex-col gap-2"}>
          <div className={"flex flex-row items-center gap-4"}>
            <img className={'rounded-full'} src={'twitter_harineko0.png'} alt={'twitter-harineko0-icon'}
                 width={40}/>
            <a href={"https://twitter.com/harineko0"} target={"_blank"}>
              @harineko0
            </a>
          </div>
          <div className={"flex flex-row items-center gap-4"}>
            <img className={'rounded-full'} src={'twitter_harineko_univ.png'} alt={'twitter-harineko_univ-icon'}
                 width={40}/>
            <a href={"https://twitter.com/harineko_univ"} target={"_blank"}>
              @harineko_univ
            </a>
          </div>
        </div>
      </div>
      <div className="instagram">
        <div className={"flex flex-row gap-4"}>
          <img src={'instagram.png'} alt={'instagram-logo'} width={24}/>
          <h4 className={'text-base'}>Instagram</h4>
        </div>
        <div className={"flex flex-row items-center gap-4"}>
          <img className={'rounded-full'} src={'twitter_harineko0.png'} alt={'instagram-harineko0-icon'}
               width={40}/>
          <a href={"https://www.instagram.com/harineko0"} target={"_blank"}>
            harineko0
          </a>
        </div>
      </div>
      <div className="github">
        <div className={"flex flex-row gap-4"}>
          <img src={'github.svg'} alt={'github-logo'} width={24}/>
          <h4 className={'text-base'}>GitHub</h4>
        </div>
        <div className={"flex flex-row items-center gap-4"}>
          <img className={'rounded-full'} src={'github_harineko0.png'} alt={'github-harineko0-icon'}
               width={40}/>
          <a href={"https://github.com/Harineko0"} target={"_blank"}>
            Harineko0
          </a>
        </div>
      </div>
      <div className="qiita">
        <div className={"flex flex-row gap-4"}>
          <img src={'qiita.png'} alt={'qiita-logo'} width={24}/>
          <h4 className={'text-base'}>Qiita</h4>
        </div>
        <div className={"flex flex-row items-center gap-4"}>
          <img className={'rounded-full'} src={'twitter_harineko0.png'} alt={'qiita-harineko0-icon'}
               width={40}/>
          <a href={"https://qiita.com/Harineko0"} target={"_blank"}>
            harineko0
          </a>
        </div>
      </div>
      <div className="sizume">
        <h4 className={'text-base'}>sizu.me</h4>
        <div className={"flex flex-row items-center gap-4"}>
          <img className={'rounded-full'} src={'twitter_harineko0.png'} alt={'sizume-harineko0-icon'}
               width={40}/>
          <a href={"https://sizu.me/harineko"} target={"_blank"}>
            harineko
          </a>
        </div>
      </div>
    </main>
  )
}
