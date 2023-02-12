import { SignUp } from "@components/Auth/SignUp"
import { useRouter } from "next/router"; 
import { getSession } from "next-auth/react";
import {useEffect} from 'react';


const Signup= () => {
    const router = useRouter();
    useEffect(()=>{
        getSession()
        .then((session)=>{
            if(session){
                router.push('/')
            }
        })
 },[router])




    return(
       <>
        <SignUp/>
       </>
    )
}

export default Signup; 