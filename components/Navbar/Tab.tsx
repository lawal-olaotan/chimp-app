import Link from 'next/link';
import { NextPage } from 'next'; 
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {IconDefinition} from '@fortawesome/free-solid-svg-icons'

interface Props{
    tabName:string;
    tabLink:string;
    tabIcon:IconDefinition
}

export const Tab:NextPage<Props>=({tabLink,tabName,tabIcon})=> {
    const router = useRouter();
    return (
        <Link href={tabLink} legacyBehavior><a className={`${router.pathname == tabLink ? "text-primary": 'text-slate-400'} sm:p-1 md:px-6 md:py-4 mr-2 sm:font-bold md:font-normal flex flex-col items-center justify-center`}> 
        <FontAwesomeIcon icon={tabIcon}/>
        <span className='mt-2 text-sm font-normal'>{tabName}</span>
        </a></Link>

    )
}