import {useContext} from 'react';
import {profileContext} from '../../utils/ProfileLinks'
import  Image  from 'next/image';
import Link from 'next/link';

export const ProfileImage = () => {
    const {setModalStatus} = useContext(profileContext); 

    const profileradius = {
        borderRadius : '100%'
    }

    return (
        <Link href='/account' legacyBehavior>
        <a onMouseLeave={()=>{setModalStatus(false)}}   onMouseEnter={()=>{setModalStatus(true)}} className="bg-white text-black rounded-full h-[60px] w-[60px] text-center flex items-center justify-center mr-4 relative"><Image style={profileradius} src={'/profile.jpeg'} fill={true} alt='user-profile'/></a>
        </Link>
    )
} 


