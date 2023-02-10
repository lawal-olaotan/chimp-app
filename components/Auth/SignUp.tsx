import { FormHeader } from './FormHeader';
import React,{useState, useRef } from 'react'; 
import { Button } from './button';
import Layout  from './Layout';
import { Inputs } from './Inputs';
import Link from 'next/link';
import {signIn} from 'next-auth/react'; 
import { AuthEmail } from './AuthEmail';
import { Contact} from '../../interfaces/index'



export const SignUp = ()=> {

     const emailRef= useRef<HTMLInputElement>(null);
     const nameRef= useRef<HTMLInputElement>(null);
     const [isEmailSent,setEmailSentStatus] = useState<Boolean>(true)
     const [status, setMarketingStatus] = useState<Boolean>(true)


     const registerUser = async (event:React.SyntheticEvent)=>{

         event.preventDefault();
   
         const email = emailRef.current?.value;
         const name = nameRef.current?.value;
         
         const isEmailSent = await signIn('email',{
            redirect:false,
            email:email,
            name:name
         })

         if(isEmailSent.ok){
            setEmailSentStatus(false)


            // if user is subscribed add to list here
            if(status){

               const user:Contact ={
                  name:name,
                  email:email,
                  status:'subscribed'
               }

               // add email,name and status to mailchimp Audience 
               saveUserToMailChimp(user) 
            
            }
         }

   

         // check if user is registered -> if yes is the session valid -> if se
         // and route to dashboard

         // save user to DB 
         // check if User is already created and session has exipred 
         // send email verification - use fmr solution as we setup domain
         // if user checks marketing email push to hubspot - important to get done 
         // Set UserInfo for verification page 
         // for loginpage 
   
         // redirect to email verification page
     }

     const saveUserToMailChimp = async(contact:Contact)=>{

      try{

         const AudienceContact:Contact = contact; 

         const mailChimpResponse = await fetch(`https://${process.env.NEXT_PUBLIC_MAILCHIMP_REGION}.api.mailchimp.com/3.0/lists/${process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCEID}/members`, {
            method:'POST',
            body:JSON.stringify(AudienceContact),
            headers:{
               Authorization: `apikey ${process.env.NEXT_PUBLIC_MAILCHIMP_APIKEY}`,
               'Content-Type':'application/json'
            }
         })

        console.log(mailChimpResponse);



      }catch(e){
         console.log(e)
      }

        

         

     }

   //  handler function 
     const checkHandler = ()=> {
         setMarketingStatus(!status)
     }



    return(
     <Layout title="Sign Up - Create a free Account | Chimp Tracker">
      {

         isEmailSent ? <form className='formbody' onSubmit={registerUser}>
         <FormHeader FormTitle='Sign Up' FormPath="/login" />
         
        <Inputs InputType="email" inputRef={emailRef} placeholder="Email"/>

        <Inputs InputType="name" inputRef={nameRef} placeholder="name"/>
         
         <div className='my-8 flex items-center'>
              <input type="checkbox" name="marketing" checked={true} onChange={checkHandler} />
              <label className='ml-2 text-xs' htmlFor="marketing">Send me product updates, offers, and reports.</label>
         </div>

          <span className='my-4 text-xs'>By signing up, you agree to our 
                <Link href="/terms" legacyBehavior><a className='text-blue-800 underline-offset-1'> Terms and Conditions</a></Link> and 
                <Link  href="/privacy" legacyBehavior><a className='text-blue-800 underline-offset-1'> Privacy Policy</a></Link>
          </span>

         <Button value='Agree and Sign Up'/>
      </form> : <AuthEmail/>
      }
        
     </Layout>
    )
}