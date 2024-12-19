"use client"

import React from 'react'
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Field, Formik } from "formik";
import toast from "react-hot-toast";


type Props = {
  organizer: string
  eventid: number
}

const BuyTicketDialogue = ({organizer, eventid}: Props) => {
  
  return (
    <Dialog>
    {"address" !== organizer ? <DialogTrigger className=" rounded-lg font-medium bg-deep-blue text-primary hover:text-deep-blue hover:bg-primary py-2 px-6">Buy Ticket
    </DialogTrigger> : ''}
    <DialogContent className="flex justify-center items-center bg-base-white">
      <DialogHeader>
        <DialogTitle>Choose your preferred ticket</DialogTitle>
        <DialogDescription>
          <Formik
            initialValues={{
              address: "address",
              eventId: 1,
              ticketId: 1,
              quantity: 1
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              const toast1 = toast.loading('Buying Ticket')
              
              try {
             (JSON.stringify(values))
                toast.remove(toast1)
                toast.success("Ticket Bought Successfully")
                console.log(values)
              } catch (error) {
                toast.remove(toast1)
                toast.error("error buying ticket")
                console.log(error);
              }
            }}
          >
            {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="links" className="text-[#222222]">
                    Ticket type
                  </label>
                  <Field
                    as="select"
                    className="w-full font-mono mb-6 p-2 border"
                    name="ticketId"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter user's address"
                    value={values.ticketId}
                  >
                    <option value={0}>Regular</option>
                    <option value={1}>VIP</option>
                    <option value={2}>VVIP</option>
                  </Field>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#222222] text-white w-full"
                  >
                    {isSubmitting ? "Buying Ticket" : "Buy Ticket"}
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog> )
}

export default BuyTicketDialogue