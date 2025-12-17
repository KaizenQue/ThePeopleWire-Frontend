"use client";

import "./home4.css";
import Image from "next/image";
import { useRef, useState } from "react";

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
    title: "Inside Modern Architecture",
    image: "/home41.png",
    excerpt:
      "A deep dive into contemporary design trends shaping the future of architecture worldwide.",
    author: "Amal Neerad",
    authorAvatar: "/2.png",
    date: "December 05, 2025",
  },
  {
    id: 3,
    title: "Human Stories from Across the Globe",
    image: "/home41.png",
    excerpt:
      "Powerful portraits and stories capturing emotion, culture, and human resilience.",
    author: "Amal Neerad",
    authorAvatar: "/2.png",
    date: "December 07, 2025",
  },
];

export default function Home4() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [activeArrow, setActiveArrow] =
    useState<"left" | "right" | null>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: dir === "left" ? -560 : 560,
      behavior: "smooth",
    });

    setActiveArrow(dir);
  };

  return (
    <section className="w-full bg-white py-12">
      <div className="mx-auto max-w-8xl px-8">
        {/* ================= HEADER ================= */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">
            Business
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
              ←
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
              →
            </button>
          </div>
        </div>

        {/* ================= CARDS ================= */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-scroll no-scrollbar"
        >
          {articles.map((article) => {
            const isActive = activeId === article.id;

            return (
              <article
                key={article.id}
                onClick={() =>
                  setActiveId(isActive ? null : article.id)
                }
                className={`
                  flex-shrink-0 cursor-pointer
                  w-[536px] h-[712px]
                  rounded-2xl overflow-hidden
                  transform transition-all duration-300 ease-out
                  ${
                    isActive
                      ? "scale-100 bg-[#FFF7F0] shadow-xl"
                      : "scale-[0.96] bg-white shadow-md hover:scale-[0.98]"
                  }
                `}
              >
                {/* ========= DEFAULT STATE ========= */}
                {!isActive && (
                  <>
                    <div className="relative h-[420px] w-full">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex h-[292px] flex-col justify-between p-6">
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
  className="text-[14px] font-normal leading-normal tracking-[-0.28px] text-black"
>
  By {article.author}
</span>

                        </div>

                        <h3 className="text-xl font-bold leading-snug text-gray-900">
                          {article.title}
                        </h3>
                      </div>

                      <span className="text-sm text-gray-500">
                        {article.date}
                      </span>
                    </div>
                  </>
                )}

                {/* ========= ACTIVE STATE ========= */}
                {isActive && (
                  <div className="flex h-full flex-col justify-between p-10">
                    <div>
                      <div className="mb-6 flex items-center gap-2">
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

                      <h3 className="text-2xl font-bold leading-snug text-gray-900">
                        {article.title}
                      </h3>

                      <p className="mt-4 text-base leading-relaxed text-gray-600">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {article.date}
                      </span>

                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 rounded-lg border border-orange-500 px-4 py-2 text-sm font-medium text-orange-500 hover:bg-orange-50"
                      >
                        Read More ↗
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
