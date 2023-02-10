
import Link from 'next/link';
import { NextPage } from 'next'; 


interface HeaderProps{
    FormTitle:string;
    FormPath:string;
    FormLinkText?:string;

}

export const FormHeader:NextPage<HeaderProps> = ({FormTitle,FormPath,FormLinkText})=> {
    return(
            <div className="flex items-center justify-between mb-4 ">

                <h1 className="text-2xl font-bold text-black">{FormTitle}</h1>

                <Link href={FormPath} legacyBehavior>
                    <a className='text-blue-800'>I{FormLinkText} have an account</a>
                </Link>

            </div>
    )
}