"use client"
import Image from 'next/image'
import React, { useState } from 'react'

function ImageSelection({ selectedImage }) {
    const [file, setFile] = useState();
    const onFileSelected = (event) => {
        setFile(event.target.files[0]);
        console.log(event.target.files);
        selectedImage(event.target.files[0]);
    }
    return (
        <div className='mt-3'>
            <label >Select Image of your room</label>
            <label htmlFor='upload-image'>
                <div className={`cursor-pointer hover:shadow-lg p-28 border rounded-xl border-dotted flex justify-center border-primary bg-slate-200 ${file && 'p-0 bg-white'}`}>
                    {!file ? <Image src={'/uploadimage.png'} width={70} height={70} alt='upload' /> :
                        <Image src={URL.createObjectURL(file)} width={300} height={300} alt='uploadedfile' className='w-[300px] h-[300px] object-cover' />}
                </div>
            </label>
            <div>
                <input type="file" accept='image/*' id="upload-image" style={{ display: 'none' }} onChange={onFileSelected} />
            </div>
        </div>
    )
}

export default ImageSelection