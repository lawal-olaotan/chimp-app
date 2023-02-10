import Link from 'next/link';
import {NextPage} from 'next'; 
import Lottie from 'lottie-react'; 
import AnimationData from '../../public/anim/Signup.json'


interface isEmailSentProps{
    email:string;
    name:string;
    page:string;
    emailContext:unknown
}


export const AuthEmail=()=> {

    return(
        <div className='flex flex-col items-center justify-center'>
            <h3 className='text-2xl font-bold'>You are one step away from joining us</h3>
            <div className='h-[400px] w-[400px] flex'> <Lottie animationData={AnimationData}/></div>
            <p className="text-xl font-bold">Check your email for a link to verify your account</p>
            <p>Didn't receive an email? <Link href="/login" legacyBehavior><a className='text-blue-800 underline-offset-1'>Resend</a></Link></p>
        </div>
    )
}
