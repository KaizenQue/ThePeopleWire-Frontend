import React from "react";

type Story = {
  id: number;
  title: string;
  image: string;
  category: string;
  author: string;
  readTime: string;
  prf_img:string;
  date:string;
};

/* ------------------ DATA ------------------ */

const featuredStory = {
  title:
    "12 AI Code Generators Tested: Features, Pricing & Honest Reviews for 2025",
  image: "home1tileimg1.png",
  category: "Social media",
  author: "Amal Neerad",
  authorImage: "amalneerad.png",
  date: "December 03, 2025",
  readTime: "21 min read",
};

const smallStories: Story[] = [
  {
    id: 1,
    title: "Cursor AI Review (2025): Features, Workflow, and Why I Use It",
    image: "home1tileimg2.png",
    category: "Social media",
    author: "John Kennedy",
    readTime: "5 Min Read",
    prf_img:"johnkenndy.svg",
    date:"Jan 21 2025",
  },
  {
    id: 2,
    title: "Cursor AI Review (2025): Features, Workflow, and Why I Use It",
    image: "home1tileimg3.png",
    category: "Social media",
    author: "John Kennedy",
    readTime: "5 Min Read",
    prf_img:"johnkenndy.svg",
        date:"Jan 21 2025",

  },
  {
    id: 3,
    title: "Cursor AI Review (2025): Features, Workflow, and Why I Use It",
    image: "home1tileimg4.png",
    category: "Social media",
    author: "John Kennedy",
    readTime: "5 Min Read",
    prf_img:"johnkenndy.svg",
        date:"Jan 21, 2025",

  },
];

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

 <div
  className="
    flex flex-col gap-2
    sm:flex-row sm:items-center sm:justify-between
    text-[#727272] tracking-[-0.28px]
  "
>
  {/* Author */}
  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
    {story.prf_img && (
      <img
        src={story.prf_img}
        alt={story.author}
        className="
          w-5 h-5
          sm:w-6 sm:h-6
          rounded-full object-cover flex-shrink-0
        "
      />
    )}

    <span
      style={{ fontFamily: "var(--font-dm-sans)" }}
      className="
        text-[10px] font-normal leading-[12px] text-[#231F18]
        truncate
      "
    >
      {story.author}
    </span>
  </div>

  {/* Meta */}
  <div className="flex items-center gap-1 flex-shrink-0">
    <span
      style={{ fontFamily: "var(--font-dm-sans)" }}
      className="text-[10px] font-normal leading-normal tracking-[-0.2px] text-black"
    >
      {story.date}
    </span>

    <span className="text-[10px] text-black/60">|</span>

    <span
      style={{ fontFamily: "var(--font-dm-sans)" }}
      className="text-[10px] font-normal leading-normal tracking-[-0.2px] text-black capitalize"
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
        <span
          style={{ fontFamily: "var(--font-dm-sans)" }}
          className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-orange-500 text-[11px] sm:text-[12px] font-semibold text-white px-3 py-1 rounded-full"
        >
          {featuredStory.category}
        </span>
      </div>

      <div className="p-4 sm:p-5 md:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-[#262626] mb-3 sm:mb-4">
          {featuredStory.title}
        </h3>

        <div
          style={{ fontFamily: "var(--font-dm-sans)" }}
          className="flex items-center justify-between text-xs sm:text-sm text-[#727272]"
        >
          <span>By {featuredStory.author}</span>
          <span>{featuredStory.readTime}</span>
        </div>
      </div>
    </div>

    {/* CTA */}
    <div className="bg-black rounded-2xl p-5 sm:p-6 md:p-7">
      <img src="/logo-yellow.png" alt="" className="w-7 sm:w-8 mb-4" />

      <h3
        className="text-[22px] sm:text-[24px] md:text-[26px] font-extrabold tracking-[-0.52px] mb-2"
        style={{ color: "#F3CB04" }}
      >
        Download Our App
        <br />
        <span className="text-white">for more Updates!</span>
      </h3>

      <p className="text-[14px] sm:text-[15px] font-medium text-white">
        Get all things membership,
        <br />
        straight to your inbox.
      </p>

      <div className="flex gap-3 mt-5 sm:mt-6">
        <img
          src="/appstore.png"
          className="w-[110px] sm:w-[114px] h-[34px] object-contain"
        />
        <img
          src="/playstore.png"
          className="w-[110px] sm:w-[114px] h-[34px] object-contain"
        />
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


      {/* ================= DESKTOP ONLY (UNCHANGED LOGIC) ================= */}
      <div className="hidden lg:block">
        <section
          className="w-full px-4 lg:px-8 py-12"
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
                <span
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                  className="absolute top-4 left-4 bg-orange-500 text-[12px] font-semibold text-white px-3 py-1 rounded-full"
                >
                  {featuredStory.category}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-[35px] font-bold text-[#262626] mb-6">
                  {featuredStory.title}
                </h3>

                <div
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                  className="flex items-center justify-between text-[14px] text-[#727272]"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredStory.authorImage}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-black">
                      By {featuredStory.author}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <span>{featuredStory.date}</span>
                    <span>{featuredStory.readTime}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <SmallStoryCard story={smallStories[0]} />
            </div>

            <div className="lg:col-span-3 bg-black rounded-2xl p-6 flex flex-col justify-between">
<div>
            <img src="/logo-yellow.png" alt="" className="w-8 mb-4" />
            <h3
  className="text-[26px] font-extrabold tracking-[-0.52px] mb-2"
  style={{ fontFamily: "var(--font-albert-sans)", color: "#F3CB04" }}
>
  Download Our App
  <br />
  <span className="text-white">for more Updates!</span>
</h3>

           <p
  className="text-[15px] font-medium text-white"
  style={{ fontFamily: "var(--font-albert-sans)" }}
>
  Get all things membership,
  <br />
  straight to your inbox.
</p>

          </div>
            <div className="flex gap-3 mt-6">
<img
  src="/appstore.png"
  alt="App Store"
  className="w-[114.32px] h-[33.915px] object-contain"
/>
            <img src="/playstore.png" className="w-[114.32px] h-[33.915px] object-contain" />
          </div>
            </div>

            {smallStories.slice(1).map((story) => (
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
