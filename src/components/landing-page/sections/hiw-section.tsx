import React from 'react'
import HiwAccordion from '../hiw-accordion'

const HiwSection = () => {
    
    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='flex flex-col justify-center items-center max-w-[1280px]'>
                <h1 className='text-white text-4xl lg:text-6xl font-bold py-4 raleway lg:pt-16 lg:pb-20'>How it works</h1>
                <div className='flex justify-center items-center gap-12'>
                    <img src="/assets/hiw-image-one.png" alt="image-1" className='hidden lg:flex md:w-[500px] md:h-[500px] xl:h-[620px] xl:w-[620px]' />
                    <HiwAccordion />
                </div>
            </div>
        </div>
    )
}

export default HiwSection