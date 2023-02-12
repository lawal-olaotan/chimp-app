import React from 'react';
import Head from 'next/head';
import type { Layout } from 'interfaces';
import Image from 'next/image';
import Link from 'next/link';

const Layout = ({ children, title = 'Sign Up - Create a Free Account' }: Layout) => {
    return(

        <>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
    <div>
        <header>
            <nav className='flex items-center justify-left bg-primary'>
                <div className='nav-layout h-full w-full flex'>
                    <Link href='/' legacyBehavior>
                        <a className="w-[180px] h-[60px] relative">
                            <Image fill={true} object-fit="contain" src="/logo.png" alt="logo" />
                        </a>
                    </Link>
                </div>
               
            </nav>
        </header>
    <div className='mt-12 sm:p-4 md:p-0'>
        {children}
    </div>
      
    </div>
        </>

    )
}

export default Layout
