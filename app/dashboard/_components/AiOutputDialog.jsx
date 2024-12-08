import React from 'react';
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';

function AiOutputDialog({ openDialog, closeDialog, orgImage, aiImage }) {
    const downloadImage = async (url, fileName) => {
        const link = document.createElement('a'); // Create an anchor element
        link.href = url; // Set the file URL
        link.download = fileName; // Set the desired file name for the downloaded file
        link.target = '_blank'; // Open in a new tab (optional, ensures better behavior)
        document.body.appendChild(link); // Append the anchor to the document
        link.click(); // Programmatically click it to trigger the download
        document.body.removeChild(link); // Clean up the element after the download
    };

    return (
        <div>
            <AlertDialog open={openDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Result:</AlertDialogTitle>
                        <ReactBeforeSliderComponent

                            firstImage={{ imageUrl: aiImage }}
                            secondImage={{ imageUrl: orgImage }}
                        />
                        <div className="flex justify-between w-full">
                            <Button onClick={() => closeDialog(false)}>Close</Button>
                            <Button onClick={() => downloadImage(aiImage, 'ai_image.png')}>
                                Download AI Image
                            </Button>
                        </div>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default AiOutputDialog;