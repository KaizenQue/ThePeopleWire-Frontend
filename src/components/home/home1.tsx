"use client";

import React, { useEffect, useState } from "react";

/* ------------------ TYPES ------------------ */

type ApiArticle = {
  id: string;
  title: string;
  image_url: string | null;
  category?: string[];
  author?: string[];
  publish_datetime: string;
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
};

/* ------------------ COMPONENTS ------------------ */

const SmallStoryCard: React.FC<{ story: Story }> = ({ story }) => (
  <div className="bg-[#F5F5F5] rounded-2xl overflow-hidden">
    <div className="relative">
      <img
        src={story.image}
        alt={story.title}
        className="w-full h-[180px] object-cover"
      />
      <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
        {story.category}
      </span>
    </div>

    <div className="p-4">
      <h4 className="text-sm font-semibold leading-snug mb-3">
        {story.title}
      </h4>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-[#727272] tracking-[-0.28px]">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {story.prf_img && (
            <img
              src={story.prf_img}
              alt={story.author}
              className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover"
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
            {story.readTime}
          </span>
        </div>
      </div>
    </div>
  </div>
);

/* ------------------ MAIN ------------------ */

const Home1: React.FC = () => {
  const [featuredStory, setFeaturedStory] = useState<any>(null);
  const [smallStories, setSmallStories] = useState<Story[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/news");
        const json = await res.json();
        const articles: ApiArticle[] = json.data || [];

        if (!articles.length) return;

        /* FEATURED STORY */
        const first = articles[0];
        setFeaturedStory({
          title: first.title,
          image: first.image_url || "/placeholder.jpg",
          category: first.category?.[0] || "Top",
          author: first.author?.[0] || "Unknown",
          authorImage: "/profile.png",
          date: new Date(first.publish_datetime).toDateString(),
          readTime: "5 Min Read",
        });

        /* SMALL STORIES */
        const mappedSmallStories: Story[] = articles.slice(1, 4).map(
          (item, index) => ({
            id: index + 1,
            title: item.title,
            image: item.image_url || "/placeholder.jpg",
            category: item.category?.[0] || "Top",
            author: item.author?.[0] || "Unknown",
            readTime: "5 Min Read",
            prf_img: "",
            date: new Date(item.publish_datetime).toDateString(),
          })
        );

        setSmallStories(mappedSmallStories);
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
        <h2 className="text-2xl sm:text-3xl font-bold text-black mb-6 sm:mb-8">
          Top Stories
        </h2>

        <div className="flex flex-col gap-6 sm:gap-8">
          {/* FEATURED */}
          <div className="bg-[#F5F5F5] rounded-2xl overflow-hidden">
            <div className="relative">
              <img
                src={featuredStory.image}
                alt={featuredStory.title}
                className="w-full h-[220px] sm:h-[260px] md:h-[300px] object-cover"
              />
              <span className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-orange-500 text-[11px] sm:text-[12px] font-semibold text-white px-3 py-1 rounded-full">
                {featuredStory.category}
              </span>
            </div>

            <div className="p-4 sm:p-5 md:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-[#262626] mb-3 sm:mb-4">
                {featuredStory.title}
              </h3>

              <div className="flex items-center justify-between text-xs sm:text-sm text-[#727272]">
                <span>By {featuredStory.author}</span>
                <span>{featuredStory.readTime}</span>
              </div>
            </div>
          </div>

          {/* CTA — UNCHANGED */}
 {/* CTA - UPDATED FOR TABLET */}
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
                    text-white
                  "
                >
                  Download{" "}
                  <span className="text-[#F3CB04]"> Our App </span>
                  <br className="hidden sm:block" />
                  <span className="text-white">for more Updates!</span>
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

          {/* APP STORE BUTTONS - SIDE BY SIDE FOR TABLET/MOBILE */}
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
    href="https://apps.apple.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block"
  >
    <img
      src="/appstore.png"
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
    href="https://play.google.com/store"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block"
  >
    <img
      src="/playstore.png"
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
          {/* SMALL STORIES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {smallStories.map((story) => (
              <SmallStoryCard key={story.id} story={story} />
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
          <h2 className="text-3xl font-bold text-black mb-8">Top Stories</h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* FEATURED */}
            <div className="lg:col-span-6 lg:row-span-2 bg-[#F5F5F5] rounded-2xl overflow-hidden">
              <div className="relative">
                <img
                  src={featuredStory.image}
                  alt={featuredStory.title}
                  className="w-full h-[360px] object-cover"
                />
                <span className="absolute top-4 left-4 bg-orange-500 text-[12px] font-semibold text-white px-3 py-1 rounded-full">
                  {featuredStory.category}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-[35px] font-bold text-[#262626] mb-6">
                  {featuredStory.title}
                </h3>

                <div className="flex items-center justify-between text-[14px] text-[#727272]">
                  <span>By {featuredStory.author}</span>
                  <div className="flex gap-3">
                    <span>{featuredStory.date}</span>
                    <span>{featuredStory.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
{smallStories.slice(0, 1).map((story) => (
  <div key={story.id} className="lg:col-span-3">
    <SmallStoryCard story={story} />
  </div>
))}


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
                  className="mb-2 font-extrabold leading-[1.15] tracking-[-0.52px] text-white"
                >
                  Download <span className="text-[#F3CB04]"> Our App</span>
                  <br />
                  <span className="text-white">for more Updates!</span>
                </h3>

                <p
                  style={{ fontFamily: "var(--font-albert-sans)" }}
                  className="text-[clamp(13px,1.15vw,16px)] leading-[1.45] text-white"
                >
                  Get all things membership,
                  <br />
                  straight to your inbox.
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
    href="https://apps.apple.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block"
  >
    <img
      src="/appstore.png"
      alt="App Store"
      className="
        w-[96px]
        md:w-[88px]
        lg:w-[94px]
        h-[30px]
        object-contain
        cursor-pointer
      "
    />
  </a>

  <a
    href="https://play.google.com/store"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block"
  >
    <img
      src="/playstore.png"
      alt="Play Store"
      className="
        w-[96px]
        md:w-[88px]
        lg:w-[94px]
        h-[30px]
        object-contain
        cursor-pointer
      "
    />
  </a>
</div>

            </div>
            {smallStories.slice(1, 3).map((story) => (
  <div key={story.id} className="lg:col-span-3">
    <SmallStoryCard story={story} />
  </div>
))}

  
          </div>
        </section>
      </div>
    </>
  );
};

export default Home1;
