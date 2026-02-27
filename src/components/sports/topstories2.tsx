"use client";

import "./home2.css";
import { useRef, useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, ArrowUpRight, X, Calendar, User, Tag, Clock } from "lucide-react";

type ApiArticle = {
  id: string;
  title: string;
  image_url: string | null;
  category?: string[];
  author?: string[];
  publish_datetime: string;
  summary: string;
  link: string;
  content?: string;
  description?: string;
  country?: string[];
  source_id?: string;
};

export default function Home4() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeArrow, setActiveArrow] = useState<"left" | "right" | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [apiArticles, setApiArticles] = useState<ApiArticle[]>([]);
  
  // State for article modal
  const [selectedArticle, setSelectedArticle] = useState<ApiArticle | null>(null);
  const [showArticleModal, setShowArticleModal] = useState(false);

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

  /* ---------------- DATA RETRIEVAL ---------------- */
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/news?language=english&limit=15");
        const json = await res.json();
        const fetchedArticles: ApiArticle[] = json.data || [];

        if (!fetchedArticles.length) return;

        /* SMALL STORIES */
        const mappedArticles: ApiArticle[] = fetchedArticles.map(
          (item, index) =>
            ({
              id: item.id,
              title: item.title,
              image_url: item.image_url || "/home41.png",
              category: item.category,
              author: item.author,
              publish_datetime: new Date(item.publish_datetime).toDateString(),
              summary: item.summary || item.description || item.title,
              content: item.content || item.description || item.summary || item.title,
              description: item.description,
              link: item.link,
              country: item.country,
              source_id: item.source_id,
            } as ApiArticle)
        );

        setApiArticles(mappedArticles);
      } catch (err) {
        console.error("Failed to fetch news", err);
      }
    };

    fetchNews();
  }, []);

  /* ---------------- ARTICLE MODAL HANDLERS ---------------- */
  const handleReadMore = (article: ApiArticle, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedArticle(article);
    setShowArticleModal(true);
    // Close the active card if open
    setActiveId(null);
  };

  const closeArticleModal = () => {
    setShowArticleModal(false);
    setSelectedArticle(null);
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeArticleModal();
      }
    };

    if (showArticleModal) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [showArticleModal]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Format time for display
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Calculate reading time with detailed logic
  const calculateReadingTime = (text: string | undefined): number => {
    if (!text) return 1;
    
    // Standard reading speed is 200-250 words per minute
    // We use 200 WPM for conservative estimate
    const wordsPerMinute = 200;
    
    // Clean and count words
    const cleanedText = text
      .replace(/[^\w\s]/g, ' ') // Replace punctuation with spaces
      .replace(/\s+/g, ' ')     // Normalize whitespace
      .trim();
    
    const wordCount = cleanedText.split(' ').length;
    
    // Calculate reading time and round up (always at least 1 minute)
    const readingTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
    
    return readingTime;
  };

  // Get author name safely
  const getAuthorName = (article: ApiArticle) => {
    if (article.author && article.author.length > 0) {
      return article.author.join(", ");
    }
    return null; // Return null if no author
  };

  // Get source name safely
  const getSourceName = (article: ApiArticle) => {
    if (article.source_id) {
      // Format source ID to be more readable
      return article.source_id
        .split(/[_-]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    return "Unknown Source";
  };

  return (
    <>
      {/* Main Section */}
      <section className="w-full bg-white py-8 md:py-12 lg:pl-30">
        <div className="mx-auto max-w-8xl px-4 md:px-8">
          {/* HEADER */}
          <div className="mb-6 md:mb-8 flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Latest
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
            {apiArticles.map((article) => {
              const isActive = activeId === article.id;
              const authorName = getAuthorName(article);
              const sourceName = getSourceName(article);

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
                  {/* DEFAULT - Show only source (no avatar, no author) */}
                  {!isActive && (
                    <>
                      <div className="relative h-60 md:h-105 w-full">
                        <img
                          src={article.image_url || "/home41.png"}
                          alt={article.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex flex-col justify-between p-4 md:p-6 h-auto md:h-[292px]">
                        <div>
                          {/* REMOVED: Author avatar and name from default view */}
                          {/* ADDED: Source information */}
                          <div className="mb-3 flex items-center gap-2">
                            <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
                              <Tag size={12} className="text-gray-600" />
                              <span
                                style={{ fontFamily: "var(--font-dm-sans)" }}
                                className="text-[11px] md:text-[13px] font-medium tracking-[-0.2px] text-gray-700"
                              >
                                {sourceName}
                              </span>
                            </div>
                          </div>

                          <h3
                            style={{ fontFamily: "var(--font-albert-sans)" }}
                            className="text-[22px] md:text-[32px] font-bold tracking-[-1px] text-black leading-snug"
                          >
                            {article.title}
                          </h3>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <span
                            style={{ fontFamily: "var(--font-dm-sans)" }}
                            className="text-[13px] md:text-[15px] tracking-[-0.5px] text-[#727272]"
                          >
                            {article.publish_datetime}
                          </span>
                          {/* Optional: Add reading time in default view */}
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock size={12} />
                            <span>{calculateReadingTime(article.content)} min</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* ACTIVE - Show author if available, otherwise just source */}
                  {isActive && (
                    <div className="flex h-full flex-col justify-between p-5 md:p-10">
                      <div>
                        <div className="mb-4 md:mb-6 flex flex-col gap-3">
                          {/* Show author if available */}
                          {authorName ? (
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 bg-orange-100 rounded-full flex items-center justify-center">
                                <User size={14} className="text-orange-600" />
                              </div>
                              <span
                                style={{ fontFamily: "var(--font-dm-sans)" }}
                                className="text-sm font-medium text-gray-700"
                              >
                                {authorName}
                              </span>
                            </div>
                          ) : (
                            /* Show source if no author */
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center">
                                <Tag size={14} className="text-gray-600" />
                              </div>
                              <span
                                style={{ fontFamily: "var(--font-dm-sans)" }}
                                className="text-sm font-medium text-gray-700"
                              >
                                {sourceName}
                              </span>
                            </div>
                          )}
                        </div>

                        <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                          {article.title}
                        </h3>

                        <p
                          style={{ fontFamily: "var(--font-dm-sans)" }}
                          className="mt-3 md:mt-4 text-[15px] md:text-[18px] leading-[22px] md:leading-[25px] text-black"
                        >
                          {article.summary}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs md:text-sm text-gray-500">
                          {article.publish_datetime}
                        </span>

                        {/* ✅ READ MORE – SHOWS ARTICLE MODAL */}
                        <button
                          onClick={(e) => handleReadMore(article, e)}
                          onMouseEnter={() => setLockHover(true)}
                          onMouseLeave={() => setLockHover(false)}
                          style={{ fontFamily: "var(--font-albert-sans)" }}
                          className="
                            inline-flex items-center gap-2
                            rounded-lg border border-[#F25C05]
                            px-3 md:px-4 py-2
                            text-[14px] md:text-[16px]
                            font-semibold tracking-[-0.5px]
                            text-[#F25C05]
                            bg-transparent
                            hover:bg-[#F25C05] hover:text-white
                            transition-all duration-150 ease-out
                            cursor-pointer
                          "
                        >
                          Read Full Article <ArrowUpRight size={16} />
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

      {/* ARTICLE MODAL - Newspaper style layout with larger image */}
      {showArticleModal && selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-0 bg-black/70 overflow-y-auto">
          <div className="relative w-full max-w-6xl my-4 md:my-8 bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[90vh]">
            {/* Professional Header with Article Title and Metadata */}
            <div className="sticky top-0 z-10 bg-white border-b">
              <div className="p-6 md:p-8">
                {/* Article Title - Larger and prominent */}
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {selectedArticle.title}
                </h1>
                
                {/* Metadata Grid - Smaller and more professional */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <User size={14} className="text-gray-500" />
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Author</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-800">
                      {getAuthorName(selectedArticle) || "Unknown"}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar size={14} className="text-gray-500" />
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Published</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-800">
                      {formatDate(selectedArticle.publish_datetime)}
                    </p>
                    {formatTime(selectedArticle.publish_datetime) && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        {formatTime(selectedArticle.publish_datetime)}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Tag size={14} className="text-gray-500" />
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Source</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-800">
                      {getSourceName(selectedArticle)}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Clock size={14} className="text-gray-500" />
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Reading Time</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-800">
                      {calculateReadingTime(selectedArticle.content)} min read
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Close Button in top-right corner */}
              <button
                onClick={closeArticleModal}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} className="text-gray-700" />
              </button>
            </div>

            {/* Article Content - Scrollable area */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 md:p-8 lg:p-10">
                {/* NEWSPAPER STYLE SUMMARY SECTION - Full width with larger floated image */}
                <div className="mb-10">
                  {/* <div className="flex items-center justify-between mb-6 pb-4 border-b">
                    <h2 className="text-xl font-bold text-gray-900">Article Summary</h2>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock size={14} />
                      <span>{calculateReadingTime(selectedArticle.content)} min read</span>
                    </div>
                  </div> */}
                  
                  {/* Newspaper layout - Full width summary with larger floated image */}
                  <div className="relative">
                    {/* Main summary container with orange background */}
                    <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 md:p-8 rounded-xl border-l-4 border-orange-500">
                      {/* Float larger image to the right within the summary */}
                      {selectedArticle.image_url && (
                        <div className="float-right ml-8 mb-6 w-full md:w-2/5 lg:w-2/5">
                          <div className="rounded-lg overflow-hidden shadow-xl">
                            <img
                              src={selectedArticle.image_url}
                              alt={selectedArticle.title}
                              className="w-full h-auto max-h-[400px] object-cover"
                            />
                            <div className="bg-black/80 text-white text-xs p-3 text-center">
                              Photo Source: {getSourceName(selectedArticle)}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
                        <span className="text-orange-600">•</span> Article Summary
                      </h3>
                      
                      <div className="text-gray-700 leading-relaxed text-base md:text-lg">
                        <p className="mb-5">
                          {selectedArticle.summary}
                        </p>
                        
                        {/* Additional description if available */}
                        {selectedArticle.description && selectedArticle.description !== selectedArticle.summary && (
                          <div className="">
                            {/* <p className="italic text-gray-600">
                              {selectedArticle.description}
                            </p> */}
                          </div>
                        )}
                      </div>
                      
                      {/* Clear float for following content */}
                      <div className="clear-both"></div>
                    </div>
                  </div>
                </div>

                {/* Full Article Content */}
                <div className="mb-10">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b">
                    <h2 className="text-xl font-bold text-gray-900">Full Article</h2>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock size={14} />
                      <span>{calculateReadingTime(selectedArticle.content)} min read</span>
                    </div>
                  </div>
                  
                  <div className="prose max-w-none">
                    {selectedArticle.content ? (
                      <div className="text-gray-800 leading-relaxed space-y-6 text-base md:text-lg">
                        {selectedArticle.content.split('\n').map((paragraph, index) => (
                          paragraph.trim() && (
                            <p key={index} className="mb-6 last:mb-0 text-gray-800 leading-7">
                              {paragraph}
                            </p>
                          )
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="text-gray-400 mb-4 text-4xl">📄</div>
                        <p className="text-gray-500 text-lg">Full content not available in the API response.</p>
                        <p className="text-sm text-gray-400 mt-2">
                          Try viewing the original article for complete content.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Article Footer */}
                {/* Article Footer */}
{/* Article Footer */}
<div className="pt-6 mt-8 border-t">
  <div className="flex justify-end">
    {/* NEW: Gray button to open original article in new tab */}
    <button
      onClick={() => window.open(selectedArticle.link, '_blank')}
      className="px-6 py-3 text-sm font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors inline-flex items-center gap-2"
    >
      <ArrowUpRight size={16} />
      View Original Article
    </button>
  </div>
</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}