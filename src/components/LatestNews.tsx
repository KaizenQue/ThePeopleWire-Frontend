"use client";

import { useEffect, useState } from "react";

type Article = {
  article_id: string;
  title: string;
  description: string;
  image_url: string | null;
  source_id: string;
  pubDate: string;
  link: string;
};

export default function LatestNews() {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/news");
        const data = await res.json();
        setNews(data.data || []);
      } catch (error) {
        console.error("Error fetching news", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p>Loading news...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((item) => (
        <a
          key={item.id}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border p-4 hover:shadow-md transition"
        >
          {item.image_url && (
            <img
              src={item.image_url}
              alt={item.title}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
          )}

          <h3 className="font-semibold text-lg mb-2">
            {item.title}
          </h3>

          <p className="text-sm text-gray-600 line-clamp-3">
            {item.description}
          </p>

          <div className="mt-3 text-xs text-gray-500 flex justify-between">
            <span>{item.source_id}</span>
            <span>{new Date(item.pubDate).toDateString()}</span>
          </div>
        </a>
      ))}
    </div>
  );
}
