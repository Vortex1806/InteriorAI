import { Textarea } from '@/components/ui/textarea'
import React from 'react'

function AdditionalRequirement({ additionalReqInput }) {
    return (
        <div className='mt-5'>
            <label className='text-gray-400'>Enter Additional Requirements (Optional)</label>
            <Textarea className='mt2' onChange={(e) => additionalReqInput(e.target.value)} />
        </div>
    )
}

export default AdditionalRequirement