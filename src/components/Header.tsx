"use client";

import HeaderDropdown from "./HeaderDropdown";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { authClient } from "@/lib/auth-client";

const Header = () => {
    const { isPending, data } = authClient.useSession();
    console.log({
        isPending,
        data,
    });
    return (
        <div className=' bg-black py-4 shadow-md  z-50 w-full transition-all duration-500'>
            <div className='container mx-auto flex flex-col items-center gap-y-6 lg:flex-row lg:justify-between lg:gap-y-0'>
                <Link href='/'>
                    <Image
                        src='/images/logo.png'
                        alt='Logo'
                        width={50}
                        height={40}
                    />
                </Link>
                <div className='text-primary'>
                    <ul className='flex items-center gap-x-6 font-tertiary text-[15px]  tracking-wider lg:gap-x-8'>
                        <Link
                            href='/rooms'
                            className='text-amber-400 hover:text-primary/90'
                        >
                            Rooms
                        </Link>
                        {data?.user ? (
                            <HeaderDropdown />
                        ) : (
                            <Link
                                href='/auth/login'
                                className=' text-amber-400'
                                type='button'
                            >
                                Login
                            </Link>
                        )}
                        <Link
                            href='/booking'
                            type='button'
                            className='transition tracking-widest  bg-primary px-4 py-2  text-white hover:bg-primary/90'
                        >
                            ENQUIRE NOW
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;
