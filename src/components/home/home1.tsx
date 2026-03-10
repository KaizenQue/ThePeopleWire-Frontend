"use client";

import React, { useEffect, useState } from "react";
import { X, Calendar, User, Tag, Clock, ExternalLink } from "lucide-react";
import NotifyForm from "@/components/notifyform";

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

// Single fallback image
const FALLBACK_IMAGE = "/home41.png";

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
  const [imgSrc, setImgSrc] = useState(story.image);
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onReadMore(story);
  };

  const handleImageError = () => {
    setImgSrc(FALLBACK_IMAGE);
  };

  return (
    <div 
      className="bg-[#F5F5F5] rounded-2xl overflow-hidden h-full flex flex-col cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative flex-shrink-0">
        <img
          src={imgSrc}
          alt={story.title}
          className="w-full h-[180px] object-cover"
          onError={handleImageError}
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

const handleOpenOriginal = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer');
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
  const [notifyFormOpen, setNotifyFormOpen] = useState(false);

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
          return;
        }

        /* FEATURED STORY */
        const first = articles[0];
        const featured: Story = {
          id: 0,
          title: first.title,
          image: first.image_url || FALLBACK_IMAGE,
          category: first.category?.[0] || "Top",
          author: first.author?.[0] || "Unknown",
          prf_img: "/home41.png",
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

        /* ALL SMALL STORIES - First 8 articles after featured (for desktop) */
        const mappedStories: Story[] = articles.slice(1, 9).map(
          (item, index) => ({
            id: index + 1,
            title: item.title,
            image: item.image_url || FALLBACK_IMAGE,
            category: item.category?.[0] || "Top",
            author: item.author?.[0] || "Unknown",
            prf_img: "/home41.png",
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
          <h2 className="text-3xl sm:text-4xl font-bold text-black">
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
                  e.currentTarget.src = FALLBACK_IMAGE;
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

          {/* UPDATED APP LAUNCH TILE - Mobile/Tablet with #F5F5F5 background */}
          <div className="bg-[#F5F5F5] rounded-2xl overflow-hidden">
            <div className="p-6 sm:p-8">
              {/* Logo - Centered and Bigger */}
              <div className="flex justify-center mb-6">
                <img
                  src="/tpw-black.png"
                  alt="THE PEOPLE WIRE"
                  className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
                />
              </div>

              {/* Offer Text - Black color, Albert Sans Bold */}
              <p 
                className="text-black text-center text-base sm:text-3xl lg:text-3xl mb-6"
                style={{ fontFamily: "var(--font-albert-sans)", fontWeight: 700 }}
              >
                Free Lifetime Premium News
                <br />
                For The First 1,000 Readers.
              </p>
            <p className="text-center text-black-800 text-l font-bold mb-2">
  Join the waitlist
</p>
              
              {/* App Store Buttons */}
              <div className="flex flex-row gap-3 justify-center items-center mb-6">
                <div className="w-28 sm:w-32">
                  <img
                    src="/App-Store-CommingSoon.png"
                    alt="App Store"
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="w-28 sm:w-32">
                  <img
                    src="/Play-Store-CommingSoon.png"
                    alt="Google Play"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
              
              {/* Join Waitlist Button - White text */}
              <button
                onClick={() => setNotifyFormOpen(true)}
                className="w-full bg-[#ED6618] text-white font-bold py-3 sm:py-4 rounded-lg hover:bg-[#d4550c] transition-colors text-sm sm:text-base"
                style={{ fontFamily: "var(--font-albert-sans)" }}
              >
                Notify Me →
              </button>
            </div>
          </div>

          {/* ALL STORIES GRID - Show 4 stories below App Launch tile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {allStories.slice(0, 4).map((story) => (
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
            <h2 className="text-4xl font-bold text-black">Top Stories</h2>
          </div>

          {/* TOP SECTION - Responsive: 60/40 on small laptops, 70/30 on larger displays */}
          <div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-10 gap-6 mb-6">
            {/* FEATURED - Responsive columns */}
            <div 
              className="lg:col-span-3 xl:col-span-7 bg-[#F5F5F5] rounded-2xl overflow-hidden flex flex-col h-full cursor-pointer"
              onClick={() => handleReadMore(featuredStory)}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={featuredStory.image}
                  alt={featuredStory.title}
                  className="w-full h-[360px] xl:h-[400px] object-cover"
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_IMAGE;
                  }}
                />
                <span className="absolute top-4 left-4 bg-orange-500 text-[12px] font-semibold text-white px-3 py-1 rounded-full">
                  {featuredStory.category}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-[28px] xl:text-[32px] font-bold text-[#262626] mb-6 flex-grow hover:underline leading-tight">
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

            {/* UPDATED APP LAUNCH TILE - Responsive columns */}
            <div className="lg:col-span-2 xl:col-span-3 bg-[#F5F5F5] rounded-2xl overflow-hidden">
              <div className="p-6 xl:p-8 h-full flex flex-col">
                {/* Logo - Centered */}
                <div className="flex justify-center mb-5 xl:mb-6">
                  <img
                    src="/tpw-black.png"
                    alt="THE PEOPLE WIRE"
                    className="w-24 xl:w-28 h-24 xl:h-28 object-contain"
                  />
                </div>

                {/* Offer Text */}
                <p 
                  className="text-black text-center text-lg xl:text-2xl mb-2"
                  style={{ fontFamily: "var(--font-albert-sans)", fontWeight: 700 }}
                >
                  Free Lifetime Premium News
                  <br />
                  For The First 1,000 Readers.
                </p>
                <p className="text-center text-black-900 text-xl font-bold mb-5 xl:mb-6">Join the waitlist</p>

                {/* Store Buttons */}
                <div className="flex gap-3 xl:gap-4 mb-5 xl:mb-6">
                  <div className="flex-1">
                    <img
                      src="/App-Store-CommingSoon.png"
                      alt="App Store"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <img
                      src="/Play-Store-CommingSoon.png"
                      alt="Google Play"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>

                {/* Join Waitlist Button */}
                <button
                  onClick={() => setNotifyFormOpen(true)}
                  className="w-full bg-[#ED6618] text-white font-bold py-2.5 xl:py-3 rounded-lg hover:bg-[#d4550c] transition-colors text-xs xl:text-sm"
                  style={{ fontFamily: "var(--font-albert-sans)" }}
                >
                  Notify Me →
                </button>
              </div>
            </div>
          </div>

          {/* BOTTOM SECTION - 4 Small Story Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {allStories.slice(0, 4).map((story) => (
              <div key={story.id} className="lg:col-span-1">
                <SmallStoryCard story={story} onReadMore={handleReadMore} />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ARTICLE MODAL */}
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
                        {selectedStory.image && (
                          <div className="float-right ml-4 md:ml-6 mb-4 w-full md:w-2/5 lg:w-2/5">
                            <div className="rounded-lg overflow-hidden shadow">
                              <img
                                src={selectedStory.image}
                                alt={selectedStory.title}
                                className="w-full h-auto max-h-[300px] object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = FALLBACK_IMAGE;
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
                        </div>
                        
                        {/* Clear float for following content */}
                        <div className="clear-both"></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Full Article Content */}
                {selectedStory.content && (
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
                )}

                {/* Article Footer */}
                <div className="pt-4 mt-6 border-t">
                  <div className="flex justify-end">
                    <button
                      onClick={() => selectedStory.link && handleOpenOriginal(selectedStory.link)}
                      className="px-4 py-2 text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!selectedStory.link}
                    >
                      <ExternalLink size={16} />
                      View Original Source
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NOTIFY ME FORM */}
      {notifyFormOpen && (
        <NotifyForm onClose={() => setNotifyFormOpen(false)} />
      )}
    </>
  );
};

export default Home1;