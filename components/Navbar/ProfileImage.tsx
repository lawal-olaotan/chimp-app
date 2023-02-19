import { useEffect, useContext, useState} from 'react';
import {sessionContext} from '../../utils/sessionContext';
import {profileContext} from '../../utils/ProfileLinks'
import { useRouter } from 'next/router';

export const ProfileImage = () => {

    const {sessionData} = useContext(sessionContext); 
    const [profileName, setProfileName] = useState<string>();
    const {setModalStatus} = useContext(profileContext)
    const router = useRouter();

    useEffect(()=> {
        if(sessionData !== undefined){
            const getFirstTwoLetters = GenerateProfileLetters()
            setProfileName(getFirstTwoLetters)
        }else{
            router.push('/')
        }
    }, [sessionData])

    const GenerateProfileLetters = ()=> {
        const name = sessionData?.name
        const nameArray = name.split('').slice(0,2).join('').toLocaleUpperCase()
        console.log(nameArray); 
        return nameArray;
    }

    return (
        <button onMouseLeave={()=>{setModalStatus(false)}}   onMouseEnter={()=>{setModalStatus(true)}} className="bg-white text-black rounded-full h-[60px] w-[60px] text-center flex items-center justify-center mr-4">{profileName}</button>
    )
} 