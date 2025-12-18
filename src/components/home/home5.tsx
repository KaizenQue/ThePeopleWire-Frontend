"use client";

import "./home3.css";
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
    image: "/1.png",
    excerpt:
      "Cursor is one of the most popular AI code editors out there. It’s essentially a fork of VS Code, but with various AI features built into it. This means you get the same familiar interface as VS Code, but with added tools to help you write, fix, and improve code faster.",
    author: "Amal Neerad",
    authorAvatar: "/2.png",
    date: "December 03, 2025",
  },
  {
    id: 2,
    title: "Inside Modern Architecture",
    image: "/1.png",
    excerpt:
      "A deep dive into contemporary design trends shaping the future of architecture worldwide.",
    author: "Amal Neerad",
    authorAvatar: "/2.png",
    date: "December 05, 2025",
  },
  {
    id: 3,
    title: "Human Stories from Across the Globe",
    image: "/1.png",
    excerpt:
      "Powerful portraits and stories capturing emotion, culture, and human resilience.",
    author: "Amal Neerad",
    authorAvatar: "/2.png",
    date: "December 07, 2025",
  },
  {
    id: 4,
    title: "Travel Beyond the Obvious",
    image: "/1.png",
    excerpt:
      "Exploring destinations that rarely make it to travel brochures but leave lasting impressions.",
    author: "Amal Neerad",
    authorAvatar: "/2.png",
    date: "December 09, 2025",
  },
  {
    id: 5,
    title: "Hidden Cities of Europe",
    image: "/1.png",
    excerpt:
      "A visual journey through Europe’s most underrated urban landscapes.",
    author: "Amal Neerad",
    authorAvatar: "/2.png",
    date: "December 11, 2025",
  },
  {
    id: 6,
    title: "The Art of Slow Living",
    image: "/1.png",
    excerpt:
      "Why slowing down might be the most powerful productivity hack.",
    author: "Amal Neerad",
    authorAvatar: "/2.png",
    date: "December 13, 2025",
  },
  {
    id: 7,
    title: "Designing for Humans",
    image: "/1.png",
    excerpt:
      "Great design starts with empathy, not pixels.",
    author: "Amal Neerad",
    authorAvatar: "/2.png",
    date: "December 14, 2025",
  },
  {
    id: 8,
    title: "Inside Digital Newsrooms",
    image: "/1.png",
    excerpt:
      "How modern newsrooms operate in a 24/7 digital world.",
    author: "Amal Neerad",
    authorAvatar: "/2.png",
    date: "December 15, 2025",
  },
  {
    id: 9,
    title: "The Power of Visual Storytelling",
    image: "/1.png",
    excerpt:
      "Images don’t just support stories — they are the story.",
    author: "Amal Neerad",
    authorAvatar: "/2.png",
    date: "December 16, 2025",
  },
  {
    id: 10,
    title: "Where Journalism Meets Tech",
    image: "/1.png",
    excerpt:
      "AI, automation, and the future of storytelling.",
    author: "Amal Neerad",
    authorAvatar: "/2.png",
    date: "December 17, 2025",
  },
];
export default function Home3() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [activeArrow, setActiveArrow] =
    useState<"left" | "right" | null>(null);

  /* ✅ DESKTOP DETECTION (additive) */
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: dir === "left" ? -340 : 340,
      behavior: "smooth",
    });

    setActiveArrow(dir);
  };

  return (
    <section className="w-full bg-white py-10 lg:pl-30">
      <div className="mx-auto max-w-8xl px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">
            Entertainment
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

        {/* Cards */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-scroll no-scrollbar py-4"
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
                  if (isDesktop) setActiveId(null);
                }}
                className={`
                  relative flex-shrink-0 cursor-pointer
                  w-[260px] h-[420px]
                  rounded-2xl overflow-hidden
                  transform transition-all duration-300 ease-out
                  ${
                    isActive
                      ? "scale-[1.02] -translate-y-2 shadow-2xl"
                      : "scale-100 shadow-lg hover:-translate-y-1 hover:scale-[1.01]"
                  }
                `}
              >
                {/* Image */}
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

                {/* Content */}
                <div className="relative z-10 flex h-full flex-col justify-between p-6 text-white">
                  {!isActive && (
                    <>
                      <div className="flex items-center gap-2 text-xs opacity-90">
                        <Image
                          src={article.authorAvatar}
                          alt={article.author}
                          width={18}
                          height={18}
                          className="rounded-full"
                        />
                        <span>By {article.author}</span>
                      </div>

                      <div>
                        <h3 className="mt-2 text-lg font-semibold leading-snug">
                          {article.title}
                        </h3>

                        <p className="mt-3 text-xs text-gray-300">
                          {article.date}
                        </p>
                      </div>
                    </>
                  )}

                  {isActive && (
                    <>
                      <div>
                        <div className="mb-4 flex items-center gap-2 text-xs">
                          <Image
                            src={article.authorAvatar}
                            alt={article.author}
                            width={18}
                            height={18}
                            className="rounded-full"
                          />
                          <span>By {article.author}</span>
                        </div>

                        <h3 className="text-lg font-semibold leading-snug">
                          {article.title}
                        </h3>

                        <p className="mt-3 text-sm text-gray-200">
                          {article.excerpt}
                        </p>
                      </div>

                      <div>
                        <p className="mb-4 text-xs text-gray-300">
                          {article.date}
                        </p>

                        {/* ✅ Read More — desktop hover + mobile click feedback */}
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="flex w-full items-center justify-center gap-2
                            rounded-md border border-orange-500 px-4 py-2
                            text-sm font-medium text-orange-500
                            hover:bg-orange-500 hover:text-white
                            transition-all duration-150 ease-out
                            active:scale-95
                            lg:hover:scale-[0.97]"
                        >
                          Read More  <ArrowUpRight size={16} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
