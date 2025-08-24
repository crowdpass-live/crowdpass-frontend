"use client";
import { ArrowLeft } from "lucide-react";
import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { StarknetContext } from "@/contexts/UserContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import useBuyTicket from "@/hooks/write-hooks/useBuyTicket";
import useBuyWeb2Ticket from "@/hooks/write-hooks/useBuyWeb2Ticket";
import useGetEventById from "@/hooks/read-hooks/useGetEventById";
import { useRouter, useParams } from "next/navigation";

const RegisterPage = () => {
  const { address, isLoading, handleCartridgeConnect } =
    useContext(StarknetContext);
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const eventDetails = useGetEventById(Number(id));
  const { event } = eventDetails || {};
  const handlePurchase = useBuyTicket();
  const handleBuyWeb2Ticket = useBuyWeb2Ticket();
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    email: "",
    xhandle: "",
    agreeToNewsletter: false,
  });
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

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

  const handleRegisterWithoutSigning = () => {
    setCurrentStep(1);
  };

  const handleLogin = async () => {
    try {
      await handleCartridgeConnect();
      setCurrentStep(1);
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Sign in failed. Please try again.");
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
    try {
      setLoading(true);
      await handleBuyWeb2Ticket(event, formData, String(address), id);
      setLoading(false);
      setCurrentStep(0);
      setFormData({
        role: "",
        name: "",
        email: "",
        xhandle: "",
        agreeToNewsletter: false,
      });
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
    try {
      setLoading(true);
      await handlePurchase(event, formData, String(address), id);
      setLoading(false);
      setCurrentStep(0);
      setFormData({
        role: "",
        name: "",
        email: "",
        xhandle: "",
        agreeToNewsletter: false,
      });
      router.push(`/events/${id}/success`);
    } catch (error: any) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div className="flex flex-col w-full h-auto bg-[#5b5959] mb-6">
      <div className="relative">
        <img
          className="w-full h-[160px] object-cover"
          alt={event?.name}
          src={event?.image}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-between p-4">
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            {currentStep > 0 && (
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${currentStep >= 1 ? "bg-primary" : "bg-gray-500"}`}
                />
                <div
                  className={`w-2 h-2 rounded-full ${currentStep >= 2 ? "bg-primary" : "bg-gray-500"}`}
                />
              </div>
            )}
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">
              Register for Event
            </h3>
            {currentStep > 0 && (
              <p className="text-white/80 text-sm">Step {currentStep} of 2</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex-1 p-6 space-y-6 pb-24">
        {currentStep === 0 && (
          <div className="space-y-6">
            <div className="text-center">
              <h4 className="text-white text-xl font-semibold mb-2">
                Register for Event
              </h4>
              <p className="text-gray-300 text-sm mb-6">
                Choose how you'd like to register for this event
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-500/10 border border-gray-400 rounded-lg p-4 text-left">
                <p className="text-white text-sm font-medium mb-2">
                  Web3 Savvy?
                </p>
                <p className="text-gray-300 text-xs mb-3">
                  Sign in to manage your registrations
                </p>
                <Button
                  onClick={handleLogin}
                  className="text-white w-full py-3 text-lg font-semibold shadow-lg transition-all duration-200"
                  disabled={isLoading}
                  variant="outline"
                >
                  {isLoading ? "Signing in..." : "Sign in and register"}
                </Button>
              </div>
            </div>
          </div>
        )}
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
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
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
              <Select value={formData.role} onValueChange={handleRoleChange}>
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
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#5b5959] border-t border-[#ffffff33] flex gap-3">
              <Button
                type="button"
                onClick={() => setCurrentStep(0)}
                variant="outline"
                className="flex-1 h-12 bg-transparent border-white/30 text-white hover:bg-white/10 rounded-lg text-lg"
              >
                Back
              </Button>
              <Button
                onClick={handleContinue}
                className="flex-[2] h-12 bg-[#ff6932] hover:bg-[#ff8152] rounded-lg text-[#1e1e24] text-lg font-semibold"
                disabled={!validateStep1()}
              >
                Continue
              </Button>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <form
            onSubmit={
              address ? handleSubmit : handlePurchaseTicketWithoutSignIn
            }
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
              <h5 className="text-white font-medium">Registration Summary</h5>
              <div className="text-sm text-gray-300 space-y-1">
                <p>
                  <span className="font-medium">Name:</span> {formData.name}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {formData.email}
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
                announcements from {event?.name}. You can unsubscribe anytime. *
              </Label>
            </div>
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#5b5959] border-t border-[#ffffff33] flex gap-3">
              <Button
                type="button"
                onClick={() => setCurrentStep(1)}
                variant="outline"
                className="flex-1 h-12 bg-transparent border-white/30 text-white hover:bg-white/10 rounded-lg text-lg"
              >
                Back
              </Button>
              <Button
                type="submit"
                className="flex-[2] h-12 bg-[#ff6932] hover:bg-[#ff8152] rounded-lg text-[#1e1e24] text-lg font-semibold"
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
  );
};

export default RegisterPage;
