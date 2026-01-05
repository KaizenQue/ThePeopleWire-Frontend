"use client";

import "./topstories2.css";
import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  User,
  Calendar,
  Tag,
  Clock,
  ExternalLink,
} from "lucide-react";

/* ================= TYPES ================= */
type ApiArticle = {
  id: string;
  title: string;
  image_url: string | null;
  category?: string[];
  author?: string[];
  publish_datetime: string;
  link: string;
  summary?: string;
  content?: string;
  description?: string;
  source_id?: string;
};

type Story = {
  id: number;
  title: string;
  image: string;
  category: string;
  author: string;
  readTime: string;
  link: string;
  summary?: string;
  content?: string;
  source?: string;
  publish_datetime?: string;
};

/* ================= HELPERS ================= */
const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const calculateReadingTime = (text?: string) => {
  if (!text) return "1 min";
  const words = text.replace(/[^\w\s]/g, "").split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} min`;
};

const getSourceName = (story: Story) =>
  story.source
    ? story.source
        .split(/[_-]/)
        .map((w) => w[0].toUpperCase() + w.slice(1))
        .join(" ")
    : "Unknown Source";

const fetchAllNews = async (): Promise<ApiArticle[]> => {
  try {
    const res = await fetch("/api/news?category=science&language=english");
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
};

const convertApiToStory = (a: ApiArticle, i: number): Story => ({
  id: i,
  title: a.title,
  image: a.image_url || "/home41.png",
  category: a.category?.[0] || "General",
  author: a.author?.[0] || "Unknown",
  readTime: calculateReadingTime(
    a.content || a.description || a.summary
  ),
  link: a.link,
  summary: a.summary || a.description,
  content: a.content || a.description,
  source: a.source_id,
  publish_datetime: a.publish_datetime,
});

/* ================= ARTICLE MODAL ================= */
const ArticleModal = ({
  story,
  onClose,
}: {
  story: Story;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-2xl overflow-y-auto relative shadow-xl">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 rounded-full p-2"
        >
          <X size={18} />
        </button>

        {/* HEADER */}
        <div className="p-6 border-b">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
            {story.title}
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <User size={14} /> {story.author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              {story.publish_datetime &&
                formatDate(story.publish_datetime)}
            </div>
            <div className="flex items-center gap-2">
              <Tag size={14} /> {getSourceName(story)}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} /> {story.readTime}
            </div>
          </div>
        </div>

        {/* SUMMARY */}
        {(story.summary || story.image) && (
          <div className="p-6 bg-orange-50 border-b flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full" />
                Article Summary
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {story.summary}
              </p>
              <p className="text-xs text-gray-500 mt-3">
                Photo Source: {getSourceName(story)}
              </p>
            </div>

            {story.image && (
              <div className="w-full md:w-[260px]">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-[180px] object-cover rounded-xl shadow"
                  onError={(e) =>
                    ((e.currentTarget as HTMLImageElement).src =
                      "/home41.png")
                  }
                />
              </div>
            )}
          </div>
        )}

        {/* FULL ARTICLE */}
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">
            Full Article{" "}
            <span className="text-xs text-gray-400 ml-2">
              {story.readTime} read
            </span>
          </h2>

          <div className="prose prose-sm md:prose-base max-w-none text-gray-800">
            {(story.content || "")
              .split("\n")
              .filter(Boolean)
              .map((p, i) => (
                <p key={i}>{p}</p>
              ))}
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-6 border-t flex justify-end">
          <a
            href={story.link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium flex items-center gap-2"
          >
            View Original Source <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

/* ================= TILE ================= */
const NewsTile = ({
  story,
  onClick,
}: {
  story: Story;
  onClick: (s: Story) => void;
}) => (
  <div
    onClick={() => onClick(story)}
    className="bg-white rounded-2xl overflow-hidden border hover:shadow-lg cursor-pointer transition"
  >
    <div className="h-[180px] w-full overflow-hidden">
      <img
        src={story.image}
        alt={story.title}
        className="w-full h-full object-cover"
        onError={(e) =>
          ((e.currentTarget as HTMLImageElement).src = "/home41.png")
        }
      />
    </div>

    <div className="p-5">
      <h3 className="text-lg font-bold leading-snug mb-3 line-clamp-3">
        {story.title}
      </h3>
      <p className="text-sm text-gray-600 font-medium uppercase">
        BY {story.author}
      </p>
    </div>
  </div>
);

/* ================= MAIN ================= */
export default function Home4() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [stories, setStories] = useState<Story[]>([]);
  const [activeStory, setActiveStory] = useState<Story | null>(null);

  useEffect(() => {
    fetchAllNews().then((data) =>
      setStories(data.slice(0, 16).map(convertApiToStory))
    );
  }, []);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <>
      <section className="bg-white py-10">
        <div className="max-w-8xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">More News</h2>

          {/* MOBILE */}
          <div className="md:hidden">
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto pb-4"
            >
              {stories.map((s) => (
                <NewsTile
                  key={s.id}
                  story={s}
                  onClick={setActiveStory}
                />
              ))}
            </div>

            <div className="flex justify-center gap-4 mt-4">
              <button onClick={() => scroll("left")}>
                <ChevronLeft />
              </button>
              <button onClick={() => scroll("right")}>
                <ChevronRight />
              </button>
            </div>
          </div>

          {/* DESKTOP */}
          <div className="hidden md:grid grid-cols-4 gap-6">
            {stories.map((s) => (
              <NewsTile
                key={s.id}
                story={s}
                onClick={setActiveStory}
              />
            ))}
          </div>
        </div>
      </section>

      {activeStory && (
        <ArticleModal
          story={activeStory}
          onClose={() => setActiveStory(null)}
        />
      )}
    </>
  );
}
