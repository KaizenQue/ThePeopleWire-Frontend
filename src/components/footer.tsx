"use client";

import {
  CopyrightIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  ArrowUpIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa6";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

/* ================= NAV LINKS ================= */

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Top Stories", href: "/Top-Stories" },
  { name: "Latest", href: "/Latest" },
  { name: "International", href: "/International" },
  { name: "Business", href: "/Business" },
  { name: "Entertainment", href: "/Entertainment" },
  { name: "Science & Tech", href: "/Science-Tech" },
  { name: "Sports", href: "/Sports" },
];

const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-black text-white">

      {/* ================= FULL-BLEED QR SECTION ================= */}
      <div className="w-full">
        {/* Mobile + Tablet */}
        <div className="block lg:hidden w-full">
          <div className="relative w-full h-[300px] md:h-[400px]">
            <Image
              src="/mobqrfooter.png"
              alt="Scan to explore The People Wire"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        </div>

        {/* Desktop + Laptop – Larger QR */}
        <div className="hidden lg:flex justify-center w-full">
          <div className="relative w-full h-[700px] max-w-[2150px]">
            <Image
              src="/qrfooter.png"
              alt="Scan to explore The People Wire"
              fill
              className="object-contain"
              sizes="1950px"
              priority
            />
          </div>
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

          {/* Categories (LINKED) */}
          <div>
            <h3 className="text-[#F25C05] font-semibold mb-6 text-lg">
              Categories
            </h3>

            <div className="grid grid-cols-2 gap-y-4 text-sm text-gray-300">
              {navLinks
                .filter((link) => link.name !== "Home")
                .map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="hover:text-[#F25C05] transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
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
                <span>23 Main Street, 12345</span>
              </div>

              <div className="flex items-start gap-3">
                <MailIcon size={18} />
                <a
                  href="mailto:thepeoplewire@gmail.com"
                  className="hover:text-[#F25C05]"
                >
                  thepeoplewire@gmail.com
                </a>
              </div>

              <div className="flex items-start gap-3">
                <PhoneIcon size={18} />
                <a
                  href="tel:1234567890"
                  className="hover:text-[#F25C05]"
                >
                  1234567890
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ================= APP DOWNLOAD + BACK TO TOP ================= */}
        <div className="mt-16 flex flex-col md:flex-row items-end justify-between gap-8">

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

          <Button
            onClick={handleBackToTop}
            className="w-full md:w-auto bg-[#F25C05] hover:bg-orange-600 text-white px-10 py-5 text-lg flex items-center gap-3 md:mb-2"
          >
            Back To Top <ArrowUpIcon size={18} />
          </Button>
        </div>

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
            <Link href="/About-Us" className="hover:text-[#F25C05]">
              About Us
            </Link>
            <Link href="/Contact-Us" className="hover:text-[#F25C05]">
              Contact Us
            </Link>
            <Link href="/Privacy-Policy" className="hover:text-[#F25C05]">
              Privacy Policy
            </Link>
            <Link href="/Disclaimer" className="hover:text-[#F25C05]">
              Disclaimer
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;