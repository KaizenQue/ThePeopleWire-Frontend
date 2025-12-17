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
    <section
      className="w-full px-4 lg:px-8 py-12"
      style={{ fontFamily: "var(--font-albert-sans)" }}
    >
      <h2 className="text-3xl font-bold text-white mb-8">Top Stories</h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* FEATURED */}
        <div className="lg:col-span-6 lg:row-span-2 bg-[#F5F5F5] rounded-2xl overflow-hidden">
          <div className="relative">
            <img
              src={featuredStory.image}
              alt={featuredStory.title}
              className="w-full h-90 object-cover"
            />
            <span
              style={{ fontFamily: "var(--font-dm-sans)" }}
              className="absolute top-4 left-4 bg-orange-500 text-[12px] font-semibold text-white tracking-[-0.24px] px-3 py-1 rounded-full"
            >
              {featuredStory.category}
            </span>
          </div>

          <div className="p-6">
            <h3 className="text-[35px] font-bold text-[#262626] tracking-[-1.75px] mb-6">
              {featuredStory.title}
            </h3>

            <div
              style={{ fontFamily: "var(--font-dm-sans)" }}
              className="flex items-center justify-between text-[14px] text-[#727272] tracking-[-0.28px]"
            >
              <div className="flex items-center gap-3">
                <img
                  src={featuredStory.authorImage}
                  alt={featuredStory.author}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-black">
                  By {featuredStory.author}
                </span>
              </div>

              <div className="flex items-center gap-3 text-[15px] tracking-[-0.5px]">
                <span>{featuredStory.date}</span>
                <span>{featuredStory.readTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* TOP RIGHT */}
        <div className="lg:col-span-3">
          <SmallStoryCard story={smallStories[0]} />
        </div>

        {/* CTA */}
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

        {/* BOTTOM ROW (reusing TOP RIGHT CSS) */}
        {smallStories.slice(1).map((story) => (
          <div key={story.id} className="lg:col-span-3">
            <SmallStoryCard story={story} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home1;
