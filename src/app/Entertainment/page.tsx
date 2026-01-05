import Image from "next/image";
import Footer from "@/components/footer";
import Header from "@/components/app-navbar";
import Home1 from "@/components/entertainment/topstories1";

import HeaderAD from "@/components/Ads-Components/Header-Ad";
import MidAd from "@/components/Ads-Components/Mid-Ad";
import Home3 from "@/components/entertainment/topstories3";
import Home4 from "@/components/entertainment/topstories6";

export default function topstories() {
 return (
  <main className="flex min-h-screen flex-col items-center justify-between">
     <HeaderAD />
    <Header />
    <Home1/>
    <Home3/>
    <MidAd/>
    <Home4/>
    <Footer />
  </main>
 );
}
