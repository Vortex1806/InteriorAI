import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function EmptyState() {
    return (
        <div className='flex items-center justify-center mt-10 flex-col'>
            <Image src={'/placeholder.png'} alt='placeholder' width={200} height={200} />
            <h2 className='font-medium text-xl text-gray-500'>Create New AI Design of your room</h2>
            <Link href={'/dashboard/create-new'}>
                <Button className="mt-5">+ Redesign your dream room</Button>
            </Link>
        </div>
    )
}

export default EmptyState