"use client";

import {
  CopyrightIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  ArrowUpIcon,
} from "lucide-react";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa6";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const Footer = () => {
  const handleBackToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-black text-white px-[8%] py-12">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <Image
            src="/icon-white.svg"
            alt="The People Wire"
            width={100}
            height={30}
            priority
          />

          <p className="text-xs text-gray-400 max-w-sm mb-4">
            We’ll show you exactly how you can achieve a 30% increase in
            revenue and a 99.9% claim rate within 120 days—while focusing
            more on patient care.
          </p>

          <div className="flex gap-8 text-orange-500">
            <FaFacebook className="cursor-pointer hover:text-orange-400 transition-colors size-8" />
            <FaYoutube className="cursor-pointer hover:text-orange-400 transition-colors size-8" />
            <FaInstagram className="cursor-pointer hover:text-orange-400 transition-colors size-8" />
            <FaLinkedin className="cursor-pointer hover:text-orange-400 transition-colors size-8" />
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-orange-500 font-semibold mb-4">
            Categories
          </h3>
          <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-300">
            {[
              "Top Stories",
              "Entertainment",
              "International",
              "Science & Tech",
              "Business",
              "Sports",
            ].map((item) => (
              <span
                key={item}
                className="hover:text-orange-400 cursor-pointer transition-colors"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-orange-500 font-semibold mb-4">
            Reach out to Us
          </h3>

          <div className="flex flex-col gap-3 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <MapPinIcon size={16} />
              <span>23 Main Street, 12345</span>
            </div>

            <div className="flex items-center gap-2">
              <MailIcon size={16} />
              <span>allthingsmarketing@gmail.com</span>
            </div>

            <div className="flex items-center gap-2">
              <PhoneIcon size={16} />
              <span>1234567890</span>
            </div>
          </div>
        </div>
      </div>

      {/* App Download */}
      <div className="mt-12 border border-[#F3CB04] rounded-lg px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center font-bold text-black">
            WIRE
          </div>
          <div>
            <p className="font-semibold text-2xl">Download <span className="text-[#F3CB04]">Our App</span> Now!</p>
            <p className="text-sm text-gray-400">
              Get all things membership, straight to your inbox.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Image
            src="/appstore.png"
            alt="Download on App Store"
            width={140}
            height={42}
          />
          <Image
            src="/PlayStore.png"
            alt="Get it on Google Play"
            width={140}
            height={42}
          />
        </div>
      </div>

      {/* Bottom */}
      <Separator className="my-8 bg-gray-800" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-400">
        <div className="flex items-center gap-1">
          <CopyrightIcon size={12} />
          <span>2025 The People Wire. All Rights Reserved.</span>
        </div>

        <div className="flex gap-6">
          <span className="hover:text-orange-400 cursor-pointer transition-colors">
            Privacy & Policy
          </span>
          <span className="hover:text-orange-400 cursor-pointer transition-colors">
            Disclaimer
          </span>
        </div>

        <Button
          onClick={handleBackToTop}
          className="bg-orange-500 hover:bg-orange-600 text-black flex gap-2"
        >
          Back To Top <ArrowUpIcon size={16} />
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
