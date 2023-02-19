import React from 'react'
import Head from 'next/head'
import { Nav } from './Navbar/Nav'
import {Tabs} from './Navbar/Tabs'
import type { Layout } from 'interfaces'
import { ModalContent } from '@components/Navbar/ModalContent';

const Layout = ({ children, title = 'Chimp Tracker' }: Layout) => (
  <div className='relative'>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className='layout mt-[2.5px] flex flex-col justify-betwween'>
      <header>
        <Nav/>
      </header>
      <ModalContent/>
      {children}
      <Tabs/>

      </div>
  </div>
)


export default Layout
