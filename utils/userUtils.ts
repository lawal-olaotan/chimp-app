import {signIn } from 'next-auth/react';

export const postReqUtil = async (apiUrl:string,reqMethod:string,data?:{})=>{
    const apifetch =   await fetch(apiUrl,{
        method:reqMethod,
        body:JSON.stringify(data),
        headers:{
           'Content-Type':'application/json'
        }
     })

     const apifetchResponse = await apifetch.json(); 
     return apifetchResponse; 
}

 export const isUserRegistered = async (email:string) => {
    const dbResponse = await postReqUtil(`api/checkUser?email=${email}`,'GET')
    const dbResponseData = dbResponse === null ? null : await dbResponse.json();
    return dbResponseData; 
}

export const sendMagicLink = async(email:string) => {

    const isEmailSent = await signIn('email',{
        redirect:false,
        email:email,
        callbackUrl:'/'
     })

    return isEmailSent;
}

