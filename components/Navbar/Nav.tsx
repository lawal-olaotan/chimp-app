import Link from "next/link"
import React from 'react'
import Image from 'next/image'


export  const Nav = ()=> {
    return (
        <nav className="w-full bg-primary text-white sticky top-0 left-0 z-10 sm:shadow-sm">
            <div className="section-layout  flex items-center justify-between py-4">
                <Link href='/' legacyBehavior>
                    <a className="w-[180px] h-[60px] relative">
                        <Image fill={true} object-fit="contain" src="/logo.png" alt="logo" />
                    </a>
                </Link>

                <div className="flex items-center justify-between w-2/5">
                    <Link href="/" legacyBehavior>
                        <a>Send Invite</a>
                    </Link>

                    <div className="bg-white rounded-full h-[60px] w-[60px] text-center flex items-center justify-center mr-4">
                        <span className="text-primary">LO</span>
                    </div>

                </div>

            </div>
        </nav>      
)}