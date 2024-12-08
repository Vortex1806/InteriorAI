"use client"
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import EmptyState from './EmptyState';
import Link from 'next/link';
import { AiGeneratedImage } from '@/config/schema';
import { db } from '@/config/db';
import { eq } from 'drizzle-orm';
import RoomDesignCard from './RoomDesignCard';

function Listing() {
    const { user } = useUser();
    const [userRoomList, setUserRoomList] = useState([]);
    useEffect(() => {
        user && GetUserRoomList();
    }, [user]);

    const GetUserRoomList = async () => {
        const result = await db.select().from(AiGeneratedImage).where(eq(AiGeneratedImage.userEmail, user?.primaryEmailAddress?.emailAddress))
        console.log(result);
        setUserRoomList(result);
    }
    return (
        <div>
            <div className="flex items-center justify-between">
                <h2 className='font-bold text-2xl'>Hello, {user?.fullName}</h2>
                <Link href={'/dashboard/create-new'}>
                    <Button>+ Recreate your Room</Button>
                </Link>
            </div>
            {
                userRoomList?.length == 0 ?
                    < EmptyState /> :
                    <div className='mt-10'>
                        <h2 className='font-medium text-primary text-xl mb-10'>Room Space</h2>
                        {/*listing */}
                        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                            {userRoomList.map((room, index) => (
                                <RoomDesignCard key={index} room={room} />
                            ))}
                        </div>

                    </div>
            }
        </div>
    )
}

export default Listing