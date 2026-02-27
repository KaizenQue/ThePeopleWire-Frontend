"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

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

const AppNavbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-50">
        <div className="mx-auto max-w-[1440px] px-4 ">
          <div className="flex h-16 items-center">

            {/* Logo — Left */}
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/tpw1.png"
                alt="The People Wire"
                width={95}
                height={25}
                priority
              />
            </Link>

            {/* ================= DESKTOP NAV (LG+) ================= */}
            <nav className="hidden lg:flex flex-1 justify-center">
              <ul className="flex items-center whitespace-nowrap
                gap-4 xl:gap-6 2xl:gap-8">
                {navLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className={cn(
                          "px-2 py-2 rounded-md transition-colors font-medium",
                          "text-[13px] xl:text-sm 2xl:text-[15px]",
                          active
                            ? "text-[#F25C05] bg-[#FEEFE6]"
                            : "text-[#515151] hover:text-[#F25C05]"
                        )}
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* ================= MOBILE + TABLET HAMBURGER ================= */}
            <button
              onClick={() => setMenuOpen(true)}
              className="ml-auto lg:hidden flex flex-col gap-1.5"
              aria-label="Open menu"
            >
              <span className="h-1 w-8 rounded bg-orange-500" />
              <span className="h-1 w-6 rounded bg-orange-500 self-end" />
              <span className="h-1 w-4 rounded bg-orange-500 self-end" />
            </button>
          </div>
        </div>
      </header>

      {/* ================= MOBILE + TABLET MENU ================= */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col">

          {/* Top bar */}
          <div className="flex items-center justify-between px-4 h-16">
            <Image
              src="/tpw1.png"
              alt="The People Wire"
              width={95}
              height={25}
            />
            <button
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-light"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {/* Nav Items */}
          <div className="flex flex-1 flex-col items-center justify-center gap-8">
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

          {/* Bottom App Card */}
          <div className="px-4 pb-6">
            <div className="rounded-2xl bg-black p-6 text-white">
              <div className="flex items-center gap-4">
                <Image
                  src="/appiconn.png"
                  alt="App Icon"
                  width={56}
                  height={56}
                />
                <div>
                  <h3 className="text-xl font-semibold text-[#F3CB04]">
                    App Launching Soon... 
                  </h3>
                  <p className="text-sm text-gray-300 mt-1">
                    Your Next-Gen News Destination
                  </p>
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <Image
                  src="/App-Store-CommingSoon.png"
                  alt="Download on App Store"
                  width={150}
                  height={48}
                />
                <Image
                  src="/Play-Store-CommingSoon.png"
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
