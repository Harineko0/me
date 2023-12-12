import Image from "next/image";
import GItHubSVG from "@/assets/images/github.svg";

export default function GitHubIcon({width, height}: {
    width: number,
    height: number
}) {
    return (
        <Image src={GItHubSVG} alt={"GitHub Icon"} width={width} height={height}/>
    )
}