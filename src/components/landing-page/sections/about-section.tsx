import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../ui/card'
import { Button } from '../../ui/button'

const AboutSection = () => {
    return (
        <div className='flex justify-center items-center py-12'>
            <div className='flex flex-col -mr-10'>
                <img src="/assets/about-image-podcast.jpg" alt="podcast-image" className='w-96 h-72 rounded-t-2xl' />
                <img src="/assets/about-image-concert.jpg" alt="concert-image" className='w-96 h-72 rounded-b-2xl' />
            </div>
            <Card className="w-[95%] md:w-[470px] gap-12 py-14 z-10 bg-deep-blue px-6 border-deep-blue rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-white text-4xl font-semibold">
                        About Us
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-12">
                    <p className='text-white text-base'>Welcome to CrowdPass, your premier event ticketing and management solution. Our platform is designed to help event organizers create, manage, and promote their events with ease.</p>
                    <p className='text-white text-base'>At CrowdPass, we believe that events have the power to bring people together and create lasting memories. That's why we're dedicated to providing a seamless and secure ticketing experience for attendees, while also offering a range of tools and resources to help event organizers succeed.</p>
                </CardContent>
                <CardFooter>
                    <Button className="bg-primary text-light-black text-lg w-full py-6 font-medium">
                        Learn More
                    </Button>
                </CardFooter>
            </Card>
            <div className='flex flex-col -ml-10'>
                <img src="/assets/about-image-get-together.jpg" alt="get-together-image" className='w-96 h-72 rounded-t-2xl' />
                <img src="/assets/about-image-dinner.jpg" alt="dinner-image" className='w-96 h-72 rounded-b-2xl' />
            </div>
        </div>
    )
}

export default AboutSection