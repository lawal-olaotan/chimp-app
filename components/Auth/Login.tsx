
import React,{useState, useRef, SyntheticEvent } from 'react'; 
import { FormHeader } from './FormHeader';
import { Button } from './button';
import Layout  from './Layout';
import { Inputs } from './Inputs';
import {postReqUtil, isUserRegistered} from '../../utils/userUtils';
import {signIn} from 'next-auth/react';
import Router from 'next/router';
import { AuthEmail } from '@components/Auth/AuthEmail';

export const Login = ()=> {

    const emailRef= useRef<HTMLInputElement>(null);

    // function sends verification email to user registered email
    const signInUser = async(event:SyntheticEvent) => {
        event.preventDefault();
        const isUserFound = await isUserRegistered(emailRef.current?.value);

        if(isUserFound){
            const signInResponse = await signIn('email',{
                callbackUrl:'/',
                email:emailRef.current?.value,
            })
            return signInResponse;
        }else{
            Router.push('/signup');
        }
    }

    return (
        <Layout title="Sign In - Access your Account | Chimp Tracker">
        <form onSubmit={signInUser} className="formbody">
        <FormHeader FormLinkText=' dont' FormTitle="Sign In" FormPath='/signup' />
            <Inputs InputType="email" inputRef={emailRef} placeholder="Email" />
            <Button value='Send Verification Link'/>
        </form>
        </Layout>
    )

}