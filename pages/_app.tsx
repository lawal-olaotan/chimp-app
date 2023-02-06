import '../styles/globals.css'
import '../styles/style.css'

import type { AppProps } from 'next/app';
import type {ReactElement, ReactNode} from 'react';
import type {NextPage} from 'next'; 
// import ReactGA from 'react-ga';


type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({Component, pageProps: {session, ...pageProps} }: AppPropsWithLayout){
  const getLayout = Component.getLayout ?? ((page) => page )
  // ReactGA.initialize(process.env.NEXT_PUBLIC_GA);
  return (
        getLayout(<Component{...pageProps}/>)
  )}