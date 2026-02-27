"use client";

import { useState, useEffect } from "react";
import LoadingGif from "@/components/LoadingGif";
import Footer from "@/components/footer";
import Header from "@/components/app-navbar";
import Home1 from "@/components/entertainment/topstories1";
import HeaderAD from "@/components/Ads-Components/Header-Ad";
import MidAd from "@/components/Ads-Components/Mid-Ad";
import Home3 from "@/components/entertainment/topstories3";
import Home4 from "@/components/entertainment/topstories6";

export default function topstories() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingGif />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* <HeaderAD /> */}
      <Header />
      <Home1/>
      <Home3/>
      {/* <MidAd/> */}
      <Home4/>
      <Footer />
    </main>
  );
}