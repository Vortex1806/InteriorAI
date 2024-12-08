import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from 'next/image'

function CustomLoading({ loading }) {
    return (
        <div>
            <AlertDialog open={loading}>
                <AlertDialogTitle></AlertDialogTitle>
                <AlertDialogContent>
                    <div className='bg-white flex flex-col items-center my-10 justify-center'>
                        <Image src={'/loading.gif'} alt='loading...' width={100} height={100} />
                        <h2>Building the room of your Dreams...
                        </h2>
                        <h2>Do not Refresh It Takes Time</h2>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default CustomLoading