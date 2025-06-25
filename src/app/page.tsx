import Image from "next/image";
import HeroCarousel from "@/components/ui/HeroCarousel";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-100 to-white flex flex-col items-center justify-start px-4">
      <HeroCarousel />

      <div className="max-w-4xl text-center py-20">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-6">
          Welcome to <span className="text-blue-600">Artistly</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Discover and book amazing artists for your events — singers, dancers, DJs & more!
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <a
            href="/artist"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-full shadow hover:bg-blue-700 transition"
          >
            🎨 Explore Artists
          </a>
          <a
            href="/onboard"
            className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-full shadow hover:bg-gray-300 transition"
          >
            🚀 Become an Artist
          </a>
          <a
            href="/dashboard"
            className="px-6 py-3 bg-green-600 text-white font-medium rounded-full shadow hover:bg-green-700 transition"
          >
            📊 Dashboard
          </a>
        </div>

        <div className="mt-12 w-full max-w-md mx-auto relative aspect-[1/1]">
          <Image
            src="/landing-illustration.svg"
            alt="Artists"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </main>
  );
}
