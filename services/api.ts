import {signIn } from 'next-auth/react';
import { TokenExchange } from '@interfaces/index';
import {toast} from 'react-toastify'; 


export const api = async (apiUrl:string,reqMethod:string,data?:{})=>{
    const apifetch =   await fetch('/api'+ apiUrl,{
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
    const dbResponse = await api(`/checkUser?email=${email}`,'GET')
    const dbResponseData = dbResponse === null ? null : await dbResponse;
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

export const exchangeToken = async(data:TokenExchange) => {

    try{
        const {Tokendata} =  await api('/item', 'POST', { 
            public_token: data.publicToken, 
            institutionId: data.institutionId,
            accounts:data.accounts,
        })
        return Tokendata; 

    }catch(err){
        const errorMessage = err; 
        if(errorMessage && errorMessage.status === 409){
            toast.error('This account is already linked')
        }else{
            toast.error('Something went wrong, please try again later');
        }
    }

  

}

// upon getting access token, update transactions

// fetch data for 




// get items by Id 
// get items by User 
// delete items 

// get accounts ByitemsId 
// get usersaccount 

// get transactions by usersId
// get transactions by item
// get transactions by account


// for instituions logo this will be saved to db once and updated every month // AWS STUFF
// get institutions id


// Transaction context 
// Item Context
// Account
// Institution Context


