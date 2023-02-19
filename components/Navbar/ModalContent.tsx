import Link from 'next/link'
import {useState, useContext} from 'react';
import {signOut} from 'next-auth/react'
import {profileContext} from '../../utils/ProfileLinks'

export const ModalContent = () => {

    const {modalStatus,setModalStatus} = useContext(profileContext)
   

    return (
        <div onMouseEnter={()=>{setModalStatus(true)}} onMouseLeave={()=>{setModalStatus(false)}} className={`${modalStatus ? 'flex' : 'hidden' } fixed  z-10 flex-col top-[5pc] sm:right-[1.5pc] md:right-[6.15pc] lg:right-[14pc] 2xl:right-[40.5pc] 4xl:right-[61pc] xl:right-[26.5pc]  w-[200px] h-auto bg-black px-3 lg:text-xs sm:text-base rounded`}>
             <Link href="/account" legacyBehavior><a  className='py-3 w-full text-white border-b border-black-900 ' >Account</a></Link>
                <Link href="/contact" legacyBehavior><a  className='py-3 w-full text-white border-b border-black-900' >Contact Us</a></Link>
            <button className='py-3 w-full text-left text-white' onClick={()=>{signOut()}}>Sign Out</button>
        </div>
        
    )
}