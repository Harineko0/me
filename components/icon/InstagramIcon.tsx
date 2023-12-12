import Image from "next/image";
import Instagram from "@/assets/images/instagram.png";

export default function InstagramIcon({width, height}: {
    width: number,
    height: number
}) {
    return (
        <Image src={Instagram} alt={"Instagram Icon"} width={width} height={height}/>
    )
}