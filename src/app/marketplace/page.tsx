"use client"

import ExploreMarketplace from '@/components/marketplace/ExploreMarketplace'
import MarketplaceHero from '@/components/marketplace/MarketplaceHero'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <>
    <MarketplaceHero />
    <ExploreMarketplace />
    </>
  )
}

export default page