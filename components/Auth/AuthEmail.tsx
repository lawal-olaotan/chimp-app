import Link from 'next/link';
import Lottie from 'lottie-react'; 

import { useContext } from 'react';
import {verificationContext} from '../../utils/verifyContext';
import { NextPage } from 'next';



interface isEmailSentProps{
    title:string;
    emailAnimation:unknown
}


export const AuthEmail:NextPage<isEmailSentProps> =({title,emailAnimation})=> {

    const {setEmailSentStatus} = useContext(verificationContext) 

    return(
        <div className='flex flex-col items-center justify-center'>
            <h3 className='text-xl font-medium mb-4'>{title}</h3>
            <p className="text-2xl font-bold">Check your email for a link to verify your account</p>
            <div className='h-[400px] w-[400px] flex'> <Lottie animationData={emailAnimation}/></div>
            <p>Didn't receive an email? <button onClick={()=>{setEmailSentStatus(true)}} className='text-blue-800 underline-offset-1'>Resend</button></p>
        </div>
    )
}
