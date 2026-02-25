
import { Bell } from "lucide-react";

export const metadata = {
  title: "Coming Soon",
  description: "Our website is coming soon",
};

export default function ComingSoon() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="text-center">
        <Bell className="mx-auto mb-6 h-14 w-14 text-yellow-400 animate-bounce" />

        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Coming Soon
        </h1>

        <p className="mt-4 text-gray-400 max-w-md mx-auto">
          We are building something amazing. Stay tuned!
        </p>
      </div>
    </main>
  );
}
