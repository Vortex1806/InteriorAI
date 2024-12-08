"use client"
import React, { useContext, useState } from 'react'
import ImageSelection from './_components/ImageSelection'
import RoomType from './_components/RoomType'
import DesignType from './_components/DesignType'
import AdditionalRequirement from './_components/AdditionalRequirement'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '@/config/firebaseConfig'
import { useUser } from '@clerk/nextjs'
import CustomLoading from './_components/CustomLoading'
import AiOutputDialog from '../_components/AiOutputDialog'
import { db } from '@/config/db'
import { UserDetailContext } from '@/app/_context/UserDetailContext'
import { Users } from '@/config/schema'

function CreateNew() {
    const { user } = useUser();
    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [outputResult, setOutputResult] = useState();
    const [aiOutput, setAIOutput] = useState();
    const [openOutputDialog, setOpenOutputDialog] = useState(false);
    const [orgImage, setorgImage] = useState();
    const { userDetails, setUserDetails } = useContext(UserDetailContext);
    const onHandleInputChange = (value, fieldName) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: value
        }))
        console.log(formData);
    }
    /**
     * Update the user credits
     * @returns 
     */
    const updateUserCredits = async () => {
        const res = await db.update(Users).set({
            credits: userDetails?.credits - 1
        }).returning({ id: Users.id });
        if (res) {
            setUserDetails(prev => ({
                ...prev,
                credits: userDetails?.credits - 1
            }))
            return res[0].id;
        }
    }
    // const GenerateAiImage = async () => {
    //     console.time("API Processing Time");
    //     setLoading(true);
    //     const rawimageUrl = await SaveRawImageToFirebase();
    //     const result = await axios.post('/api/redesign-room', { imageUrl: rawimageUrl, roomType: formData?.roomType, designType: formData?.designType, additional: formData?.additional, userEmail: user?.primaryEmailAddress?.emailAddress }, { timeout: 60000 });
    //     console.log(result);
    //     setAIOutput(result.data.result);
    //     setLoading(false);
    //     updateUserCredits();
    //     setOpenOutputDialog(true);
    //     console.timeEnd("API Processing Time");
    // }
    const GenerateAiImage = async () => {
        console.time("API Processing Time");

        // Start loading
        setLoading(true);

        try {
            // Save raw image to Firebase and get the URL
            const rawimageUrl = await SaveRawImageToFirebase();

            // Post request to the redesign-room API
            const result = await axios.post('/api/redesign-room', {
                imageUrl: rawimageUrl,
                roomType: formData?.roomType,
                designType: formData?.designType,
                additional: formData?.additional,
                userEmail: user?.primaryEmailAddress?.emailAddress
            }, {
                timeout: 60000
            });

            // Handle the result
            console.log(result);
            setAIOutput(result.data.result);

            // Update credits and open the output dialog
            updateUserCredits();
            setOpenOutputDialog(true);
        } catch (error) {
            // Error handling
            console.error("Error generating AI image:", error);

            // Optionally, set an error message to display to the user
            alert("There was an error processing your request. Please try again later.");
        } finally {
            // Stop loading (even if there was an error)
            setLoading(false);
        }

        console.timeEnd("API Processing Time");
    }

    const SaveRawImageToFirebase = async () => {
        const fileName = Date.now() + "_raw.png";
        const imageRef = ref(storage, 'interior-ai/' + fileName)
        await uploadBytes(imageRef, formData.image).then(resp => {
            console.log('File Uploaded...')
        })
        const downloadUrl = await getDownloadURL(imageRef);
        console.log(downloadUrl);
        setorgImage(downloadUrl);
        return downloadUrl;
    }

    return (
        <div>
            <h2 className='font-bold text-4xl text-primary text-center'>Build Your Dream Room Using InteriorAI</h2>
            <p className='text-center text-gray-500'>Transform any room with one click using InteriorAI. Select a space, choose your style, ans watch as AI instantly reimagines your environment</p>
            <div className='grid grid-cols-1 md:grid-cols-2  justify-center mt-10 gap-10'>
                <ImageSelection selectedImage={(value) => onHandleInputChange(value, 'image')} />
                {/* Form input section */}
                <div>
                    <RoomType selectedRoomType={(value) => onHandleInputChange(value, 'roomType')} />
                    <DesignType selectedDesignType={(value) => onHandleInputChange(value, 'designType')} />
                    <AdditionalRequirement additionalReqInput={(value) => onHandleInputChange(value, 'additional')} />
                    <Button className="w-full mt-5" onClick={GenerateAiImage}>Generate</Button>
                    <p className='text-sm text-gray-400 mb-52'>NOTE: 1 Credit will be used per generation</p>
                </div>
            </div>
            <CustomLoading loading={loading} />
            <AiOutputDialog openDialog={openOutputDialog} closeDialog={() => setOpenOutputDialog(false)} orgImage={orgImage} aiImage={aiOutput} />
        </div>
    )
}

export default CreateNew