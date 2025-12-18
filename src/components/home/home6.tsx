"use client";

import "./home2.css";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { ChevronRight, ChevronLeft,ArrowUpRight  } from "lucide-react";

type Article = {
  id: number;
  title: string;
  image: string;
  excerpt: string;
  author: string;
  authorAvatar: string;
  date: string;
};

const articles: Article[] = [
  {
    id: 1,
    title: "It’s All Home Water: Oregon Steelhead",
    image: "/home41.png",
    excerpt:
      "Cursor is one of the most popular AI code editors out there. It’s essentially a fork of VS Code, but with various AI features built into it. This means you get the same familiar interface as VS Code, but with added tools to help you write, fix, and improve code faster.",
    author: "Amal Neerad",
    authorAvatar: "/profile_41.png",
    date: "December 03, 2025",
  },
  {
    id: 2,
    title: "It’s All Home Water: Oregon Steelhead",
    image: "/home41.png",
    excerpt:
      "Cursor is one of the most popular AI code editors out there. It’s essentially a fork of VS Code, but with various AI features built into it. This means you get the same familiar interface as VS Code, but with added tools to help you write, fix, and improve code faster.",
    author: "Amal Neerad",
    authorAvatar: "/profile_41.png",
    date: "December 03, 2025",
  },
  {
    id: 3,
    title: "It’s All Home Water: Oregon Steelhead",
    image: "/home41.png",
    excerpt:
      "Cursor is one of the most popular AI code editors out there. It’s essentially a fork of VS Code, but with various AI features built into it. This means you get the same familiar interface as VS Code, but with added tools to help you write, fix, and improve code faster.",
    author: "Amal Neerad",
    authorAvatar: "/profile_41.png",
    date: "December 03, 2025",
  },
];

export default function Home4() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [activeArrow, setActiveArrow] =
    useState<"left" | "right" | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // 🔒 ADDITIVE FIX (nothing removed)
  const [lockHover, setLockHover] = useState(false);

  /* ---------------- DESKTOP DETECTION ---------------- */
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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
    <section className="w-full bg-white py-8 md:py-12 lg:pl-30">
      <div className="mx-auto max-w-8xl px-4 md:px-8">
        {/* HEADER */}
        <div className="mb-6 md:mb-8 flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Science & Tech
          </h2>

          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              className={`flex h-9 w-9 items-center justify-center rounded-md border
                ${
                  activeArrow === "left"
                    ? "bg-orange-500 border-orange-500 text-white"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
            >
              <ChevronLeft size={16} />
            </button>

            <button
              onClick={() => scroll("right")}
              className={`flex h-9 w-9 items-center justify-center rounded-md border
                ${
                  activeArrow === "right"
                    ? "bg-orange-500 border-orange-500 text-white"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* CARDS */}
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-scroll no-scrollbar"
        >
          {articles.map((article) => {
            const isActive = activeId === article.id;

            return (
              <article
                key={article.id}
                onClick={() => {
                  if (!isDesktop) {
                    setActiveId(isActive ? null : article.id);
                  }
                }}
                onMouseEnter={() => {
                  if (isDesktop) setActiveId(article.id);
                }}
                onMouseLeave={() => {
                  if (isDesktop && !lockHover) setActiveId(null);
                }}
                className={`
                  flex-shrink-0 cursor-pointer
                  w-[90vw] md:w-[536px]
                  h-auto md:h-[712px]
                  rounded-2xl overflow-hidden
                  transform transition-all duration-300 ease-out
                  ${
                    isActive
                      ? "scale-100 bg-[#FFF7F0]"
                      : "scale-[0.98] md:scale-[0.96] bg-white shadow-md hover:scale-[0.99] md:hover:scale-[0.98]"
                  }
                `}
              >
                {/* DEFAULT */}
                {!isActive && (
                  <>
                    <div className="relative h-[240px] md:h-[420px] w-full">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-col justify-between p-4 md:p-6 h-auto md:h-[292px]">
                      <div>
                        <div className="mb-3 flex items-center gap-2">
                          <Image
                            src={article.authorAvatar}
                            alt={article.author}
                            width={24}
                            height={24}
                            className="rounded-full"
                          />
                          <span
                            style={{ fontFamily: "var(--font-dm-sans)" }}
                            className="text-[12px] md:text-[14px] tracking-[-0.28px] text-black"
                          >
                            By {article.author}
                          </span>
                        </div>

                        <h3
                          style={{ fontFamily: "var(--font-albert-sans)" }}
                          className="text-[22px] md:text-[32px] font-bold tracking-[-1px] text-black leading-snug"
                        >
                          {article.title}
                        </h3>
                      </div>

                      <span
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                        className="mt-4 text-[13px] md:text-[15px] tracking-[-0.5px] text-[#727272]"
                      >
                        {article.date}
                      </span>
                    </div>
                  </>
                )}

                {/* ACTIVE */}
                {isActive && (
                  <div className="flex h-full flex-col justify-between p-5 md:p-10">
                    <div>
                      <div className="mb-4 md:mb-6 flex items-center gap-2">
                        <Image
                          src={article.authorAvatar}
                          alt={article.author}
                          width={28}
                          height={28}
                          className="rounded-full"
                        />
                        <span className="text-sm text-gray-700">
                          By {article.author}
                        </span>
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                        {article.title}
                      </h3>

                      <p
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                        className="mt-3 md:mt-4 text-[15px] md:text-[18px] leading-[22px] md:leading-[25px] text-black"
                      >
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs md:text-sm text-gray-500">
                        {article.date}
                      </span>

                      {/* ✅ READ MORE – CLICK FIX ONLY */}
                      <button
                        onMouseEnter={() => setLockHover(true)}
                        onMouseLeave={() => setLockHover(false)}
                        onClick={(e) => {
                          console.log("Read More clicked");
                          e.stopPropagation();
                          // navigation logic here
                        }}
                        style={{ fontFamily: "var(--font-albert-sans)" }}
                        className="flex items-center gap-2 rounded-lg border border-[#F25C05]
  px-3 md:px-4 py-2 text-[14px] md:text-[16px]
  font-semibold tracking-[-0.5px] text-[#F25C05]
  hover:bg-orange-50
  transition-transform duration-150 ease-out
  active:scale-95"
                      >
                        Read More  <ArrowUpRight size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
