import React from 'react'
import { Button } from '../ui/button'
import { categories, dates, locations, payments } from './dummyData'
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2'
import { Search } from 'lucide-react'

type Props = {}

const FilterEvent = (props: Props) => {
  return (
    <>
        {/* Filter Section (Hidden by default) */}
        <div className="hidden  md:flex flex-col w-[45%] h-[1240px] bg-[#14141A] p-5 space-y-8 rounded-md">
          {/* Search BAR */}
          <div className="border w-full rounded-md border-[#B0B0B4] flex gap-3 text-white justify-between items-center">
            <input
              type="text"
              placeholder="Search events by name"
              className="border-none bg-transparent rounded-lg text-[#B0B0B4] w-full"
            />
            <Button className="h-full text-[#14141A] bg-primary hover:text-deep-blue">
              <Search />
            </Button>
          </div>

          {/* Categories */}
          <div>
            <div className="flex w-full text-[#B0B0B4] items-center justify-center gap-2 mb-4">
              <h1 className="text-[#B0B0B4] raleway font-semibold">
                {" "}
                Categories
              </h1>
              <hr className="border-white/50 w-full " />
            </div>
            <div className="flex flex-wrap">
              <div className="grid grid-cols-2 gap-x-12 gap-y-2">
                {categories.map((category, index) => (
                  <div className="flex items-center" key={index}>
                    <input
                      type="checkbox"
                      name={category}
                      id={category}
                      className="appearance-none  checked:bg-primary indeterminate:bg-gray-300 "
                    />
                    <label htmlFor={category} className="text-[#B0B0B4] ml-2">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Filter by Dates */}
          <div>
            <div className="flex w-full text-[#B0B0B4] items-center justify-center gap-2 mb-4">
              <h1 className="text-[#B0B0B4] raleway font-semibold">Date</h1>
              <hr className="border-white/50 w-full " />
            </div>
            <div className="flex flex-wrap">
              <div className="flex gap-2">
                <div className="flex gap-2">
                  {dates.map((date, index) => (
                    <div className="flex items-center" key={index}>
                      <input
                        type="date"
                        name={date}
                        id={date}
                        placeholder="from"
                        className="w-36 bg-transparent text-[#B0B0B4] rounded-md border-2"
                      />
                    </div>
                  ))}
                </div>
                <Button className="text-[#14141A] bg-primary hover:text-deep-blue h-full">
                  <HiOutlineAdjustmentsHorizontal size={25} />
                </Button>
              </div>
            </div>
          </div>
          {/* Filter by location */}
          <div>
            <div className="flex w-full text-[#B0B0B4] items-center justify-center gap-2 mb-4">
              <h1 className="text-[#B0B0B4] raleway font-semibold">Location</h1>
              <hr className="border-white/50 w-full " />
            </div>
            <div className="flex flex-wrap">
              <div className="grid grid-cols-2 gap-x-12 gap-y-2">
                {locations.map((location, index) => (
                  <div className="flex items-center" key={index}>
                    <input
                      type="checkbox"
                      name={location}
                      id={location}
                      className="appearance-none  checked:bg-primary indeterminate:bg-gray-300 "
                    />
                    <label htmlFor={location} className="text-[#B0B0B4] ml-2">
                      {location}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Filter by Payment Type */}
          <div>
            <div className="flex w-full text-[#B0B0B4] items-center justify-center gap-2 mb-4">
              <h1 className="text-[#B0B0B4] raleway font-semibold">Payment</h1>
              <hr className="border-white/50 w-full " />
            </div>
            <div className="flex flex-wrap">
              <div className="grid grid-cols-2 gap-x-12 gap-y-2">
                {payments.map((payment, index) => (
                  <div className="flex items-center" key={index}>
                    <input
                      type="checkbox"
                      name={payment}
                      id={payment}
                      className="appearance-none  checked:bg-primary indeterminate:bg-gray-300 "
                    />
                    <label htmlFor={payment} className="text-[#B0B0B4] ml-2">
                      {payment}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        </>
  )
}

export default FilterEvent