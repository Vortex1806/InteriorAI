import Image from 'next/image'
import React, { useState } from 'react'

function DesignType(
    { selectedDesignType }
) {
    const Designs = [
        {
            name: 'Modern',
            image: '/Modern.jpeg'
        },
        {
            name: 'Industrial',
            image: '/Industrial.jpeg'
        },
        {
            name: 'Bohemian',
            image: '/Bohemian.jpeg'
        },
        {
            name: 'Traditional',
            image: '/Traditional.jpeg'
        },
        {
            name: 'Rustic',
            image: '/Rustic.jpeg'
        },
        {
            name: 'Minimalistic',
            image: '/minimalist.jpeg'
        },
    ]
    const [selectedOption, setSelectedOption] = useState();
    return (
        <div className='mt-5'>
            <label className='text-gray-500 '>Select Interior Design Type</label>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-3'>
                {Designs.map((design, index) => (
                    <div key={index} onClick={() => { setSelectedOption(design.name); selectedDesignType(design.name) }}>
                        <Image src={design.image} width={100} height={100} alt={index} className={`h-[80px] rounded-md hover:scale-105 transition-all cursor-pointer ${design.name == selectedOption && 'border-2 border-primary rounded-md p-1'}`} />
                        <h2>{design.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DesignType