"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/AboutUs" },
  { name: "Contact Us", href: "/ContactUs" },
];

const AppNavbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="w-full bg-white shadow-sm relative z-50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="relative flex h-16 items-center">

            {/* Logo — Left */}
            <Link href="/" className="flex items-center">
              <Image
                src="/icon.svg"
                alt="The People Wire"
                width={110}
                height={32}
                priority
              />
            </Link>

            {/* ================= CENTER NAV (Desktop & Tablet) ================= */}
            <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-12">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors",
                      active
                        ? "text-[#F25C05] bg-[#FEEFE6] px-5 py-2 rounded-lg"
                        : "text-[#515151] hover:text-[#F25C05]"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* ================= Mobile Hamburger — Right ================= */}
            <button
              onClick={() => setMenuOpen(true)}
              className="ml-auto md:hidden flex flex-col gap-1.5"
              aria-label="Open menu"
            >
              <span className="h-1 w-8 rounded bg-orange-500" />
              <span className="h-1 w-6 rounded bg-orange-500 self-end" />
              <span className="h-1 w-4 rounded bg-orange-500 self-end" />
            </button>
          </div>
        </div>
      </header>

      {/* ================= MOBILE FULLSCREEN MENU ================= */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col">

          {/* Top bar */}
          <div className="flex items-center justify-between px-4 h-16">
            <Image
              src="/icon.svg"
              alt="The People Wire"
              width={100}
              height={30}
            />
            <button
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-light"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {/* Centered Nav Items */}
          <div className="flex flex-1 flex-col items-center justify-center gap-10">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "text-lg font-medium",
                    active
                      ? "text-[#F25C05] bg-[#FEEFE6] px-8 py-3 rounded-xl"
                      : "text-[#515151]"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Bottom Download Card */}
          <div className="px-4 pb-6">
            <div className="rounded-2xl bg-black p-6 text-white">
              <div className="flex items-center gap-4">
                <Image
                  src="/footerLogo.png"
                  alt="App Icon"
                  width={56}
                  height={56}
                />
                <div>
                  <h3 className="text-xl font-semibold">
                    Download <span className="text-yellow-400">Our App</span>
                  </h3>
                  <p className="text-sm text-gray-300 mt-1">
                    Get all things membership, straight to your inbox.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <Image
                  src="/appstore.png"
                  alt="Download on App Store"
                  width={150}
                  height={48}
                />
                <Image
                  src="/playstore.png"
                  alt="Get it on Google Play"
                  width={150}
                  height={48}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppNavbar;
