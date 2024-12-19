"use client"

import React, { useState } from 'react'
import { Field, Formik } from "formik";
import {   Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle, } from '@/components/ui/card';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { cairo } from 'starknet'
import { Contract, RpcProvider } from 'starknet'
import eventAbi from '@/Abis/eventAbi.json'
import { useAccount } from "@starknet-react/core";
import axios from "axios";


type Props = {}

const page = (props: Props) => {

  const [selectedFile, setSelectedFile] = useState("");

  const contractAddr = "0x04da2dd996dc36097f2f5b663db1ffa75466d32036d7bbdbe6719f768bdc5b26";

  const { account, address, status} = useAccount();

  const eventContract = new Contract(eventAbi, contractAddr, account)

  const handleSelectImage = ({ target }: any) => {
    setSelectedFile(target.files[0]);
  };

  const uploadImageToIPFS = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
            pinata_secret_api_key:
            process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY,
          },
        }
      );

      const cid = response.data.IpfsHash;
      return cid;
    } catch (error) {
    }
  };


  return (
    <div className="w-full mt-10 flex justify-center items-center">
        <Card className="w-full bg-light-black border-0 border-none max-w-2xl shadow-2xl mb-4">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Create New Event</CardTitle>
            <CardDescription className="text-white text-xs">
              Fill out the details for your upcoming event.
            </CardDescription>
          </CardHeader>
          <Formik
            initialValues={{
              name: "",
              description: "",
              total_ticket: 0,
              country: "",
              virtual_event: false,
              img: "",
              ticket_price: 0,
              start_time: "00:00",
              end_time: "00:00",
              eventCategory: "free",
              eventType: "physical"
            }}
            onSubmit={async (values, { setSubmitting }) => {
              console.log(values)
              setSubmitting(true);
              const toast1 = toast.loading("Creating Events");
              try {
                const eventImage = await uploadImageToIPFS()

                const _start_date = new Date(values.start_time).getTime() / 1000;
                const _end_date = new Date(values.end_time).getTime() / 1000;
                
                await eventContract.create_event(values.name, values.description, eventImage, values.country, values.eventCategory, values.eventType,  _start_date, _end_date, cairo.uint256(values.ticket_price * 1e18), values.total_ticket)
                toast.remove(toast1);
                toast.success("Event Created");
                // console.log(formData)
              } catch (error) {
                toast.remove(toast1);
                toast.error("error creating event");
                console.log(error);
              }
            }}
          >
            {({
              values,
              isSubmitting,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <CardContent className="grid gap-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2 flex flex-col">
                      <label htmlFor="name" className="text-white">
                        Event Name
                      </label>
                      <Field
                      className="rounded-md"
                        type="text"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        placeholder={"input your name"}
                      />
                      <div className="text-red-900 text-sm">
                        {errors.name && touched.name && errors.name}
                      </div>
                    </div>
                    <div className="space-y-2 flex flex-col">
                      <label htmlFor="email" className="text-white">
                        Ticket Price ($STRK)
                      </label>
                      <Field
                      className="rounded-md"
                        type="number"
                        name="ticket_price"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.ticket_price}
                        placeholder={"eg $STRK 100"}
                      />
                      <div className="text-red">
                        {errors.ticket_price && touched.ticket_price && errors.ticket_price}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2 flex flex-col">
                      <label htmlFor="ticket-price" className="text-white">
                        Total Tickets
                      </label>
                      <Field
                      className="rounded-md"
                        type="number"
                        name="total_ticket"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.total_ticket}
                        placeholder={"input event city"}
                      />
                      <div className="text-red-900 text-sm">
                        {" "}
                        {errors.total_ticket && touched.total_ticket && errors.total_ticket}
                      </div>
                    </div>
                    <div className="space-y-2 flex flex-col">
                      <label htmlFor="ticket-price" className="text-white">
                        Location
                      </label>
                      <Field
                      className="rounded-md"
                        type="text"
                        name="country"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.country}
                        placeholder={"input event country"}
                      />
                      <div className="text-red-900 text-sm">
                        {" "}
                        {errors.country && touched.country && errors.country}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2 flex flex-col">
                      <label
                        htmlFor="event-category"
                        className="text-white"
                      >
                        Event Category
                      </label>
                      <Field
                      className="rounded-md"
                        as="select"
                        name="eventCategory"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.eventCategory}
                        placeholder={"Describe your event..."}
                      >
                        <option >Free</option>
                        <option >Paid</option>
                        <option >Private</option>
                      </Field>
                    </div>
                    <div className="space-y-2 flex flex-col">
                      <label htmlFor="event-type" className="text-white">
                        Event Type
                      </label>
                      <Field
                      className="rounded-md"
                        as="select"
                        name="virtual_event"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.virtual_event}
                      >
                        <option >Physical</option>
                        <option >Virtual</option>
                      </Field>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2 flex flex-col">
                      <label htmlFor="start-date" className="text-white">
                        Start Date
                      </label>
                      <Field
                      className="rounded-md"
                        name="start_time"
                        type="datetime-local"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.start_time}
                      />
                    </div>
                    <div className="space-y-2 flex flex-col">
                      <label htmlFor="start-date" className="text-white">
                        End Date
                      </label>
                      <Field
                      className="rounded-md"
                        name="end_time"
                        type="datetime-local"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.end_time}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2 flex flex-col">
                      <label htmlFor="start-date" className="text-white">
                        Event Description
                      </label>
                      <Field
                      className="rounded-md"
                        as="textarea"
                        name="description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        placeholder={"Describe your event..."}
                      />
                      <div className="text-red-900 text-sm">
                        {" "}
                        {errors.description &&
                          touched.description &&
                          errors.description}
                      </div>
                    </div>
                    <div className="space-y-2 flex flex-col">
                      <label htmlFor="start-date" className="text-white">
                        Event Image
                      </label>
                      <input
                        type="file"
                        name="img"
                        accept="image/*"
                        onChange={handleSelectImage}
                        onBlur={handleBlur}
                        className='text-white'
                      />
                      <div className="text-red-900 text-sm"></div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    className="text-light-black hover:text-white bg-primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating Event..." : "Create Event"}
                  </Button>
                </CardFooter>
              </form>
            )}
          </Formik>
        </Card>
      </div>
  )
}

export default page