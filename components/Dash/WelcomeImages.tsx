import { NextPage } from "next"
import Image from "next/image"

interface IWelcomeImages {
    imagePath:string
    imageAlt:string
    imageText:string
}

export const WelcomeImages:NextPage<IWelcomeImages> = (IWelcomeImages) => {
    const { imagePath,imageAlt,imageText} = IWelcomeImages
    return (

        <div className="p-2 h-[200px] w-[200px] rounded-md border-slate-300 border mr-4 flex items-center flex-col product-button">
            <Image src={imagePath} alt={imageAlt}  height={145} width={145}/>
            <h4 className="text-sm">{imageText}</h4>
        </div>

    )
}