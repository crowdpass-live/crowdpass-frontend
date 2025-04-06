import React from 'react'

type Props = {}

const AnalyticsReview = (props: Props) => {
  return (
    <div className='border-b border-white/80 mb-6 flex gap-2 pb-6 flex-col items-center justify-center text-center py-8'>
      <img 
        src="https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633485/empty-reviews_vhycvk.png" 
        width={80} 
        height={80} 
        alt="empty-reviews-icon" 
        className="opacity-60"
      />
      <h6 className='text-white text-xl mt-4'>No Reviews Yet</h6>
      <p className='text-white/80 text-sm max-w-md'>
        Once attendees start leaving reviews for your event, they will appear here.
      </p>
    </div>
  )
}

export default AnalyticsReview