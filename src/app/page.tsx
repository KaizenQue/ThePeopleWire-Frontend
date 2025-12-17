import Image from "next/image";
import Footer from "@/components/footer";
import Header from "@/components/app-navbar";
import Home1 from "@/components/home/home1";
import Home3 from "@/components/home/home3";
import Home4 from "@/components/home/home4";
export default function Home() {
 return (
  <main className="flex min-h-screen flex-col items-center justify-between">
    {/* <Header /> */}
    <Home1/>
    <Home4/>
    <Home3/>
    <Footer />
  </main>
 );
}
