import React from 'react'

type Props = {}

const AnalyticsReview = (props: Props) => {
  return (
    <div className='border-b border-white/80 mb-6 flex gap-2 pb-6 flex-col'>
        <div className='flex items-center gap-4'>
            <img src="https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633485/event-attendee-two_vhycvk.png" width={50} height={50} alt="attendee-image" />
            <div>
                <h6 className='text-white text-xl'>0x1234****</h6>
                <p className='text-white/80 text-sm'>sogobanwo@gmail.com</p>
            </div>
        </div>
        <p className='text-sm text-white/80'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus molestias harum delectus ex sint sequi quaerat perspiciatis maxime ab nostrum.</p>
    </div>
  )
}

export default AnalyticsReview