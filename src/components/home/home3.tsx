"use client";
 
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
    image: "/1.png",
    excerpt:
      "Cursor is one of the most popular AI code editors out there. It’s essentially a fork of VS Code with powerful AI workflows built in.",
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
    title: "Hidden Cities of Europe",
    image: "/1.png",
    excerpt:
      "A visual journey through Europe’s most underrated urban landscapes.",
    author: "Amal Neerad",
    authorAvatar: "/2.png",
    date: "December 11, 2025",
  },
  {
    id: 7,
    title: "Hidden Cities of Europe",
    image: "/1.png",
    excerpt:
      "A visual journey through Europe’s most underrated urban landscapes.",
    author: "Amal Neerad",
    authorAvatar: "/2.png",
    date: "December 11, 2025",
  },
  {
    id: 8,
    title: "Hidden Cities of Europe",
    image: "/1.png",
    excerpt:
      "A visual journey through Europe’s most underrated urban landscapes.",
    author: "Amal Neerad",
    authorAvatar: "/2.png",
    date: "December 11, 2025",
  },
  {
    id: 9,
    title: "Hidden Cities of Europe",
    image: "/1.png",
    excerpt:
      "A visual journey through Europe’s most underrated urban landscapes.",
    author: "Amal Neerad",
    authorAvatar: "/2.png",
    date: "December 11, 2025",
  },
  {
    id: 10,
    title: "Hidden Cities of Europe",
    image: "/1.png",
    excerpt:
      "A visual journey through Europe’s most underrated urban landscapes.",
    author: "Amal Neerad",
    authorAvatar: "/2.png",
    date: "December 11, 2025",
  },
  {
    id: 11,
    title: "Hidden Cities of Europe",
    image: "/1.png",
    excerpt:
      "A visual journey through Europe’s most underrated urban landscapes.",
    author: "Amal Neerad",
    authorAvatar: "/2.png",
    date: "December 11, 2025",
  },
];
 
export default function Home3() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [activeArrow, setActiveArrow] =
    useState<"left" | "right" | null>(null);
 
  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
 
    scrollRef.current.scrollBy({
      left: dir === "left" ? -340 : 340,
      behavior: "smooth",
    });
 
    setActiveArrow(dir);
  };
 
  return (
    <section className="w-full bg-white py-10">
      <div className="mx-auto max-w-8xl px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">
            International
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
 
        {/* Cards */}
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
                  relative flex-shrink-0 cursor-pointer
                  rounded-2xl overflow-hidden shadow-lg
                  transition-all duration-500 ease-out
                  ${isActive ? "w-[340px]" : "w-[260px]"}
                  h-[420px]
                `}
              >
                {/* Image */}
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
 
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
 
                {/* Content */}
                <div className="relative z-10 flex h-full flex-col justify-between px-10 py-50 text-white">
                  <h3 className="text-lg font-semibold leading-snug">
                    {article.title}
                  </h3>
                   <h3 className="text-xs font-normal py-30 leading-snug">
                    {article.date}
                  </h3>
 
                  {isActive && (
                    <>
                      <p className="mt-3 text-sm text-gray-200 line-clamp-4">
                        {article.excerpt}
                      </p>
                     
 
                      <div className="mt-4 flex items-center gap-2 text-sm">
                        <Image
                          src={article.authorAvatar}
                          alt={article.author}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <span>{article.author}</span>
                      </div>
 
                      <p className="mt-1 text-xs text-gray-300">
                        {article.date}
                      </p>
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
 
 