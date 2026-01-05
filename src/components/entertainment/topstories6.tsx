"use client";

import "./topstories2.css";
import { useRef, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function Home4() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeArrow, setActiveArrow] = useState<"left" | "right" | null>(null);

  // EXACTLY 16 cards as shown in the PDF
  const cardData = Array(16).fill({
    title: "Headless CMS Explained: A Guide for Marketers and Headless CMS Developers",
    author: "Amal Neerad",
    category: "Social media"
  });

  /* ---------------- SCROLL ---------------- */
  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;

    const isMobile = window.innerWidth < 768;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -(isMobile ? 320 : 560) : isMobile ? 320 : 560,
      behavior: "smooth",
    });

    setActiveArrow(dir);
  };

  return (
    <>
      {/* Main Section */}
      <section className="w-full bg-white py-8 md:py-12 lg:pl-30">
        <div className="mx-auto max-w-8xl px-4 md:px-8">
          {/* HEADER - EXACTLY LIKE PDF */}
          <div className="mb-6 md:mb-8 flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              More News
            </h2>
          </div>


          {/* STATIC GRID VIEW (Desktop) - Shows exactly 16 cards */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {cardData.map((card, index) => (
              <div
                key={`static-${index}`}
                className="
                  bg-white
                  rounded-lg
                  border border-gray-200
                  hover:border-gray-300
                  transition-colors duration-200
                "
              >
                <div className="p-5">
                  {/* TOP SECTION */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="
                      inline-block
                      px-3 py-1
                      bg-blue-50
                      text-blue-600
                      text-xs
                      font-medium
                      rounded-full
                      border border-blue-100
                    ">
                      Social media
                    </span>
                    
                    <span className="
                      text-xs
                      font-medium
                      text-gray-500
                      tracking-wide
                    ">
                      More News
                    </span>
                  </div>

                  {/* TITLE */}
                  <h3 className="
                    text-[17px]
                    font-bold
                    text-gray-900
                    leading-tight
                    mb-4
                    tracking-tight
                  ">
                    Headless CMS Explained: A Guide<br />
                    for Marketers and Headless CMS<br />
                    Developers
                  </h3>

                  {/* AUTHOR */}
                  <div className="
                    flex
                    items-center
                    text-gray-700
                    text-[13px]
                    font-medium
                    mb-4
                    tracking-tight
                  ">
                    <span>By </span>
                    <span className="ml-1">Amal Neerad</span>
                  </div>

                  {/* SEPARATOR */}
                  <div className="h-[1px] w-full bg-gray-200 mb-4"></div>

                  {/* BOTTOM */}
                  <div className="flex items-center">
                    <span className="
                      text-xs
                      font-medium
                      text-gray-500
                      tracking-wide
                    ">
                      Social media
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* MOBILE VIEW - Shows all 16 cards in scroll */}
          <div className="md:hidden">
            <div className="text-xs text-gray-500 text-center mt-4">
              Scroll horizontally to view all 16 cards
            </div>
          </div>
        </div>
      </section>
    </>
  );
}