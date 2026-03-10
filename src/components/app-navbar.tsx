"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { X, ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/client";
import { cn } from "@/lib/utils";
import NotifyForm from "./notifyform";

/* ================= TYPES ================= */

interface Article {
  id: string;
  title: string;
  image_url: string | null;
  summary: string | null;
  content: string | null;
  publish_datetime: string | null;
  author: string[] | null;
}

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

export default function AppNavbar() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifyFormOpen, setNotifyFormOpen] = useState(false);
  const [stickyBarVisible, setStickyBarVisible] = useState(true);

  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Article[]>([]);
  const [selected, setSelected] = useState<Article | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  /* ================= LOCK SCROLL ================= */

  useEffect(() => {
    if (searchOpen || menuOpen || notifyFormOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [searchOpen, menuOpen, notifyFormOpen]);

  /* ================= HELPERS ================= */

  const timeAgo = (date?: string | null) => {
    if (!date) return "";
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins} mins ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} hrs ago`;
    return `${Math.floor(hrs / 24)} days ago`;
  };

  const readTime = (text?: string | null) => {
    if (!text) return "1 min read";
    const words = text.split(" ").length;
    return `${Math.max(1, Math.ceil(words / 200))} min read`;
  };

  /* ================= FETCH ================= */

  const fetchArticles = async (query: string, pageNumber = 0) => {
    if (!query.trim()) {
      setResults([]);
      setHasMore(false);
      return;
    }

    const from = pageNumber * 8;
    const to = from + 7;

    const { data } = await supabase
      .from("article")
      .select(
        "id,title,image_url,summary,content,publish_datetime,author"
      )
      .ilike("title", `%${query}%`)
      .order("publish_datetime", { ascending: false })
      .range(from, to);

    if (data) {
      if (pageNumber === 0) {
        setResults(data);
      } else {
        setResults((prev) => [...prev, ...data]);
      }

      if (data.length < 8) setHasMore(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(0);
      setHasMore(true);
      fetchArticles(search, 0);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const loadMore = () => {
    const next = page + 1;
    setPage(next);
    fetchArticles(search, next);
  };

  const handleBack = () => {
    if (selected) {
      setSelected(null);
    } else {
      setSearchOpen(false);
      setSearch("");
      setResults([]);
      setSelected(null);
      setPage(0);
    }
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-50">
        <div className="mx-auto max-w-[1440px] px-4">
          <div className="flex h-16 items-center">
            <Link href="/">
              <Image src="/tpw1.png" alt="TPW" width={95} height={25} />
            </Link>

            <nav className="hidden lg:flex flex-1 justify-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "font-medium",
                    pathname === link.href
                      ? "text-[#F25C05]"
                      : "text-[#515151] hover:text-[#F25C05]"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="ml-auto flex items-center gap-4">
              <button onClick={() => setSearchOpen(true)}>
                <Image 
                  src="/searchbar.png"
                  alt="Search"
                  width={40}
                  height={40}
                  className="w-11 h-11 object-contain"
                />
              </button>

              <button
                onClick={() => setMenuOpen(true)}
                className="lg:hidden flex flex-col gap-1.5"
              >
                <span className="h-1 w-8 rounded bg-orange-500" />
                <span className="h-1 w-6 rounded bg-orange-500 self-end" />
                <span className="h-1 w-4 rounded bg-orange-500 self-end" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ================= STICKY NOTIFY BAR ================= */}
      {stickyBarVisible && (
        <div className="sticky top-16 z-40 w-full bg-white border-b border-gray-200 shadow-sm">
          <div className="mx-auto max-w-[1440px] px-4 py-2 sm:py-3">
            <div className="flex flex-row items-center justify-between gap-2">
              {/* Left side with logo and text */}
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 sm:w-16 sm:h-16 overflow-hidden flex-shrink-0">
                  <Image 
                    src="/tpw-black.png" 
                    alt="Logo" 
                    width={64} 
                    height={64}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  {/* Mobile: Two lines */}
                  <div className="block sm:hidden">
                    <div className="text-sm font-bold text-gray-900 leading-tight truncate">Free Lifetime Premium News</div>
                    <div className="text-sm font-bold text-gray-900 leading-tight truncate">
                      For The First 1,000 Readers.
                    </div>
                  </div>
                  {/* Desktop: One line */}
                  <div className="hidden sm:block text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900 leading-tight truncate">
                    Free Lifetime Premium News For The First 1,000 Readers.
                  </div>
                </div>
              </div>

              {/* Right side with notify button and close button */}
              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                <button
                  onClick={() => setNotifyFormOpen(true)}
                  className="px-3 sm:px-6 py-1.5 sm:py-2 rounded-md font-semibold text-xs sm:text-base transition-all transform hover:scale-105 shadow-md whitespace-nowrap"
                  style={{ backgroundColor: "#F25C05", color: "#ffffff" }}
                >
                  <span className="sm:hidden">Notify</span>
                  <span className="hidden sm:inline">Notify Me →</span>
                </button>
                <button
                  onClick={() => setStickyBarVisible(false)}
                  className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
                  style={{ color: "#F25C05" }}
                  aria-label="Close"
                >
                  <X size={18} className="sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= FULL SCREEN SEARCH ================= */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          {/* Search Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
            <div className="mx-auto max-w-7xl px-4 py-4">
              <div className="flex items-center gap-4">
                {/* Logo on the left */}
                <Link href="/" onClick={() => {
                  setSearchOpen(false);
                  setSearch("");
                  setResults([]);
                  setSelected(null);
                  setPage(0);
                }}>
                  <Image src="/tpw1.png" alt="TPW" width={95} height={25} />
                </Link>

                {/* Search input with searchbar.png icon */}
                <div className="flex-1 relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Image 
                      src="/innersearch.png"
                      alt="Search"
                      width={20}
                      height={20}
                      className="w-5 h-5 sm:w-5 sm:h-5 object-contain"
                    />
                  </div>
                  <input
                    autoFocus
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="      Search for anything"
                    className="w-full pl-10 pr-4 py-2 sm:py-3 text-base sm:text-lg border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F25C05] focus:border-transparent outline-none transition"
                  />
                </div>

                {/* Cancel button */}
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    setSearch("");
                    setResults([]);
                    setSelected(null);
                    setPage(0);
                  }}
                  className="px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-600 hover:text-gray-900 font-medium whitespace-nowrap"
                >
                  <span className="hidden xs:inline">Cancel</span>
                  <span className="xs:hidden">✕</span>
                </button>
              </div>
            </div>
          </div>

          {/* Search Content */}
          <div className="mx-auto max-w-7xl px-4 py-8">
            <SearchContent 
              search={search}
              setSearch={setSearch}
              results={results}
              selected={selected}
              setSelected={setSelected}
              hasMore={hasMore}
              loadMore={loadMore}
              timeAgo={timeAgo}
              readTime={readTime}
              close={() => {
                setSearchOpen(false);
                setSearch("");
                setResults([]);
                setSelected(null);
                setPage(0);
              }}
              handleBack={handleBack}
            />
          </div>
        </div>
      )}

      {/* ================= MOBILE MENU ================= */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="flex justify-between items-center h-16 px-4 border-b">
            <Image src="/tpw1.png" alt="TPW" width={95} height={25} />
            <button onClick={() => setMenuOpen(false)}>✕</button>
          </div>

          <div className="flex flex-col items-center justify-center gap-8 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "text-lg font-medium",
                  pathname === link.href
                    ? "text-[#F25C05]"
                    : "text-black"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ================= NOTIFY ME FORM ================= */}
      {notifyFormOpen && (
        <NotifyForm onClose={() => setNotifyFormOpen(false)} />
      )}
    </>
  );
}

/* ================= SEARCH CONTENT ================= */

interface SearchContentProps {
  search: string;
  setSearch: (value: string) => void;
  results: Article[];
  selected: Article | null;
  setSelected: (article: Article | null) => void;
  hasMore: boolean;
  loadMore: () => void;
  timeAgo: (date?: string | null) => string;
  readTime: (text?: string | null) => string;
  close: () => void;
  handleBack?: () => void;
}

function SearchContent({
  search,
  results,
  selected,
  setSelected,
  hasMore,
  loadMore,
  timeAgo,
  readTime,
  close,
  handleBack,
}: SearchContentProps) {
  
  if (selected) {
    return (
      <div className="max-w-5xl mx-auto">
        {/* Back button for article view */}
        <button
          onClick={() => setSelected(null)}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-[#F25C05] transition-colors group"
        >
          <div className="p-1.5 rounded-full group-hover:bg-gray-100 transition-colors">
            <ArrowLeft size={20} />
          </div>
          <span>Back to results</span>
        </button>

        {/* Full Article */}
        <article>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-gray-900">
            {selected.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-500 border-b pb-4">
            <span className="font-semibold text-gray-700">
              {selected.author?.[0] || "Staff Reporter"}
            </span>
            <span>•</span>
            <span>{timeAgo(selected.publish_datetime)}</span>
            <span>•</span>
            <span>{readTime(selected.content)}</span>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {selected.summary && (
              <div className="text-lg md:text-xl leading-relaxed text-gray-800 font-medium border-l-4 border-[#F25C05] pl-6">
                {selected.summary}
              </div>
            )}

            <div className="order-first lg:order-last">
              <img
                src={selected.image_url || "/home41.png"}
                alt={selected.title}
                className="w-full h-[300px] md:h-[380px] object-cover rounded-lg shadow-md"
              />
            </div>
          </div>

          {selected.content && (
            <div className="mt-10 space-y-6 text-[16px] md:text-[18px] leading-[1.8] text-gray-800 break-words">
              {selected.content.split("\n").map((p: string, i: number) =>
                p.trim() ? <p key={i}>{p}</p> : null
              )}
            </div>
          )}
        </article>
      </div>
    );
  }

  return (
    <>
      
      {search.trim() && (
        <p className="font-dmSans text-[24px] font-semibold text-black mb-4">
          Top Results for "{search}"
        </p>
      )}

      {/* Results Grid */}
      {results.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((item: Article) => (
              <div
                key={item.id}
                onClick={() => setSelected(item)}
                className="cursor-pointer bg-[#F5F5F5] rounded-2xl overflow-hidden hover:shadow-lg transition-all transform hover:scale-[1.02]"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image_url || "/home41.png"}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold line-clamp-2 text-gray-900">
                    {item.title}
                  </h3>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{timeAgo(item.publish_datetime)}</span>
                    <span>{readTime(item.content)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="text-center mt-10">
              <button
                onClick={loadMore}
                className="px-8 py-3 bg-[#F25C05] text-white rounded-lg font-semibold hover:bg-[#e04e00] transition-colors shadow-md hover:shadow-lg"
              >
                Load More Articles
              </button>
            </div>
          )}
        </>
      ) : (
        search.trim() && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-500">
              We couldn't find any articles matching "{search}"
            </p>
          </div>
        )
      )}

      {/* Initial State */}
      {!search.trim() && results.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📰</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Search for news</h3>
          <p className="text-gray-500">
            Type in the search bar to find articles
          </p>
        </div>
      )}
    </>
  );
}