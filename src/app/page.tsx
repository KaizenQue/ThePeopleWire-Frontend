import Image from "next/image";
import Footer from "@/components/footer";
import Header from "@/components/app-navbar";
import Home1 from "@/components/home/home1";
import Home2 from "@/components/home/home2";
import Home3 from "@/components/home/home3";
import Home4 from "@/components/home/home4";
import Home5 from "@/components/home/home5";
import Home6 from "@/components/home/home6";
import Home8 from "@/components/home/home8";
import LatestNews from "@/components/LatestNews";

export default function Home() {
 return (
  <main className="flex min-h-screen flex-col items-center justify-between">
    <Header />
    <Home1/>
    <Home2/>
    <Home3/>
    <Home4/>
    <Home5/>
    <Home6/>
    <Home8/>
    {/* <LatestNews/> */}
    <Footer />
  </main>
 );
}
