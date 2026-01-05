"use client";

import "./topstories3.css";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, ArrowUpRight, X, Calendar, User, Tag, Clock, ExternalLink } from "lucide-react";

type Article = {
  id: number;
  title: string;
  image: string;
  excerpt: string;
  author: string;
  authorAvatar: string;
  date: string;
};

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

const articles: Article[] = [
  {
    id: 1,
    title: "It's All Home Water: Oregon Steelhead",
    image: "/1.png",
    excerpt:
      "Cursor is one of the most popular AI code editors out there. It's essentially a fork of VS Code, but with various AI features built into it. This means you get the same familiar interface as VS Code, but with added tools to help you write, fix, and improve code faster.",
    author: "Amal Neerad",
    authorAvatar: "/author.png",
    date: "December 03, 2025",
  },
  // ... rest of the articles array remains the same
];

export default function Home3() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeArrow, setActiveArrow] = useState<"left" | "right" | null>(null);
  const [apiArticles, setApiArticles] = useState<ApiArticle[]>([]);
  
  // State for article modal
  const [selectedArticle, setSelectedArticle] = useState<ApiArticle | null>(null);
  const [showArticleModal, setShowArticleModal] = useState(false);
  
  // State to control iframe visibility
  const [showIframe, setShowIframe] = useState(false);
  const [iframeUrl, setIframeUrl] = useState<string>("");

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

  /* ---------------- DATA RETRIEVAL ---------------- */
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/news?category=world&limit=8");
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
              summary: item.summary || item.title,
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
    // Reset iframe state
    setShowIframe(false);
  };

  const closeArticleModal = () => {
    setShowArticleModal(false);
    setSelectedArticle(null);
    setShowIframe(false);
  };

  const openIframe = (url: string) => {
    setIframeUrl(url);
    setShowIframe(true);
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
    
    const wordsPerMinute = 200;
    const cleanedText = text
      .replace(/[^\w\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    const wordCount = cleanedText.split(' ').length;
    const readingTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
    
    return readingTime;
  };

  // Get author name safely
  const getAuthorName = (article: ApiArticle) => {
    if (article.author && article.author.length > 0) {
      return article.author.join(", ");
    }
    return null;
  };

  // Get source name safely
  const getSourceName = (article: ApiArticle) => {
    if (article.source_id) {
      return article.source_id
        .split(/[_-]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    return "Unknown Source";
  };

  // Truncate summary to 20 words
  const truncateSummary = (summary: string, maxWords: number = 20): string => {
    const words = summary.split(' ');
    if (words.length <= maxWords) {
      return summary;
    }
    return words.slice(0, maxWords).join(' ') + '...';
  };

  return (
    <>
      <section className="w-full bg-white py-10 lg:pl-30">
        <div className="mx-auto max-w-8xl px-2">
          {/* Cards */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-scroll no-scrollbar py-4"
          >
            {apiArticles.map((article) => {
              const isActive = activeId === article.id;
              const authorName = getAuthorName(article);
              const sourceName = getSourceName(article);
              const truncatedSummary = truncateSummary(article.summary || article.title, 20);

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
                  <img
                    src={article.image_url || "/home41.png"}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

                  {/* Content */}
                  <div className="relative z-10 flex h-full flex-col justify-between p-6 text-white">
                    {!isActive && (
                      <>
                        <div className="flex items-center gap-2 text-xs opacity-90 mt-40">
                          <div className="flex items-center gap-1">
                            <Tag size={12} className="text-white" />
                            <span>Source: {getSourceName(article)}</span>
                          </div>
                        </div>

                        <div>
                          <h3 className="mt-2 text-lg font-semibold leading-snug mb-28">
                            {article.title}
                          </h3>

                          <p className="mt-3 text-xs text-gray-300">
                            {article.publish_datetime}
                          </p>
                        </div>
                      </>
                    )}

                    {isActive && (
                      <>
                        <div>
                          {/* Removed author avatar image, kept only author name */}
                          <div className="mb-4 flex items-center gap-2 text-xs">
                            <span>By {authorName || "Unknown"}</span>
                          </div>

                          <h3 className="text-lg font-semibold leading-snug">
                            {article.title}
                          </h3>

                          <p className="mt-3 text-sm text-gray-200">
                            {truncatedSummary}
                            {truncatedSummary !== article.summary && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleReadMore(article, e);
                                }}
                                className="ml-1 text-orange-400 hover:text-orange-300 font-medium"
                              >
                                ...See More
                              </button>
                            )}
                          </p>
                        </div>

                        <div>
                          <p className="mb-4 text-xs text-gray-300">
                            {article.publish_datetime}
                          </p>

                          {/* Read More — Opens Modal */}
                          <button
                            onClick={(e) => handleReadMore(article, e)}
                            className="
                              inline-flex w-full items-center justify-center gap-2
                              rounded-md border border-orange-500 px-4 py-2
                              text-sm font-medium text-orange-500
                              bg-transparent no-underline
                              hover:bg-orange-500 hover:text-white
                              transition-all duration-150 ease-out
                              active:scale-95
                              lg:hover:scale-[0.97]
                            "
                          >
                            Read More <ArrowUpRight size={16} />
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

      {/* ARTICLE MODAL - UPDATED LAYOUT */}
      {showArticleModal && selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-0 bg-black/70 overflow-y-auto">
          <div className="relative w-full max-w-5xl my-4 md:my-8 bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[90vh]">
            {/* Professional Header with Article Title and Metadata - Reduced height */}
            <div className="sticky top-0 z-10 bg-white border-b">
              <div className="p-4 md:p-6">
                {/* Article Title - Reduced size */}
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 leading-tight">
                  {selectedArticle.title}
                </h1>
                
                {/* Compact Metadata Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <User size={12} className="text-gray-500" />
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Author</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {getAuthorName(selectedArticle) || "Unknown"}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <Calendar size={12} className="text-gray-500" />
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Published</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-800">
                      {formatDate(selectedArticle.publish_datetime)}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <Tag size={12} className="text-gray-500" />
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Source</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {getSourceName(selectedArticle)}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <Clock size={12} className="text-gray-500" />
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Reading</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-800">
                      {calculateReadingTime(selectedArticle.content)} min
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Close Button in top-right corner */}
              <button
                onClick={closeArticleModal}
                className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <X size={18} className="text-gray-700" />
              </button>
            </div>

            {/* Article Content - Scrollable area */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 md:p-6 lg:p-8">
                {/* Content Area */}
                {showIframe ? (
                  // IFRAME VIEW - Full screen iframe
                  <div className="w-full h-[calc(100vh-250px)] border rounded-lg overflow-hidden">
                    {/* Compact Header */}
                    <div className="bg-gray-50 px-3 py-1.5 border-b flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-xs text-gray-600 ml-1.5 truncate max-w-[200px] md:max-w-[300px]">
                          {selectedArticle.link ? new URL(selectedArticle.link).hostname : 'Original Source'}
                        </span>
                      </div>
                    </div>
                    <iframe
                      src={iframeUrl}
                      className="w-full h-full border-0"
                      title={selectedArticle.title}
                      sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  // ARTICLE CONTENT VIEW - Updated layout with side-by-side summary and image
                  <>
                    {/* Top Section: Side-by-side layout for summary and image */}
                    <div className="mb-8">
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* Left Column: Article Summary */}
                        <div className="lg:w-2/3">
                          <div className="p-5 bg-white border border-gray-200 rounded-lg">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Article Summary</h3>
                            <div className="text-gray-700 leading-relaxed">
                              {selectedArticle.summary && selectedArticle.summary.split('\n').map((paragraph, index) => (
                                paragraph.trim() && (
                                  <p key={index} className="mb-4 last:mb-0">
                                    {paragraph}
                                  </p>
                                )
                              ))}
                              {!selectedArticle.summary && (
                                <p className="text-gray-500">No summary available for this article.</p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Right Column: Image with source mention */}
                        {selectedArticle.image_url && (
                          <div className="lg:w-1/3">
                            <div className="sticky top-6">
                              <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                                <img
                                  src={selectedArticle.image_url}
                                  alt={selectedArticle.title}
                                  className="w-full h-auto max-h-[250px] object-cover"
                                />
                                {/* Photo Source mention at bottom of image */}
                                <div className="bg-gray-50 px-4 py-2 border-t border-gray-200">
                                  <p className="text-xs text-gray-500">
                                    <span className="font-medium">Photo Source:</span> {getSourceName(selectedArticle)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Section: Full Article Content */}
                    <div className="border-t pt-6">
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-4 pb-3 border-b">
                          <h2 className="text-lg md:text-xl font-bold text-gray-900">Full Article</h2>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock size={14} />
                            <span>{calculateReadingTime(selectedArticle.content)} min read</span>
                          </div>
                        </div>
                        
                        <div className="prose max-w-none">
                          {selectedArticle.content ? (
                            <div className="text-gray-800 leading-relaxed">
                              {selectedArticle.content.split('\n').map((paragraph, index) => (
                                paragraph.trim() && (
                                  <div key={index} className="mb-6 last:mb-0">
                                    <p className="text-gray-800 leading-7">
                                      {paragraph}
                                    </p>
                                  </div>
                                )
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-12">
                              <div className="text-gray-400 mb-4 text-4xl">📄</div>
                              <p className="text-gray-500 text-lg">Full content not available in the API response.</p>
                              <p className="text-sm text-gray-400 mt-2">
                                Try viewing the original article using the button below.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Footer with View Original Article button - Removed "Article source:" line */}
                      <div className="pt-4 mt-6 border-t">
                        <div className="flex flex-col md:flex-row justify-end items-center gap-4">
                          <div className="flex gap-3">
                            <a
                              href={selectedArticle.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-5 py-2.5 text-sm font-medium text-white bg-gray-400 rounded-lg hover:bg-gray-500 transition-colors inline-flex items-center gap-2"
                            >
                              View Original Source
                              <ExternalLink size={14} />
                            </a>
                            {/* <button
                              onClick={() => openIframe(selectedArticle.link)}
                              className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors inline-flex items-center gap-2"
                            >
                              View in App
                              <ExternalLink size={14} />
                            </button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}