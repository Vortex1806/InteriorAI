"use client";

import { UserDetailContext } from '@/app/_context/UserDetailContext';
import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';

function Header() {
    const { userDetails } = useContext(UserDetailContext);
    console.log(userDetails);
    return (
        <header className="p-5 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="flex gap-2 items-center">
                    <Image src="/logo.svg" width={40} height={40} alt="InteriorAI" />
                    <h1 className="font-bold text-lg">Interior AI</h1>
                </Link>

                {userDetails.credits !== 0 ? (
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard/buy-credits">
                            <Button variant="ghost" className="rounded-full text-primary">
                                Buy More Credits
                            </Button>
                        </Link>
                        <div className="flex items-center gap-2 bg-slate-200 px-3 py-1 rounded-full">
                            <Image src="/star.png" width={20} height={20} alt="credits" />
                            <span>{userDetails.credits}</span>
                        </div>
                        <Link href="/dashboard">
                            <Button variant="outline" className="rounded-full">
                                Dashboard
                            </Button>
                        </Link>
                        <UserButton afterSignOutUrl="/" />
                    </div>
                ) : (
                    <Link href="/sign-up">
                        <Button className="rounded-sm px-10">Get Started Now</Button>
                    </Link>
                )}
            </div>
        </header>
    );
}

export default Header;

