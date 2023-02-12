import '../styles/globals.css'
import '../styles/style.css'
import type { AuthEnabledPage } from 'interfaces';
import React from 'react';
import type { AppProps } from 'next/app';
import type {ReactElement, ReactNode} from 'react';
import type {NextPage} from 'next'; 
import { SessionProvider} from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession,getSession} from "next-auth/react";
import { AuthLoader } from "@components/Auth/Loaders";


type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

type ComponentWithAuthentication<P> = P & {
  Component: AuthEnabledPage
}

export default function MyApp({Component, pageProps:{session, ...pageProps}}:ComponentWithAuthentication<AppPropsWithLayout>){
  const getLayout = Component.getLayout ?? ((page) => page )
  

  return (
    <SessionProvider session={session}>
      
      {Component.requiresAuthentication ? (
          <Auth> 
          {getLayout(<Component{...pageProps}/>)}
        </Auth> ):
          getLayout(<Component{...pageProps}/>)
      }
        
    
    </SessionProvider>
)}



function Auth ({children}) {
    const {status} = useSession({required:true});
    const router = useRouter();
  
    useEffect(()=>{
        getSession()
        .then((session)=>{
          if(!session){
            router.push('/signup')
          }
        })
   },[status])

   if(status === 'loading'){
      return <AuthLoader/>
   }
   
   return children
    
  }
  



