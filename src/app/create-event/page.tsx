import CreateEventHero from '@/components/create-event/CreateEventHero'
import HowItWorks from '@/components/create-event/HowItWorks'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
        <CreateEventHero />
        <HowItWorks />
    </div>
  )
}

export default page