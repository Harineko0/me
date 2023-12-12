import Image from "next/image";
import src from "@/assets/images/twitter.svg";

export default function TwitterIcon({width, height}: {
    width: number,
    height: number
}) {
    return (
        <Image src={src} alt={"Qiita Icon"} width={width} height={height}/>
    )
}