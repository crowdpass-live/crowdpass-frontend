"use client"

import ComingSoon from '@/components/dashboard/coming-soon'
import ExploreMarketplace from '@/components/marketplace/ExploreMarketplace'
import MarketplaceComingSoon from '@/components/marketplace/MarketplaceComingSoon'
import MarketplaceHero from '@/components/marketplace/MarketplaceHero'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <>
    <MarketplaceHero />
    {/* <ExploreMarketplace /> */}
    <MarketplaceComingSoon />
    </>
  )
}

export default page