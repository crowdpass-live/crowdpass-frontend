import {
  Calendar,
  Share2,
  ArrowLeft,
  Copy,
  Check,
  X,
  Users,
  Clock,
} from "lucide-react";
import Image from "next/image";
import React, { useContext, useState, useEffect } from "react";
import { Button } from "../ui/button";
import { epochToDatetime } from "datetime-epoch-conversion";
import useBuyTicket from "@/hooks/write-hooks/useBuyTicket";
import { StarknetContext } from "@/contexts/UserContext";
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
import useBuyWeb2Ticket from "@/hooks/write-hooks/useBuyWeb2Ticket";
import axios from "axios";
import UseALATPay from "react-alatpay"

const EventDetails = ({ eventDetails, id }: any) => {
  const { address, isLoading, handleCartridgeConnect } = useContext(StarknetContext);
  const handlePurchase = useBuyTicket();
  const handleBuyWeb2Ticket = useBuyWeb2Ticket();
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
  const [registrationCount, setRegistrationCount] = useState(0);
  const [registrationLoading, setRegistrationLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    email: "",
    xhandle: "",
    agreeToNewsletter: false,
  });
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const fetchRegistrationCount = async () => {
      if (!(event?.uri.split("/").pop())) return;

      try {
        setRegistrationLoading(true);
        const response = await axios.get(`/api/registration`, {
          params: { eventId: event?.uri.split("/").pop()}
        });
        console.log("Registration count response:", response);
        setRegistrationCount(response.data.total);
      } catch (err) {
        console.log("Error fetching registration count:", err);
        setRegistrationCount(0);
      } finally {
        setRegistrationLoading(false);
      }
    };

    fetchRegistrationCount();
  }, [event]);

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

  const formFields = [
    {
      id: "name",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your full name",
    },
    {
      id: "email",
      label: "Email Address",
      type: "email",
      placeholder: "your.email@example.com",
    },
    {
      id: "xhandle",
      label: "X/Twitter Handle (Optional)",
      type: "text",
      placeholder: "@yourusername",
    },
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

  const handleRegisterClick = () => {
    if (window.innerWidth < 768) {
      // Mobile: Navigate to registration page
      router.push(`/events/${id}/register`);
    } else {
      // Desktop: Open modal
      if (!address) {
        setLoginModalOpen(true);
        return;
      }
      setIsOpen(true);
      setCurrentStep(1);
    }
  };

  const handleLogin = async () => {
    try {
      await handleCartridgeConnect();
      setLoginModalOpen(false);
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Sign in failed. Please try again.");
    }
  };

  useEffect(() => {
    if (address && window.innerWidth >= 768) {
      setIsOpen(true);
      setCurrentStep(1);
    }
  }, [address]);

  const handleRegisterWithoutSigning = () => {
    setLoginModalOpen(false);
    if (window.innerWidth < 768) {
      router.push(`/events/${id}/register`);
    } else {
      setIsOpen(true);
      setCurrentStep(1);
    }
  };

  const validateStep1 = () => {
    const { name, email, role } = formData;
    return name.trim() && email.trim() && role;
  };

  const handleContinue = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  const handlePurchaseTicketWithoutSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeToNewsletter) {
      toast.error("Please agree to receive event updates to continue.");
      return;
    }
    setIsOpen(false);
    try {
      setLoading(true);
      await handleBuyWeb2Ticket(event, formData, String(address), id);
      setLoading(false);
      setIsOpen(false);
      setCurrentStep(1);
      setFormData({
        role: "",
        name: "",
        email: "",
        xhandle: "",
        agreeToNewsletter: false,
      });
      // Refresh registration count after successful registration
      const response = await axios.get(`/api/registrations`, {
        params: { eventId: id }
      });
      setRegistrationCount(response.data.total);
      router.push(`/events/${id}/success`);
    } catch (error: any) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeToNewsletter) {
      toast.error("Please agree to receive event updates to continue.");
      return;
    }
    setIsOpen(false);
    try {
      setLoading(true);
      const config= UseALATPay({
        amount: 5000,
        apiKey: process.env.NEXT_PUBLIC_ALAT_API_KEY as string, 
        businessId: process.env.NEXT_PUBLIC_ALAT_PAY_BUSINESS_ID as string, 
        currency: "NGN",
        email: formData.email, 
        firstName:formData.name.split(' ')[0],
        lastName:formData.name.split(' ')[1], 
        metadata:"",   
        phone:'09169501662',
        color: "#FF6932",
        onClose: () => {
          toast.error("Could not complete payment and registration");},
        onTransaction: async() => {
          await handlePurchase(event, formData, String(address), id);
          toast.success("payment and registration successful");
      },
  })

  config.submit();
      setLoading(false);
      setIsOpen(false);
      setCurrentStep(1);
      setFormData({
        role: "",
        name: "",
        email: "",
        xhandle: "",
        agreeToNewsletter: false,
      });
      // Refresh registration count after successful registration
      const response = await axios.get(`/api/registrations`, {
        params: { eventId: id }
      });
      setRegistrationCount(response.data.total);
    } catch (error: any) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(`${process.env.NEXT_PUBLIC_BASE_JSON_URL}events/${id}`);
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
    toast.success("Link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const attendeeImages = [
    "https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633488/attendee1_hvftrx.png",
    "https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633488/attendee2_fuynig.png",
    "https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633488/attendee3_pwpu24.png",
    "https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633487/attendee5_b81v8c.png",
    "https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633487/attendee4_swblfx.png",
  ];

  // Use registration count from API instead of calculated value
  const totalEventTicket = registrationLoading ? 0 : registrationCount;
  const displayCount = Math.min(totalEventTicket, 5);
  const remaining = totalEventTicket - 5;
  const spotsLeft = Number(availableTicket);

  return (
    <div className="flex flex-col w-full">
      {/* Share Modal */}
      <Dialog open={shareOpen} onOpenChange={setShareOpen}>
        <DialogContent className="bg-[#14141A] border border-gray-700 text-white w-[95vw] max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">
              Share This Event
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-sm text-gray-300 mb-3">
              Share this event with your friends and colleagues
            </p>
            <div className="flex items-center bg-black/30 rounded-lg p-3">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="w-full bg-transparent text-white outline-none flex-1 mr-2 overflow-hidden text-ellipsis text-sm"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyLink}
                className="hover:bg-gray-700 shrink-0 px-3"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4 text-white" />
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Login Modal (Desktop Only) */}
      <Dialog open={loginModalOpen} onOpenChange={setLoginModalOpen}>
        <DialogContent className="bg-[#14141A] border border-gray-700 text-white w-[95vw] max-w-md mx-auto hidden md:block">
          <DialogHeader>
            <DialogTitle className="text-white text-xl text-center">
              Register for Event
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-300 mb-6">
              Choose how you'd like to register for this event
            </p>
            <div className="space-y-4">
              <div className="bg-gray-500/10 border border-gray-500/20 rounded-lg p-4 text-left">
                <p className="text-gray-300 text-xs mb-3">
                   sign in to manage your registrations
                </p>
                <Button
                  onClick={handleLogin}
                  className="text-white w-full py-3 text-lg font-semibold shadow-lg transition-all duration-200"
                  disabled={isLoading}
                  variant={"outline"}
                >
                  {isLoading ? "Signing in..." : "Sign in and register"}
                </Button>
              </div>
            </div>
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
          <span>Back to Events</span>
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
              <div className="flex items-center gap-2 mb-2">
                <p className="text-primary text-lg font-semibold">
                  {Number(event?.ticket_price) > 0
                    ? `${Number(event?.ticket_price)} STRK`
                    : "FREE EVENT"}
                </p>
                {spotsLeft > 0 && spotsLeft <= 10 && (
                  <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                    Only {spotsLeft} spots left!
                  </span>
                )}
              </div>
              <h1 className="raleway text-2xl md:text-4xl text-white font-semibold leading-tight">
                {event?.name}
              </h1>
            </div>
            <div className="bg-[#CBCACF66] flex gap-3 rounded-lg lg:max-w-80 py-3 px-4">
              <div className="bg-[#14141A] p-2 rounded-xl">
                <Calendar size={28} color="#FF6932" />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <p className="text-white font-medium">
                    {response.day} {response.month}, {response.year}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} color="#FF6932" />
                  <p className="text-white text-sm">
                    {convertTime(response.time)}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4">
                {registrationLoading ? (
                  <div className="flex items-center gap-2">
                    <Users size={20} color="#9CA3AF" />
                    <p className="text-gray-400">Loading registrations...</p>
                  </div>
                ) : totalEventTicket === 0 ? (
                  <div className="flex items-center gap-2">
                    <Users size={20} color="#9CA3AF" />
                    <p className="text-gray-400">Be the first to register!</p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center">
                      {attendeeImages.slice(0, displayCount).map((src, idx) => (
                        <Image
                          key={idx}
                          src={src}
                          alt={`attendee${idx + 1}`}
                          width={50}
                          height={50}
                          className={`${
                            idx !== 0 ? "-ml-5" : ""
                          } w-10 h-10 md:w-[50px] md:h-[50px] rounded-full border-2 border-white`}
                        />
                      ))}
                      {totalEventTicket > 5 && (
                        <div className="text-primary flex justify-center items-center text-sm w-10 h-10 md:w-[50px] md:h-[50px] bg-white rounded-full -ml-3 border-2 border-primary font-semibold">
                          +{remaining}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <p className="font-normal md:font-semibold text-white flex items-center gap-1">
                        <Users size={16} />
                        {totalEventTicket}{" "}
                        {totalEventTicket === 1 ? "person" : "people"}{" "}
                        registered
                      </p>
                      <p className="font-medium text-sm text-gray-300">
                        Join the community
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-between lg:justify-end lg:w-full gap-4 items-center mt-6">
            <Button
              variant="ghost"
              className="p-3 h-auto hover:bg-gray-800 rounded-full"
              onClick={() => setShareOpen(true)}
            >
              <Share2 size={30} className="text-white" />
            </Button>
            {!data && (
              <Button
                onClick={handleRegisterClick}
                className="bg-primary raleway text-light-black hover:bg-primary hover:text-deep-blue px-8 py-6 text-lg font-semibold rounded-lg flex-1 lg:flex-none lg:w-48"
                disabled={spotsLeft === 0}
              >
                {spotsLeft === 0 ? "Event Full" : "Register Now"}
              </Button>
            )}
            {data && (
              <Button
                className="bg-gray-600 raleway text-white hover:bg-gray-700 px-8 py-6 text-lg font-semibold rounded-lg flex-1 lg:flex-none lg:w-48"
                disabled={!eventDetails?.event?.is_cancelled}
                onClick={async () => {
                  await refund(id, address as `0x${string}`);
                }}
              >
                Request Refund
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Registration Modal (Desktop Only) */}
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) setCurrentStep(1);
        }}
      >
        <DialogContent className="w-full h-full max-w-none max-h-none p-0 bg-[#5b5959] border-none rounded-none md:w-[90vw] md:max-w-lg md:rounded-[20px] md:overflow-hidden md:max-h-[90vh] md:h-auto overflow-y-auto hidden md:block">
          <DialogHeader className="sr-only">
            <DialogTitle>Event Registration</DialogTitle>
          </DialogHeader>
          <div className="w-full h-full md:h-auto">
            <div className="relative">
              <img
                className="w-full h-[160px] md:h-[140px] object-cover"
                alt={event?.name}
                src={event?.image}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-between p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${currentStep >= 1 ? "bg-primary" : "bg-gray-500"}`}
                    />
                    <div
                      className={`w-2 h-2 rounded-full ${currentStep >= 2 ? "bg-primary" : "bg-gray-500"}`}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">
                    Register for Event
                  </h3>
                  <p className="text-white/80 text-sm">
                    Step {currentStep} of 2
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-1 p-6 space-y-6 pb-24 md:pb-6">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-white text-xl font-semibold mb-2">
                      Your Information
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Tell us a bit about yourself
                    </p>
                  </div>
                  {formFields.map((field) => (
                    <div key={field.id} className="space-y-2">
                      <Label
                        htmlFor={field.id}
                        className="font-medium text-white text-base block"
                      >
                        {field.label}
                      </Label>
                      <Input
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={
                          formData[field.id as keyof typeof formData] === false
                            ? ""
                            : String(
                                formData[field.id as keyof typeof formData] ?? ""
                              )
                        }
                        onChange={(e) =>
                          handleInputChange(field.id, e.target.value)
                        }
                        className="bg-white/10 border-white/20 focus:border-primary text-white placeholder:text-gray-400 rounded-lg p-3"
                        required={field.id !== "xhandle"}
                      />
                    </div>
                  ))}
                  <div className="space-y-2">
                    <Label
                      htmlFor="role"
                      className="font-medium text-white text-base block"
                    >
                      What best describes you?
                    </Label>
                    <Select
                      value={formData.role}
                      onValueChange={handleRoleChange}
                    >
                      <SelectTrigger className="bg-white/10 border-white/20 focus:border-primary text-white rounded-lg p-3 h-auto">
                        <SelectValue placeholder="Choose your role" />
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
                  <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#5b5959] border-t border-[#ffffff33] md:relative md:border-t-0 md:p-0 md:bg-transparent">
                    <Button
                      onClick={handleContinue}
                      className="w-full h-[56px] bg-[#ff6932] hover:bg-[#ff8152] rounded-lg text-[#1e1e24] text-lg font-semibold"
                      disabled={!validateStep1()}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}
              {currentStep === 2 && (
                <form
                  onSubmit={address ? handleSubmit : handlePurchaseTicketWithoutSignIn}
                  className="space-y-6"
                >
                  <div>
                    <h4 className="text-white text-xl font-semibold mb-2">
                      Almost Done!
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Just one more step to complete your registration
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 space-y-2">
                    <h5 className="text-white font-medium">
                      Registration Summary
                    </h5>
                    <div className="text-sm text-gray-300 space-y-1">
                      <p>
                        <span className="font-medium">Name:</span>{" "}
                        {formData.name}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span>{" "}
                        {formData.email}
                      </p>
                      <p>
                        <span className="font-medium">Role:</span>{" "}
                        {roleOptions.find((r) => r.value === formData.role)?.label}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
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
                      Yes, I'd like to receive updates about upcoming events and
                      announcements from {event?.name}. You can unsubscribe anytime.
                      *
                    </Label>
                  </div>
                  <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#5b5959] border-t border-[#ffffff33] md:relative md:border-t-0 md:p-0 md:bg-transparent flex gap-3">
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      variant="outline"
                      className="flex-1 h-[56px] bg-transparent border-white/30 text-white hover:bg-white/10 rounded-lg text-lg"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-[2] h-[56px] bg-[#ff6932] hover:bg-[#ff8152] rounded-lg text-[#1e1e24] text-lg font-semibold"
                      disabled={loading || !formData.agreeToNewsletter}
                    >
                      {loading
                        ? "Completing Registration..."
                        : "Complete Registration"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventDetails;