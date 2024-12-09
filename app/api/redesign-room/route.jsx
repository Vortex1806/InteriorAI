const { NextResponse } = require("next/server")
import Replicate from "replicate";
// import { Client } from "@gradio/client";
import axios from "axios";
// import sharp from "sharp";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storage } from "@/config/firebaseConfig";
import { db } from "@/config/db";
import { AiGeneratedImage } from "@/config/schema";

const replicate = new Replicate(
    { auth: process.env.NEXT_PUBLIC_REPLICATE_API_KEY }
);
// const client = await Client.connect("hysts/ControlNet-v1-1");
// async function getImageAsBlob(url) {
//     const response = await fetch(url);
//     if (!response.ok) throw new Error('Failed to fetch the image');
//     return await response.blob();
// }

// export async function POST(req) {
//     const { imageUrl, roomType, designType, additional, userEmail } = await req.json();
//     try {
//         console.time("Processing Task");

//         // Validate Inputs
//         if (!imageUrl || !roomType || !designType) {
//             throw new Error("Missing required parameters.");
//         }

//         // Get Image as Blob
//         const imageBlob = await getImageAsBlob(imageUrl);

//         // Call Hugging Face API
//         const result = await client.predict("/mlsd", {
//             image: imageBlob,
//             prompt: `A ${roomType} with a ${designType} style interior`,
//             additional_prompt: additional,
//         });

//         // Process and Upload Result
//         const output = result.data[0][1]?.image?.url;
//         if (!output) throw new Error("Hugging Face API did not return a valid image URL.");

//         const base64imageUrl = await ConvertImageToBase64(output);

//         if (!base64imageUrl.startsWith('data:image/png;base64,')) {
//             throw new Error("Base64 conversion failed or returned invalid data.");
//         }

//         const fileName = Date.now() + '.png';
//         const storageRef = ref(storage, 'interior-ai/' + fileName);
//         await uploadString(storageRef, base64imageUrl, 'data_url');

//         const downloadUrl = await getDownloadURL(storageRef);

//         // Save Metadata to DB
//         const dbResult = await db.insert(AiGeneratedImage).values({
//             roomType, designType, orgImg: imageUrl, aiImage: downloadUrl, userEmail,
//         }).returning({ id: AiGeneratedImage.id });

//         console.timeEnd("Processing Task");
//         return NextResponse.json({ result: downloadUrl });
//     } catch (error) {
//         console.error("Error in POST handler:", error);
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }


export async function POST(req) {
    const { imageUrl, roomType, designType, additional, userEmail } = await req.json();
    //convert image and get to ai image
    try {
        const input = {
            image: imageUrl,
            prompt: "A " + roomType + " with a " + designType + " style interior." + additional
        };

        const output = await replicate.run("adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38", { input });
        console.log(output);
        const base64Image = await ConvertImageToBase64(output);
        //save the image to firebase
        const fileName = Date.now() + '.png';
        const storageRef = ref(storage, 'interior-ai/' + fileName);
        await uploadString(storageRef, base64Image, 'data_url');
        const downloadUrl = await getDownloadURL(storageRef);
        console.log(downloadUrl);
        const dbResult = await db.insert(AiGeneratedImage).values({
            roomType: roomType,
            designType: designType,
            orgImg: imageUrl,
            aiImage: downloadUrl,
            userEmail: userEmail,

        }).returning({ id: AiGeneratedImage.id });
        console.log(dbResult);

        return NextResponse.json({ 'result': downloadUrl });
        //save all to database
    } catch (e) {
        return NextResponse.json({ error: e })
    }
}
async function ConvertImageToBase64(imageUrl) {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const base64ImageRaw = Buffer.from(response.data).toString('base64');
    return "data:image/png;base64," + base64ImageRaw;

}



// export async function POST(req) {
//     // const { user } = useUser();
//     const { imageUrl, roomType, designType, additional, userEmail } = await req.json();
//     try {

//         const imageBlob = await getImageAsBlob(imageUrl);
//         const result = await client.predict("/mlsd", {
//             image: imageBlob,
//             prompt: "A " + roomType + " with a " + designType + " style interior",
//             additional_prompt: additional,
//         });
//         console.log(result.data);
//         const output = result.data[0][1].image.url;
//         console.log("Fetching and converting image...", output);
//         const base64imageUrl = await ConvertImageToBase64(output);

//         if (!base64imageUrl.startsWith('data:image/png;base64,')) {
//             throw new Error("Base64 conversion failed or returned invalid data.");
//         }

//         console.log("Uploading to Firebase...");
//         const fileName = Date.now() + '.png';
//         const storageRef = ref(storage, 'interior-ai/' + fileName);
//         await uploadString(storageRef, base64imageUrl, 'data_url');

//         console.log("Fetching download URL...");
//         const downloadUrl = await getDownloadURL(storageRef);

//         console.log("File uploaded successfully:", downloadUrl);
//         // return NextResponse.json({ result: downloadUrl });
//         const dbResult = await db.insert(AiGeneratedImage).values({
//             roomType: roomType,
//             designType: designType,
//             orgImg: imageUrl,
//             aiImage: downloadUrl,
//             userEmail: userEmail,

//         }).returning({ id: AiGeneratedImage.id });
//         console.log(dbResult);

//         return NextResponse.json({ 'result': downloadUrl });


//     } catch (error) {
//         console.error("Error in POST handler:", error);
//         return NextResponse.json({ error: error.message });
//     }
// }


// async function ConvertImageToBase64(imageUrl) {
//     const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
//     const webpImageBuffer = Buffer.from(response.data);

//     // Convert the image to PNG
//     const pngImageBuffer = await sharp(webpImageBuffer)
//         .toFormat('png')
//         .toBuffer();

//     // Convert the PNG buffer to base64
//     const base64Image = pngImageBuffer.toString('base64');
//     return `data:image/png;base64,${base64Image}`;
// }