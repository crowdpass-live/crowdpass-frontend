import { Calendar, Share2, ArrowLeft, Copy, Check, X } from "lucide-react";
import Image from "next/image";
import React, { useContext, useState, useEffect } from "react";
import { Button } from "../ui/button";
import { epochToDatetime } from "datetime-epoch-conversion";
import useBuyTicket from "@/hooks/write-hooks/useBuyTicket";
import { StarknetContext } from "@/contexts/UserContext";
import HashLoader from "react-spinners/HashLoader";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useIsTicketHolder from "@/hooks/read-hooks/useIsTicketHolder";
import useClaimRefund from "@/hooks/write-hooks/useClaimRefund";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import useGetAvailableTicket from "@/hooks/read-hooks/useGetAvailableTicket";

const EventDetails = ({ eventDetails, id }: any) => {
  const { address, isLoading, handleCartridgeConnect } = useContext(StarknetContext);
  const handlePurchase = useBuyTicket();
  const { data: availableTicket } = useGetAvailableTicket(id);
  const router = useRouter();
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const { data } = useIsTicketHolder(id, address as `0x${string}`);
  const { event }: any = eventDetails;
  const response = epochToDatetime(`${Number(event?.start_date)}`);
  const refund = useClaimRefund();
  const [isOpen, setIsOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    email: "",
    xhandle: "",
    agreeToNewsletter: false,
  });
  const [loading, setLoading] = useState(false)
  const roleOptions = [
    { value: "founder", label: "Founder" },
    { value: "builder", label: "Builder" },
    { value: "software-engineer", label: "Software Engineer" },
    { value: "product-manager", label: "Product Manager" },
    { value: "designer", label: "Designer" },
    { value: "investor", label: "Investor" },
    { value: "entrepreneur", label: "Entrepreneur" },
    { value: "student", label: "Student" },
    { value: "researcher", label: "Researcher" },
    { value: "consultant", label: "Consultant" },
    { value: "other", label: "Other" },
  ];

  // Form field data
  const formFields = [
    { id: "name", label: "Name", type: "text" },
    { id: "email", label: "Email", type: "email" },
    { id: "xhandle", label: "X Handle", type: "text" },
  ];

  const handleInputChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleNewsletterChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeToNewsletter: checked }));
  };


  const handleLogin = async () => {
    try {
      await handleCartridgeConnect();
      setLoginModalOpen(false);     
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(!address){
      await handleLogin();
    }

    try {

      const res = await handlePurchase( event, formData, String(address), id);


      setIsOpen(false);
    } catch (error: any) {
      console.error("Error:", error);
      if (error.response) {
        const errorMessage =
          error.response.data?.message || "Registration failed";
        toast.error(errorMessage)

      } else if (error.request) {
        toast.error("Network error. Please check your connection.");

      } else {
        toast.error(
          error.message || "Payment or registration failed. Please try again."
        );

      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(`${process.env.NEXT_PUBLIC_BASE_JSON_URL}/events/${id}`);
    }
  }, []);

  function convertTime(time: string) {
    let hours = time.substring(0, 2);
    let minutes = time.substring(3, 5);
    let ampm = parseInt(hours) >= 12 ? "PM" : "AM";

    if (parseInt(hours) > 12) {
      hours = (parseInt(hours) - 12).toString();
    } else if (parseInt(hours) == 0) {
      hours = "12";
    }

    return hours + ":" + minutes + " " + ampm;
  }

  const handleGoBack = () => {
    router.back();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const attendeeImages = [
    "https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633488/attendee1_hvftrx.png",
    "https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633488/attendee2_fuynig.png",
    "https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633488/attendee3_pwpu24.png",
    "https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633487/attendee5_b81v8c.png",
    "https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633487/attendee4_swblfx.png",
  ];

  const totalEventTicket = Number(event?.total_tickets) - Number(availableTicket) 

  const displayCount = Math.min(totalEventTicket, 5);
  const remaining = totalEventTicket - 5;

  return (
    <div className="flex flex-col w-full">
      {/* Share Modal */}
      <Dialog open={shareOpen} onOpenChange={setShareOpen}>
        <DialogContent className="bg-[#14141A] border border-gray-700 text-white w-[95vw] max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">
              Share Event
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-sm text-gray-300 mb-2">
              Copy the link below to share this event
            </p>
            <div className="flex items-center bg-black/30 rounded-md p-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="w-full bg-transparent text-white outline-none flex-1 mr-2 overflow-hidden text-ellipsis"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyLink}
                className="hover:bg-gray-700 shrink-0"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4 text-white" />
                )}
              </Button>
            </div>
            {copied && (
              <p className="text-green-500 text-sm mt-2">
                Link copied to clipboard!
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Back Button */}
      <div className="my-4">
        <Button
          onClick={handleGoBack}
          variant="ghost"
          className="flex items-center gap-2 text-white hover:text-primary hover:bg-transparent"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row mx-4 lg:mx-28 gap-4 lg:gap-10">
        <Image
          src={event?.image}
          alt="event-image"
          width={384}
          height={467}
          className="rounded-3xl w-full md:w-96 object-center object-cover"
        />
        <div className="flex flex-col gap-4 lg:w-full lg:gap-6 md:justify-between">
          <div className="flex flex-col gap-4 lg:w-full lg:gap-6">
            <div>
              <p className="text-primary">
                {Number(event?.ticket_price) > 0
                  ? `${Number(event?.ticket_price)} STRK`
                  : "FREE"}
              </p>
              <h1 className="raleway text-2xl md:text-4xl text-white font-semibold">
                {event?.name}
              </h1>
            </div>
            <div className="bg-[#CBCACF66] flex gap-2 rounded-lg lg:max-w-80 py-2 px-3">
              <div className="bg-[#14141A] p-2 rounded-xl">
                <Calendar size={30} color="#FF6932" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-white">
                  {response.day} {response.month}, {response.year}
                </p>
                <p className="text-white text-sm">{convertTime(response.time)}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-4">
                {totalEventTicket === 0 ? (
                  <div className="flex items-center">
                    <p className="text-gray-400 italic">
                      No participant has registered yet
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-center">
                      {attendeeImages.slice(0, displayCount).map((src, idx) => (
                        <Image
                          key={idx}
                          src={src}
                          alt={`attendee${idx + 1}`}
                          width={50}
                          height={50}
                          className={`${
                            idx !== 0 ? "-ml-3" : ""
                          } w-8 h-8 md:w-[50px] md:h-[50px]`}
                        />
                      ))}

                      {totalEventTicket > 5 && (
                        <p className="text-primary flex justify-center items-center text-sm p-2 bg-white rounded-full -ml-3 border-2 border-primary">
                          {remaining}+
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <p className="font-semibold text-white">Participant</p>
                      <p className="font-medium text-sm text-white">
                        Across the globe
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end lg:w-full gap-8 items-center">
            <div className="pt-4 flex gap-4">
              <Button
                variant="ghost"
                className="p-0 h-auto hover:bg-transparent"
                onClick={() => setShareOpen(true)}
              >
                <Share2 size={40} fill="#ffffff" color="#ffffff" />
              </Button>
            </div>

            {!data === true && (
              <>
                <Button
                  onClick={()=>setIsOpen(!isOpen)}
                  className="bg-primary raleway text-light-black hover:bg-primary hover:text-deep-blue w-60 py-6 text-xl mt-4 flex justify-center items-center"
                >
                  Register
                </Button>

                {/* Registration Modal - Full Page on Mobile */}
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogContent className="w-full h-full max-w-none max-h-none p-0 bg-[#5b5959] border-none rounded-none md:w-[90vw] md:max-w-lg md:rounded-[30px] md:overflow-hidden md:max-h-[90vh] md:h-auto overflow-y-auto">
                    <DialogHeader className="sr-only">
                      <DialogTitle>Event Registration</DialogTitle>
                    </DialogHeader>

                    <div className="w-full h-full md:h-auto">
                      {/* Mobile Full-Screen Header */}
                      <div className="relative md:hidden">
                        <img
                          className="w-full h-[200px] object-cover"
                          alt={event?.name}
                          src={event?.image}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setIsOpen(false)}
                          className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      </div>

                      {/* Desktop Header */}
                      <div className="hidden md:block">
                        <img
                          className="w-full h-[174px] object-cover"
                          alt={event?.name}
                          src={event?.image}
                        />
                      </div>

                      <div className="flex-1 p-4 sm:p-6 md:p-10 space-y-4 sm:space-y-6 pb-20 md:pb-10">
                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                          {formFields.map((field) => (
                            <div
                              key={field.id}
                              className="border-b-2 border-[#ffffff99]"
                            >
                              <Label
                                htmlFor={field.id}
                                className="font-bold text-white text-base sm:text-lg block mb-2"
                              >
                                {field.label}
                              </Label>
                              <Input
                                id={field.id}
                                type={field.type}
                                value={
                                  formData[
                                    field.id as keyof typeof formData
                                  ] === false
                                    ? ""
                                    : String(
                                        formData[
                                          field.id as keyof typeof formData
                                        ] ?? ""
                                      )
                                }
                                onChange={(e) =>
                                  handleInputChange(field.id, e.target.value)
                                }
                                className="bg-transparent border-none focus:ring-0 text-white placeholder:text-gray-400 p-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
                                required
                              />
                            </div>
                          ))}

                          <div className="border-b-2 border-[#ffffff99] pb-2">
                            <Label
                              htmlFor="role"
                              className="font-bold text-white text-base sm:text-lg block mb-2"
                            >
                              Which best describes you?
                            </Label>
                            <Select
                              value={formData.role}
                              onValueChange={handleRoleChange}
                            >
                              <SelectTrigger className="bg-transparent border-none focus:ring-0 text-white p-0 h-auto focus:ring-offset-0 [&>span]:text-white [&>svg]:text-white text-base">
                                <SelectValue
                                  placeholder="Select your role"
                                  className="text-white placeholder:text-gray-400"
                                />
                              </SelectTrigger>
                              <SelectContent className="bg-[#5b5959] border-[#ffffff33] text-white">
                                {roleOptions.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                    className="text-white focus:bg-[#ff6932] focus:text-[#1e1e24] cursor-pointer"
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Newsletter Checkbox */}
                          <div className="flex items-start space-x-3 pt-4">
                            <Checkbox
                              id="newsletter"
                              checked={formData.agreeToNewsletter}
                              onCheckedChange={handleNewsletterChange}
                              className="mt-1 border-white data-[state=checked]:bg-[#ff6932] data-[state=checked]:border-[#ff6932] shrink-0"
                            />
                            <Label
                              htmlFor="newsletter"
                              className="text-white text-sm leading-relaxed cursor-pointer"
                            >
                              I agree to receive newsletters and updates from
                              {event?.name} about upcoming events, features, and
                              announcements. *
                            </Label>
                          </div>
                          

                          {/* Submit Button - Fixed at bottom on mobile */}
                          <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#5b5959] border-t border-[#ffffff33] md:relative md:border-t-0 md:p-0 md:bg-transparent">
                            <Button
                              type="submit"
                              className="w-full h-[56px] bg-[#ff6932] hover:bg-[#ff8152] rounded-lg text-[#1e1e24] text-xl font-semibold"
                              disabled={loading}
                            >
                              {loading ? "Registering..." : "Register"}
                            </Button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </>
            )}
            {data === true && (
              <Button
                className="bg-primary raleway text-light-black hover:bg-primary hover:text-deep-blue w-60 py-6 text-xl mt-4 flex justify-center items-center "
                disabled
                onClick={async () => {
                  await refund(id, address as `0x${string}`);
                }}
              >
                Reclaim Refund
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;