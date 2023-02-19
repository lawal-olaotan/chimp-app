
import React,{useState, useRef, SyntheticEvent, useContext } from 'react'; 
import { FormHeader } from './FormHeader';
import { Button } from './button';
import Layout  from './Layout';
import { Inputs } from './Inputs';
import {isUserRegistered} from '../../services/api';
import {signIn} from 'next-auth/react';
import Router from 'next/router';
import { AuthEmail } from '@components/Auth/AuthEmail';
import { verificationContext } from '../../utils/verifyContext'; 
import AnimationData from '../../public/anim/SignIn.json'; 

export const Login = ()=> {

    const emailRef= useRef<HTMLInputElement>(null);
    const {isEmailSent,setEmailSentStatus} = useContext(verificationContext); 

    // function sends verification email to user registered email
    const signInUser = async(event:SyntheticEvent) => {
        event.preventDefault();
        const isUserFound = await isUserRegistered(emailRef.current?.value);

        if(isUserFound){
            const signInResponse = await signIn('email',{
                callbackUrl:'/',
                email:emailRef.current?.value,
                redirect:false
            })
            if(signInResponse.ok) setEmailSentStatus(false)
        }else{
            Router.push('/signup');
        }
    }

    return (
        <Layout title="Sign In - Access your Account | Chimp Tracker">
        {
            isEmailSent ?  <form onSubmit={signInUser} className="formbody">
            <FormHeader FormLinkText=' dont' FormTitle="Sign In" FormPath='/signup' />
                <Inputs InputType="email" inputRef={emailRef} placeholder="Email" />
                <Button value='Send Verification Link'/>
            </form> : <AuthEmail title="Welcome back, we missed you" emailAnimation={AnimationData}/>
        }
        </Layout>
    )

}