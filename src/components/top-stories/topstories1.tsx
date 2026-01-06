"use client";

import React, { useEffect, useState } from "react";
import { X, Calendar, User, Tag, Clock, ExternalLink } from "lucide-react";

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
};

/* ------------------ UTILITY FUNCTIONS ------------------ */

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

// Calculate reading time
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

// Fetch all news and take first 10
const fetchAllNews = async (): Promise<ApiArticle[]> => {
  try {
    const res = await fetch(`/api/news?category=top&language=english`);
    const json = await res.json();
    
    // Get first 10 articles
    const articles = json.data as ApiArticle[];
    return articles.slice(0, 10);
    
  } catch (err) {
    console.error("Failed to fetch news", err);
    return [];
  }
};


/* ------------------ COMPONENTS ------------------ */

// Small Story Card (EXACTLY from your original code)
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
      className="bg-[#F5F5F5] rounded-2xl overflow-hidden h-full flex flex-col cursor-pointer hover:shadow-lg transition-shadow duration-200"
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
          className="text-sm font-semibold leading-snug mb-3 flex-grow hover:underline line-clamp-3"
        >
          {story.title}
        </h4>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-[#727272] tracking-[-0.28px] flex-shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
              <User size={12} className="text-gray-600" />
            </div>

            <span
              style={{ fontFamily: "var(--font-dm-sans)" }}
              className="text-[10px] font-normal leading-[12px] text-[#231F18] truncate"
            >
              {story.author || "Unknown"}
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

// Bullet Points List Item with black circle bullet
interface BulletPointItemProps {
  story: Story;
  onReadMore: (story: Story) => void;
}

const BulletPointItem: React.FC<BulletPointItemProps> = ({ story, onReadMore }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onReadMore(story);
  };

  return (
    <div 
      className="flex items-start gap-4 p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-150 group"
      onClick={handleClick}
    >
      {/* Black circle bullet */}
      <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2 group-hover:bg-orange-500 transition-colors"></div>
      
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-gray-900 group-hover:text-orange-600 line-clamp-2 leading-snug transition-colors">
          {story.title}
        </h4>
        
        {/* Meta info - smaller and subtle */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] text-gray-500 font-medium uppercase">
            {story.category}
          </span>
          <span className="text-[10px] text-gray-300">•</span>
          <span className="text-[10px] text-gray-500">
            {story.date}
          </span>
        </div>
      </div>
    </div>
  );
};

/* ------------------ MAIN ------------------ */

const Home1: React.FC = () => {
  const [featuredStory, setFeaturedStory] = useState<Story | null>(null);
  const [bulletStories, setBulletStories] = useState<Story[]>([]);
  const [bottomStories, setBottomStories] = useState<Story[]>([]);
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

  // Handle opening original article in new tab
  const handleOpenOriginal = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
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

  // Fetch all news
  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const articles: ApiArticle[] = await fetchAllNews();

        
        if (!articles.length) {
          setIsLoading(false);
          return;
        }

        /* FEATURED STORY - 1st article */
        const first = articles[0];
        const featured: Story = {
          id: 0,
          title: first.title,
          image: first.image_url || "/home41.png",
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
        };
        setFeaturedStory(featured);

        /* BOTTOM STORIES - 2nd, 3rd, 4th articles for small cards */
        const bottomStoriesData: Story[] = articles.slice(1, 4).map(
          (item, index) => ({
            id: index + 1,
            title: item.title,
            image: item.image_url || "/home41.png",
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
          })
        );

        /* BULLET POINTS STORIES - 5th article onwards (rest of articles) */
        const bulletStoriesData: Story[] = articles.slice(4).map(
          (item, index) => ({
            id: index + 4,
            title: item.title,
            image: item.image_url || "/home41.png",
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
          })
        );

        setBottomStories(bottomStoriesData);
        setBulletStories(bulletStoriesData);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch news", err);
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!featuredStory) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Stories Available</h2>
          <p className="text-gray-600">Try refreshing the page or check back later.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ================= MAIN LAYOUT ================= */}
      {/* Increased width: px-4 to px-32 on large screens */}
      <section
        className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-32 py-8 sm:py-10 md:py-12"
        style={{ fontFamily: "var(--font-albert-sans)" }}
      >
         <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-black">
            Top Stories
          </h2>
        </div>

        <div className="max-w-8xl mx-auto">
          {/* Top Row: Big Card + Bullet Points */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            
            {/* LEFT COLUMN - Big Card (8 columns) */}
            <div className="lg:col-span-8">
              {/* FEATURED STORY CARD (EXACTLY from your original code) */}
              <div 
                className="bg-[#F5F5F5] rounded-2xl overflow-hidden flex flex-col h-full cursor-pointer hover:shadow-xl transition-shadow duration-300"
                onClick={() => handleReadMore(featuredStory)}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={featuredStory.image}
                    alt={featuredStory.title}
                    className="w-full h-[400px] object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/home41.png";
                    }}
                  />
                  <span className="absolute top-4 left-4 bg-orange-500 text-[12px] font-semibold text-white px-3 py-1 rounded-full">
                    {featuredStory.category}
                  </span>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-[42px] font-bold text-[#262626] mb-6 flex-grow hover:underline leading-tight">
                    {featuredStory.title}
                  </h3>

                  <div className="flex items-center justify-between text-[16px] text-[#727272] flex-shrink-0">
                    <span className="font-medium">By {featuredStory.author}</span>
                    <div className="flex gap-4">
                      <span>{featuredStory.date}</span>
                      <span>|</span>
                      <span>{featuredStory.readTime} read</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - Bullet Points List (4 columns) */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden h-full flex flex-col">
                {/* Bullet Points List - fills available height */}
                <div className="flex-1 overflow-y-auto">
                  {bulletStories.length > 0 ? (
                    bulletStories.map((story) => (
                      <BulletPointItem
                        key={story.id}
                        story={story}
                        onReadMore={handleReadMore}
                      />
                    ))
                  ) : (
                    <div className="p-4 text-gray-500 text-sm">
                      No more stories available
                    </div>
                  )}
                </div>
                
             
              </div>
            </div>
          </div>

          {/* Bottom Row: 4 Cards (3 stories + 1 ad) */}
          <div className="mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* First 3 Story Cards (2nd, 3rd, 4th articles) */}
              {bottomStories.map((story) => (
                <SmallStoryCard
                  key={story.id}
                  story={story}
                  onReadMore={handleReadMore}
                />
              ))}
              
              {/* 4th Card - Ad Banner */}
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl overflow-hidden flex flex-col justify-between p-6 h-full min-h-[280px] hover:shadow-lg transition-shadow duration-200">
                <div>
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                      ADVERTISEMENT
                    </span>
                  </div>
                  
                  <h4 className="text-2xl font-bold text-white mb-2">Banner</h4>
                  <p className="text-white/90 mb-4">Premium advertising space available</p>
                </div>
                
                <div>
                  <button className="w-full py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLE MODAL - EXACTLY from your original code */}
      {showArticleModal && selectedStory && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-0 bg-black/70 overflow-y-auto">
          <div className="relative w-full max-w-6xl my-4 md:my-8 bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[90vh]">
            {/* Article Header - Not sticky, smaller */}
            <div className="bg-white border-b">
              <div className="p-4 md:p-6">
                {/* Article Title - Smaller size */}
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {selectedStory.title}
                </h1>
                
                {/* Metadata Grid - More compact */}
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
              
              {/* Close Button - Smaller */}
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
                {/* NEWSPAPER STYLE SUMMARY SECTION - Float image inside summary */}
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
                        </div>
                        
                        {/* Clear float for following content */}
                        <div className="clear-both"></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Full Article Content */}
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
                      <div className="bg-gray-50 p-3 text-center border-t flex justify-between items-center">
                        <p className="text-xs text-gray-600">
                          Viewing external content. Some websites may restrict embedding.
                        </p>
                        <button
                          onClick={() => handleOpenOriginal(selectedStory.link)}
                          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors inline-flex items-center gap-2"
                        >
                          <ExternalLink size={16} />
                          Open Original Article
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Article Footer - Compact with View Original Source on right */}
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
    </>
  );
};

export default Home1;