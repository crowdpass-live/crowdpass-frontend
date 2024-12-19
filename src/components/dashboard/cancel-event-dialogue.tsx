"use client"

import React from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Formik } from "formik";
import toast from "react-hot-toast";

type Props = {
  organizer: string
  eventid: number
}


const CancelEvent = ({organizer, eventid}: Props) => {
  return (
    <Dialog>
      {"address" === organizer ? (
        <DialogTrigger className=" rounded-lg font-medium bg-deep-blue text-primary hover:text-deep-blue py-2 hover:bg-primary px-6">        
          Cancel Event
        </DialogTrigger>
      ) : (
        ""
      )}
      <DialogContent className="flex justify-center items-center bg-base-white">
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to cancel this event?{" "}
          </DialogTitle>
          <DialogDescription>
            <Formik
              initialValues={{
                organizer: "address",
              }}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                const toast1 = toast.loading("Cancelling events");
                try {
                  toast.remove(toast1);
                  toast.success("Event Cancelled");
                  console.log(values);
                } catch (error) {
                  toast.remove(toast1);
                  toast.error("Error cancelling events");
                  console.log(error);
                }
              }}
            >
              {({ handleSubmit, isSubmitting }) => (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-deep-blue text-primary hover:bg-primary hover:text-deep-blue w-full"
                    >
                      {isSubmitting ? "Cancelling Events..." : "Cancel Event"}
                    </Button>
                  </div>
                </form>
              )}
            </Formik>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CancelEvent;
