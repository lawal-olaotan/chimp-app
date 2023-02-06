import { FormHeader } from './FormHeader';
import {useState, useRef } from 'react'; 
import { Button } from './button';
import Layout  from './Layout';
import { Inputs } from './Inputs';
import Link from 'next/link';


export const SignUp = ()=> {

     const emailRef= useRef<HTMLInputElement>(null);
     const nameRef= useRef<HTMLInputElement>(null);

    return(
     <Layout title="Sign Up - Create a free Account | Chimp Tracker">
        <form className='formbody'>
           <FormHeader FormTitle='Sign Up' FormPath="/login" />
           
          <Inputs InputType="email" inputRef={emailRef} placeholder="Email"/>

          <Inputs InputType="name" inputRef={nameRef} placeholder="name"/>
           
           <div className='my-8 flex items-center'>
                <input type="checkbox" name="marketing emails" />
                <label className='ml-2 text-xs' htmlFor="marketing">Send me product updates, offers, and reports.</label>
           </div>

         
               <span className='my-4 text-xs'>By signing up, you agree to our 
                     <Link href="/terms" legacyBehavior><a className='text-blue-800 underline-offset-1'> Terms and Conditions</a></Link> and 
                    <Link  href="/privacy" legacyBehavior><a className='text-blue-800 underline-offset-1'> Privacy Policy</a></Link>
               </span>
           

          
           <Button value='Agree and Sign Up'/>
        </form>
     </Layout>
    )
}