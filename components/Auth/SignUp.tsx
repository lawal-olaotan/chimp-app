import { FormHeader } from './FormHeader';
import React,{useState, useRef, useContext } from 'react'; 
import { Button } from './button';
import Layout  from './Layout';
import { Inputs } from './Inputs';
import Link from 'next/link';
import {signIn} from 'next-auth/react'; 
import { AuthEmail } from './AuthEmail';
import { Contact} from '../../interfaces/index'
import { useRouter } from 'next/router';
import {api, isUserRegistered} from '../../services/api';
import { verificationContext } from '../../utils/verifyContext'; 
import AnimationData from '../../public/anim/Signup.json'; 


export const SignUp = ()=> {
     const emailRef= useRef<HTMLInputElement>(null);
     const nameRef= useRef<HTMLInputElement>(null);
     const {isEmailSent,setEmailSentStatus} = useContext(verificationContext);
     const [marketingStatus, setMarketingStatus] = useState<boolean>(true)
     const router = useRouter();


       // function regsiter and send magic link to user email
     const registerUser = async (event:React.SyntheticEvent)=>{
         event.preventDefault();
   
         const email = emailRef.current?.value;
         const name = nameRef.current?.value;

         // checking is user is already registered 
         const isUserNew = await isUserRegistered(email); 

         // send verification email to user
         
         if(!isUserNew){
            // TODO: convulated if else statement, try out React Usereducer
            const userData = {email:email,name:name}

            const userResponse = await api('/checkUser','POST',userData); 

            if(userResponse){
               const isEmailSent = await signIn('email',{
               redirect:false,
               email:email,
               callbackUrl:'/'
            })
   
            if(isEmailSent.ok){
               setEmailSentStatus(false)
   
               // if user is subscribed add to list here
               if(marketingStatus){
                  const user:Contact ={
                     name:name,
                     email:email,
                     status:'subscribed'
                  }
                  // add email,name and status to mailchimp Audience 
                  saveUserToMailChimp(user) 
               
               }
            }
            }

         }else{
            router.push('/login')
         }
     }

    //function saves user contact to mailchimp audience
     const saveUserToMailChimp = async(contact:Contact)=>{

         try{

            const AudienceContact:Contact = contact; 

            const mailChimpResponse =  await api('api/createContacxt','POST',AudienceContact)
            const mailChimpResponseData = await mailChimpResponse.json();
            console.log(mailChimpResponseData);


         }catch(e){
            console.log(e)
         }

     }

   //checbox handler function
     const checkHandler = ()=> {
         setMarketingStatus(!marketingStatus)
     }

    return(
     <Layout title="Sign Up - Create a free Account | Chimp Tracker">
      {
         isEmailSent ? <form className='formbody' onSubmit={registerUser}>
         <FormHeader FormTitle='Sign Up' FormPath="/login" />

         <Inputs InputType="name" inputRef={nameRef} placeholder="name"/>

        <Inputs InputType="email" inputRef={emailRef} placeholder="Email"/>

         <div className='my-8 flex items-center'>
              <input type="checkbox" name="marketing" checked={marketingStatus} onChange={checkHandler} />
              <label className='ml-2 text-xs' htmlFor="marketing">Send me product updates, offers, and reports.</label>
         </div>

          <span className='my-4 text-xs'>By signing up, you agree to our 
                <Link href="/terms" legacyBehavior><a className='text-blue-800 underline-offset-1'> Terms and Conditions</a></Link> and 
                <Link  href="/privacy" legacyBehavior><a className='text-blue-800 underline-offset-1'> Privacy Policy</a></Link>
          </span>

         <Button value='Agree and Sign Up'/>
      </form> : <AuthEmail emailAnimation={AnimationData} title="You are one step away from joining us"/>
      }
        
     </Layout>
    )
}