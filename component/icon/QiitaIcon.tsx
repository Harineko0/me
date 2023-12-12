import Image from "next/image";
import Qiita from "@/assets/images/qiita.png";

export default function QiitaIcon({width, height}: {
    width: number,
    height: number
}) {
    return (
        <Image src={Qiita} alt={"Qiita Icon"} width={width} height={height}/>
    )
}