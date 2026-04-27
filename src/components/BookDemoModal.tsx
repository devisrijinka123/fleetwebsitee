"use client";

import { useState, useEffect } from "react";
import { Plus, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookDemoModal({ isOpen, onClose }: BookDemoModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    titleRole: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    titleRole: "",
  });

  const [isSuccess, setIsSuccess] = useState(false);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        companyName: "",
        titleRole: "",
      });
      setErrors({
        fullName: "",
        email: "",
        phone: "",
        companyName: "",
        titleRole: "",
      });
      setIsSuccess(false);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const digits = phone.replace(/\D/g, "");
    return digits.length >= 10;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      fullName: "",
      email: "",
      phone: "",
      companyName: "",
      titleRole: "",
    };

    let hasError = false;

    // Validate all fields
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      hasError = true;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      hasError = true;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      hasError = true;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      hasError = true;
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Phone number must be at least 10 digits";
      hasError = true;
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
      hasError = true;
    }

    if (!formData.titleRole.trim()) {
      newErrors.titleRole = "Title/Role is required";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      // Construct mailto link
      const subject = encodeURIComponent(
        `Demo Request from ${formData.fullName}`
      );
      const body = encodeURIComponent(
        `Full Name: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCompany: ${formData.companyName}\nTitle/Role: ${formData.titleRole}\n\nPlease contact me to schedule a demo.`
      );
      const mailtoLink = `mailto:sales@ravity.io?subject=${subject}&body=${body}`;

      // Open mailto link
      window.location.href = mailtoLink;

      // Show success state
      setIsSuccess(true);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full max-w-lg animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-[#FFFFFF] rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.25)] ring-1 ring-black/8 p-8 mx-4">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-[#00031F] hover:text-[#F0197A] transition-colors"
            aria-label="Close modal"
          >
            <Plus className="w-6 h-6 rotate-45" />
          </button>

          {!isSuccess ? (
            <>
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-3xl font-extrabold text-[#00031F] mb-2">
                  Book a Demo
                </h2>
                <p className="text-[#00031F]/85">
                  Fill out the form below and we'll get in touch with you soon.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-bold text-[#00031F] mb-1.5"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    className={cn(
                      "w-full px-4 py-2.5 rounded-xl border-2 bg-white text-[#00031F] placeholder:text-[#00031F]/65 focus:outline-none focus:border-[#F0197A] transition-colors",
                      errors.fullName
                        ? "border-red-500"
                        : "border-[#00031F]/20"
                    )}
                    placeholder="John Doe"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold text-[#00031F] mb-1.5"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={cn(
                      "w-full px-4 py-2.5 rounded-xl border-2 bg-white text-[#00031F] placeholder:text-[#00031F]/65 focus:outline-none focus:border-[#F0197A] transition-colors",
                      errors.email ? "border-red-500" : "border-[#00031F]/20"
                    )}
                    placeholder="john@company.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-bold text-[#00031F] mb-1.5"
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={cn(
                      "w-full px-4 py-2.5 rounded-xl border-2 bg-white text-[#00031F] placeholder:text-[#00031F]/65 focus:outline-none focus:border-[#F0197A] transition-colors",
                      errors.phone ? "border-red-500" : "border-[#00031F]/20"
                    )}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Company Name */}
                <div>
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-bold text-[#00031F] mb-1.5"
                  >
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) =>
                      handleInputChange("companyName", e.target.value)
                    }
                    className={cn(
                      "w-full px-4 py-2.5 rounded-xl border-2 bg-white text-[#00031F] placeholder:text-[#00031F]/65 focus:outline-none focus:border-[#F0197A] transition-colors",
                      errors.companyName
                        ? "border-red-500"
                        : "border-[#00031F]/20"
                    )}
                    placeholder="Acme Inc."
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.companyName}
                    </p>
                  )}
                </div>

                {/* Title/Role */}
                <div>
                  <label
                    htmlFor="titleRole"
                    className="block text-sm font-bold text-[#00031F] mb-1.5"
                  >
                    Title/Role *
                  </label>
                  <input
                    type="text"
                    id="titleRole"
                    value={formData.titleRole}
                    onChange={(e) =>
                      handleInputChange("titleRole", e.target.value)
                    }
                    className={cn(
                      "w-full px-4 py-2.5 rounded-xl border-2 bg-white text-[#00031F] placeholder:text-[#00031F]/65 focus:outline-none focus:border-[#F0197A] transition-colors",
                      errors.titleRole
                        ? "border-red-500"
                        : "border-[#00031F]/20"
                    )}
                    placeholder="VP of Operations"
                  />
                  {errors.titleRole && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.titleRole}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#F0197A] text-white font-bold py-3 px-6 rounded-xl hover:bg-[#F0197A]/90 transition-colors mt-6"
                >
                  Submit Request
                </button>
              </form>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="text-center py-8">
                <div className="flex justify-center mb-4">
                  <CheckCircle2 className="w-16 h-16 text-[#F0197A]" />
                </div>
                <h2 className="text-3xl font-extrabold text-[#00031F] mb-2">
                  Thank you!
                </h2>
                <p className="text-[#00031F]/85 mb-6">
                  We'll be in touch with you soon.
                </p>
                <button
                  onClick={onClose}
                  className="bg-[#F0197A] text-white font-bold py-3 px-8 rounded-xl hover:bg-[#F0197A]/90 transition-colors"
                >
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
