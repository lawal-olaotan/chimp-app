import {Login} from '@components/Auth/Login'; 
import { useEffect} from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

const LoginIn = () => {

    const router = useRouter();
    useEffect(()=>{
        getSession()
        .then((session)=>{
            if(session){
                router.push('/')
            }
        })
 },[router])

    return (
        <>
            <Login/>
        </>
    )
}

export default LoginIn;