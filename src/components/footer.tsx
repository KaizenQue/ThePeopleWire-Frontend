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
import { BiColor } from "react-icons/bi";

const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-black text-white">

      {/* ================= FULL-BLEED QR SECTION ================= */}
      <div className="w-full">
        {/* Mobile + Tablet (Full Width, No Padding) */}
        <div className="block lg:hidden w-full">
          <Image
            src="/footer-qr-mobile.png"
            alt="Scan to explore The People Wire"
            width={1200}
            height={400}
            className="w-full h-auto object-cover block"
            priority
          />
        </div>

        {/* Desktop + Laptop – Larger QR */}
<div className="hidden lg:flex justify-center w-full">
  <Image
    src="/footer-qr.png"
    alt="Scan to explore The People Wire"
    width={1950}
    height={1450}
    className="block object-contain"
    priority
  />
</div>

      </div>

      {/* ================= PADDED FOOTER CONTENT ================= */}
      <div className="px-6 md:px-[6%] lg:px-[8%]">

        {/* ================= TOP SECTION ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <Image
              src="/icon-white.svg"
              alt="The People Wire Logo"
              width={180}
              height={60}
              priority
            />

            <p className="text-sm text-gray-400 leading-relaxed">
              Your Next-Gen News Destination
            </p>

            <div className="flex gap-8 text-[#F25C05] pt-2">
              <FaFacebook className="size-7 cursor-pointer hover:opacity-80" />
              <FaYoutube className="size-7 cursor-pointer hover:opacity-80" />
              <FaInstagram className="size-7 cursor-pointer hover:opacity-80" />
              <FaLinkedin className="size-7 cursor-pointer hover:opacity-80" />
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-[#F25C05] font-semibold mb-6 text-lg">
              Categories
            </h3>

            <div className="grid grid-cols-2 gap-y-4 text-sm text-gray-300">
              <span className="hover:text-[#F25C05] cursor-pointer">Top Stories</span>
              <span className="hover:text-[#F25C05] cursor-pointer">Entertainment</span>
               <span className="hover:text-[#F25C05] cursor-pointer">Latest</span>
               <span className="hover:text-[#F25C05] cursor-pointer">Science & Tech</span>
              <span className="hover:text-[#F25C05] cursor-pointer">International</span>
              <span className="hover:text-[#F25C05] cursor-pointer">Sports</span>
               <span className="hover:text-[#F25C05] cursor-pointer">Business</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[#F25C05] font-semibold mb-6 text-lg">
              Reach Out To Us
            </h3>

            <div className="flex flex-col gap-5 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <MapPinIcon size={18} />
                <span>23 Main Street, 12345,</span>
              </div>

              <div className="flex items-start gap-3">
                <MailIcon size={18} />
                <span>thepeoplewire@gmail.com</span>
              </div>

              <div className="flex items-start gap-3">
                <PhoneIcon size={18} />
                <span>1234567890</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= APP DOWNLOAD + BACK TO TOP ================= */}
        <div className="mt-16 flex flex-col md:flex-row items-end justify-between gap-8">
          {/* App Card */}
          <div className="w-full md:max-w-4xl border border-[#F3CB04] rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
            <Image
              src="/footerLogo.png"
              alt="The People Wire App"
              width={64}
              height={64}
            />

            <div className="flex-1 text-center md:text-left">
              <p className="font-semibold text-xl text-[#F3CB04]">
                App Launching Soon...
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Your Next-Gen News Destination
              </p>
            </div>

            <div className="flex flex-col md:flex-col lg:flex-row gap-4">
              <Image
                src="/App-Store-CommingSoon.png"
                alt="App Store – Coming Soon"
                width={150}
                height={48}
              />
              <Image
                src="/Play-Store-CommingSoon.png"
                alt="Google Play – Coming Soon"
                width={150}
                height={48}
              />
            </div>
          </div>

          {/* Back To Top */}
          <Button
            onClick={handleBackToTop}
            className="w-full md:w-auto bg-[#F25C05] hover:bg-orange-600 text-white px-10 py-5 text-lg flex items-center gap-3 md:mb-2"
          >
            Back To Top <ArrowUpIcon size={18} />
          </Button>
        </div>

        {/* ================= DIVIDER ================= */}
        <Separator className="my-10 bg-[#F25C05]" />

        {/* ================= BOTTOM ================= */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400 mb-12">
          <div className="flex items-center gap-1">
  <CopyrightIcon size={12} color="#F25C05" />
  <span className="font-['Albert_Sans']">
    2026 The People Wire. All Rights Reserved.
  </span>
</div>


          <div className="flex gap-8">
            <span className="hover:text-[#F25C05] cursor-pointer">
              About Us
            </span>
            <span className="hover:text-[#F25C05] cursor-pointer">
              Contact Us
            </span>
             <span className="hover:text-[#F25C05] cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-[#F25C05] cursor-pointer">
              Disclaimer
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
