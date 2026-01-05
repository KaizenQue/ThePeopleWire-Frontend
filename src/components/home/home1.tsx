"use client";

import React, { useEffect, useState } from "react";
import { X, Calendar, User, Tag, Clock } from "lucide-react";

/* ------------------ TYPES ------------------ */

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
  country?: string[];
};

type Story = {
  id: number;
  title: string;
  image: string;
  category: string;
  author: string;
  readTime: string;
  prf_img: string;
  date: string;
  link: string;
  summary?: string;
  content?: string;
  description?: string;
  source?: string;
  publish_datetime?: string;
  country?: string[];
};

function timeLatest(dateString: string): string {
  const now = new Date();
  const past = new Date(dateString);

  const diffMs = now.getTime() - past.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) {
    return "Just now";
  }

  if (diffMin < 60) {
    return `${diffMin} min ago`;
  }

  if (diffHr < 24) {
    return `${diffHr} hr${diffHr > 1 ? "s" : ""} ago`;
  }

  if (diffDay < 7) {
    return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;
  }

  return past.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/* ------------------ COMPONENTS ------------------ */

interface SmallStoryCardProps {
  story: Story;
  onReadMore: (story: Story) => void;
}

const SmallStoryCard: React.FC<SmallStoryCardProps> = ({ story, onReadMore }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onReadMore(story);
  };

  return (
    <div 
      className="bg-[#F5F5F5] rounded-2xl overflow-hidden h-full flex flex-col cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative flex-shrink-0">
        <img
          src={story.image}
          alt={story.title}
          className="w-full h-[180px] object-cover"
          onError={(e) => {
            e.currentTarget.src = "/home41.png";
          }}
        />
        <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
          {story.category}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h4
          className="text-sm font-semibold leading-snug mb-3 flex-grow hover:underline"
        >
          {story.title}
        </h4>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-[#727272] tracking-[-0.28px] flex-shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {story.prf_img && (
              <img
                src={story.prf_img}
                alt={story.author}
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover flex-shrink-0"
              />
            )}

            <span
              style={{ fontFamily: "var(--font-dm-sans)" }}
              className="text-[10px] font-normal leading-[12px] text-[#231F18] truncate"
            >
              {story.author}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span
              style={{ fontFamily: "var(--font-dm-sans)" }}
              className="text-[10px] font-normal text-black"
            >
              {story.date}
            </span>
            <span className="text-[10px] text-black/60">|</span>
            <span
              style={{ fontFamily: "var(--font-dm-sans)" }}
              className="text-[10px] font-normal text-black"
            >
              {story.readTime} read
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ------------------ UTILITY FUNCTIONS ------------------ */

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
const getAuthorName = (story: Story) => {
  if (story.author && story.author !== "Unknown") {
    return story.author;
  }
  return null;
};

// Get source name safely
const getSourceName = (story: Story) => {
  if (story.source) {
    return story.source
      .split(/[_-]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  return "Unknown Source";
};

// Fetch global news (without country filter)
const fetchGlobalNews = async (): Promise<ApiArticle[]> => {
  try {
    const res = await fetch(`/api/news`);
    const json = await res.json();
    return json.data as ApiArticle[];
  } catch (err) {
    console.error("Failed to fetch global news", err);
    return [];
  }
};


/* ------------------ MAIN ------------------ */

const Home1: React.FC = () => {
  const [featuredStory, setFeaturedStory] = useState<Story | null>(null);
  const [allStories, setAllStories] = useState<Story[]>([]);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Handle reading article
  const handleReadMore = (story: Story) => {
    setSelectedStory(story);
    setShowArticleModal(true);
  };

  // Close article modal
  const closeArticleModal = () => {
    setShowArticleModal(false);
    setSelectedStory(null);
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

  // Fetch global news
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const articles: ApiArticle[] = await fetchGlobalNews();

        
        if (!articles.length) {
          setIsLoading(false);
          return;
        }

        /* FEATURED STORY */
        const first = articles[0];
        const featured: Story = {
          id: 0,
          title: first.title,
          image: first.image_url || "/home41.png",
          category: first.category?.[0] || "Top",
          author: first.author?.[0] || "Unknown",
          prf_img: "/home41.png", // No profile image
          date: timeLatest(first.publish_datetime),
          readTime: `${calculateReadingTime(first.content || first.description || first.summary)} min`,
          link: first.link,
          summary: first.summary || first.description || first.title,
          content: first.content || first.description || first.summary || first.title,
          description: first.description,
          source: first.source_id,
          publish_datetime: first.publish_datetime,
          country: first.country
        };
        setFeaturedStory(featured);

        /* ALL SMALL STORIES - First 7 articles after featured (for desktop) */
        const mappedStories: Story[] = articles.slice(1, 8).map(
          (item, index) => ({
            id: index + 1,
            title: item.title,
            image: item.image_url || "/home41.png",
            category: item.category?.[0] || "Top",
            author: item.author?.[0] || "Unknown",
            prf_img: "/home41.png", // No profile image
            date: timeLatest(item.publish_datetime),
            readTime: `${calculateReadingTime(item.content || item.description || item.summary)} min`,
            link: item.link,
            summary: item.summary || item.description || item.title,
            content: item.content || item.description || item.summary || item.title,
            description: item.description,
            source: item.source_id,
            publish_datetime: item.publish_datetime,
            country: item.country
          })
        );

        setAllStories(mappedStories);
      } catch (err) {
        console.error("Failed to fetch news", err);
      }
    };

    fetchNews();
  }, []);

  if (!featuredStory) return null;

  return (
    <>
      {/* ================= MOBILE + TABLET ================= */}
      <section
        className="w-full px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 lg:hidden"
        style={{ fontFamily: "var(--font-albert-sans)" }}
      >
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-black">
            Top Stories
          </h2>
        </div>

        <div className="flex flex-col gap-6 sm:gap-8">
          {/* FEATURED */}
          <div 
            className="bg-[#F5F5F5] rounded-2xl overflow-hidden cursor-pointer"
            onClick={() => handleReadMore(featuredStory)}
          >
            <div className="relative">
              <img
                src={featuredStory.image}
                alt={featuredStory.title}
                className="w-full h-[220px] sm:h-[260px] md:h-[300px] object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/home41.png";
                }}
              />
              <span className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-orange-500 text-[11px] sm:text-[12px] font-semibold text-white px-3 py-1 rounded-full">
                {featuredStory.category}
              </span>
            </div>

            <div className="p-4 sm:p-5 md:p-6">
              <h3
                className="text-[28px] font-bold text-[#262626] mb-6 hover:underline"
              >
                {featuredStory.title}
              </h3>

              <div className="flex items-center justify-between text-xs sm:text-sm text-[#727272]">
                <span>By {featuredStory.author}</span>
                <div className="flex items-center gap-2">
                  <span>{featuredStory.date}</span>
                  <span>|</span>
                  <span>{featuredStory.readTime} read</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-black rounded-2xl p-5 sm:p-6 md:p-7 md:flex md:justify-around">
            <div className="flex gap-4 items-start">
              <img
                src="/footerLogo.png"
                alt="App Logo"
                className="
                  w-[72px] h-[72px] 
                  sm:w-[80px] sm:h-[80px]
                  md:w-[88px] md:h-[88px]
                  flex-shrink-0 object-contain
                "
              />
              <div className="flex-1 min-w-0">
                <h3
                  style={{ fontFamily: "var(--font-albert-sans)" }}
                  className="
                    mb-2
                    text-[24px] font-bold leading-normal tracking-[-0.48px] 
                    sm:text-[26px]
                    md:text-[28px]
                    text-[#FFD200]
                  "
                >
                  App Launching Soon... 
                </h3>

                <p
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                  className="
                    text-[15px] font-normal leading-normal text-[#CCC]
                    sm:text-[16px]
                  "
                >
                  Get all things membership,
                  <br />
                  straight to your inbox.
                </p>
              </div>
            </div>

            {/* APP STORE BUTTONS */}
            <div
              className="
                mt-5 sm:mt-6
                flex flex-row
                gap-3
                items-center
                justify-center
                flex-wrap
                md:flex-col
              "
            >
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <img
                  src="/App-Store-CommingSoon.png"
                  alt="Download on App Store"
                  className="
                    w-[110px] h-[34px]
                    sm:w-[120px] sm:h-[38px]
                    md:w-[130px] md:h-[40px]
                    object-contain
                    flex-shrink-0
                    cursor-pointer
                  "
                />
              </a>

              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <img
                  src="/Play-Store-CommingSoon.png"
                  alt="Get it on Google Play"
                  className="
                    w-[110px] h-[34px]
                    sm:w-[120px] sm:h-[38px]
                    md:w-[130px] md:h-[40px]
                    object-contain
                    flex-shrink-0
                    cursor-pointer
                  "
                />
              </a>
            </div>
          </div>

          {/* ALL STORIES GRID - Show only 2 stories below App Launch tile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allStories.slice(0, 2).map((story) => (
              <SmallStoryCard 
                key={story.id} 
                story={story} 
                onReadMore={handleReadMore}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:block">
        <section
          className="w-full px-8 lg:px-32 py-12"
          style={{ fontFamily: "var(--font-albert-sans)" }}
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-black">Top Stories</h2>
          </div>

          {/* TOP SECTION - Featured + 3 small + CTA */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* FEATURED - Takes 6 columns */}
            <div 
              className="lg:col-span-6 lg:row-span-2 bg-[#F5F5F5] rounded-2xl overflow-hidden flex flex-col h-full cursor-pointer"
              onClick={() => handleReadMore(featuredStory)}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={featuredStory.image}
                  alt={featuredStory.title}
                  className="w-full h-[360px] object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/home41.png";
                  }}
                />
                <span className="absolute top-4 left-4 bg-orange-500 text-[12px] font-semibold text-white px-3 py-1 rounded-full">
                  {featuredStory.category}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-[35px] font-bold text-[#262626] mb-6 flex-grow hover:underline">
                  {featuredStory.title}
                </h3>

                <div className="flex items-center justify-between text-[14px] text-[#727272] flex-shrink-0">
                  <span>By {featuredStory.author}</span>
                  <div className="flex gap-3">
                    <span>{featuredStory.date}</span>
                    <span>|</span>
                    <span>{featuredStory.readTime} read</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FIRST ROW OF SMALL STORIES */}
            {/* Story 1 - Top right */}
            {allStories.slice(0, 1).map((story) => (
              <div key={story.id} className="lg:col-span-3">
                <SmallStoryCard story={story} onReadMore={handleReadMore} />
              </div>
            ))}

            {/* CTA - Top row */}
            <div
            
              className="
                lg:col-span-3
                bg-black rounded-2xl
                p-[clamp(16px,2vw,28px)]
                flex flex-col justify-between
              "
            >
              {/* CONTENT */}
              <div className="w-full max-w-full">
                <img
                  src="/logo-yellow.png"
                  alt="App Logo"
                  className="w-[clamp(36px,3vw,44px)] h-[clamp(36px,3vw,44px)] mb-3 object-contain"
                />

                <h3
                  style={{
                    fontFamily: "var(--font-albert-sans)",
                    fontSize: "clamp(20px, 2.1vw, 28px)",
                  }}
                  className="mb-2 font-extrabold leading-[1.15] tracking-[-0.52px] te text-[#FFD200]"
                >
                  App Launching Soon... 
                </h3>

                <p
                  style={{ fontFamily: "var(--font-albert-sans)" }}
                  className="text-[clamp(13px,1.15vw,16px)] leading-[1.45] text-white"
                >
                  Your Next-Gen News Destination
                </p>
              </div>

              {/* STORE BUTTONS */}
              <div
                className="
                  mt-[clamp(12px,2vw,24px)]
                  flex
                  flex-row
                  md:flex-col
                  lg:flex-col xl:flex-row
                  gap-[10px]
                  items-start
                  md:items-end
                  w-full
                "
              >
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <img
                    src="/App-Store-CommingSoon.png"
                    alt="App Store"
                    className="
                      w-[96px]
                      md:w-[88px]
                      lg:w-[162px]
                      h-[50px]
                      object-contain
                      cursor-pointer
                    "
                  />
                </a>

                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <img
                    src="/Play-Store-CommingSoon.png"
                    alt="Play Store"
                    className="
                      w-[px]
                      md:w-[88px]
                      lg:w-[162px]
                      h-[50px]
                      object-contain
                      cursor-pointer
                    "
                  />
                </a>
              </div>
            </div>

            {/* Stories 2 & 3 - Bottom left */}
            {allStories.slice(1, 3).map((story) => (
              <div key={story.id} className="lg:col-span-3">
                <SmallStoryCard story={story} onReadMore={handleReadMore} />
              </div>
            ))}

            {/* SECOND ROW OF SMALL STORIES - 4 additional stories */}
            {/* Stories 4, 5, 6, 7 - Full row of 4 columns */}
            {allStories.slice(3, 7).map((story) => (
              <div key={story.id} className="lg:col-span-3">
                <SmallStoryCard story={story} onReadMore={handleReadMore} />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ARTICLE MODAL - Fixed with scrollable header */}
      {showArticleModal && selectedStory && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-0 bg-black/70 overflow-y-auto">
          <div className="relative w-full max-w-6xl my-4 md:my-8 bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[90vh]">
            {/* Article Content - Entire content scrollable including header */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 md:p-6 lg:p-8">
                {/* Article Header - Now part of scrollable content */}
                <div className="mb-6 md:mb-8">
                  <button
                    onClick={closeArticleModal}
                    className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-gray-100 transition-colors z-10"
                    aria-label="Close modal"
                  >
                    <X size={18} className="text-gray-700" />
                  </button>
                  
                  {/* Article Title */}
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight pr-8">
                    {selectedStory.title}
                  </h1>
                  
                  {/* Metadata Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <User size={12} className="text-gray-500" />
                        <span className="text-xs font-medium text-gray-500">Author</span>
                      </div>
                      <p className="text-sm font-medium text-gray-800">
                        {getAuthorName(selectedStory) || "Unknown"}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Calendar size={12} className="text-gray-500" />
                        <span className="text-xs font-medium text-gray-500">Published</span>
                      </div>
                      <p className="text-sm font-medium text-gray-800">
                        {selectedStory.publish_datetime ? formatDate(selectedStory.publish_datetime) : selectedStory.date}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Tag size={12} className="text-gray-500" />
                        <span className="text-xs font-medium text-gray-500">Source</span>
                      </div>
                      <p className="text-sm font-medium text-gray-800">
                        {getSourceName(selectedStory)}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Clock size={12} className="text-gray-500" />
                        <span className="text-xs font-medium text-gray-500">Read Time</span>
                      </div>
                      <p className="text-sm font-medium text-gray-800">
                        {calculateReadingTime(selectedStory.content)} min
                      </p>
                    </div>
                  </div>
                </div>

                {/* NEWSPAPER STYLE SUMMARY SECTION */}
                {selectedStory.summary && (
                  <div className="mb-8">
                    <div className="relative">
                      <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 md:p-6 rounded-lg border-l-4 border-orange-500">
                        {/* Float image to the right inside summary */}
                        {selectedStory.image && selectedStory.image !== "/home41.png" && (
                          <div className="float-right ml-4 md:ml-6 mb-4 w-full md:w-2/5 lg:w-2/5">
                            <div className="rounded-lg overflow-hidden shadow">
                              <img
                                src={selectedStory.image}
                                alt={selectedStory.title}
                                className="w-full h-auto max-h-[300px] object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = "/home41.png";
                                }}
                              />
                              <div className="bg-black/80 text-white text-xs p-2 text-center">
                                Photo Source: {getSourceName(selectedStory)}
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <h3 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
                          <span className="text-orange-600">•</span> Article Summary
                        </h3>
                        
                        <div className="text-gray-700 leading-relaxed text-sm md:text-base">
                          <p className="mb-4">
                            {selectedStory.summary}
                          </p>
                          
                          {/* Additional description if available */}
                          {selectedStory.description && selectedStory.description !== selectedStory.summary && (
                            <div className="">
                              {/* Additional description content */}
                            </div>
                          )}
                        </div>
                        
                        {/* Clear float for following content */}
                        <div className="clear-both"></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Full Article Content or Iframe */}
                {selectedStory.content ? (
                  <div className="mb-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Full Article</h2>
                    <div className="text-gray-800 leading-relaxed space-y-4 text-sm md:text-base">
                      {selectedStory.content.split('\n').map((paragraph, index) => (
                        paragraph.trim() && (
                          <p key={index} className="mb-4 last:mb-0 text-gray-800 leading-6">
                            {paragraph}
                          </p>
                        )
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="mb-8">
                    {/* IFRAME SECTION */}
                    <div className="mb-4">
                      <h2 className="text-lg font-bold text-gray-900">Original Article</h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Loading content from {getSourceName(selectedStory)}
                      </p>
                    </div>
                    
                    {/* IFRAME */}
                    <div className="rounded-lg overflow-hidden shadow border border-gray-200">
                      <iframe
                        src={selectedStory.link}
                        className="w-full h-[500px] border-0"
                        title="Full Article"
                        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                        loading="lazy"
                      />
                      <div className="bg-gray-50 p-2 text-center border-t">
                        <p className="text-xs text-gray-600">
                          Viewing external content. Some websites may restrict embedding.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Article Footer */}
                <div className="pt-4 mt-6 border-t">
                  <div className="flex justify-end">
                    <button
                      onClick={closeArticleModal}
                      className="px-4 py-2 text-xs font-medium text-white bg-[#F25C05] rounded-lg hover:bg-[#e05504] transition-colors inline-flex items-center gap-1.5"
                    >
                      Close Article <X size={14} />
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
};

export default Home1;