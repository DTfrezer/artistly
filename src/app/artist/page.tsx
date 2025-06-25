'use client';

import { useEffect, useState } from "react";
import ArtistCard from "@/components/ArtistCard";
import FilterBlock from "@/components/FilterBlock";
import data from "@/data/artists.json";

interface Artist {
  id: number;
  name: string;
  category: string;
  price: number;
  location: string;
}

export default function ArtistListingPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [filtered, setFiltered] = useState<Artist[]>([]);

  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setArtists(data);
    setFiltered(data);
  }, []);

  useEffect(() => {
    let result = artists;
    if (category) {
      result = result.filter((a) => a.category === category);
    }
    if (location) {
      result = result.filter((a) => a.location === location);
    }
    if (search) {
      result = result.filter((a) => a.name.toLowerCase().includes(search.toLowerCase()));
    }
    setFiltered(result);
  }, [category, location, search, artists]);

  return (
    <main className="min-h-screen px-6 py-10 bg-gradient-to-br from-gray-100 to-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
          🎨 Explore Artists
        </h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Search by name..."
            className="w-full max-w-md mx-auto block px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <FilterBlock
          category={category}
          location={location}
          setCategory={setCategory}
          setLocation={setLocation}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6">
          {filtered.map((artist) => (
            <ArtistCard key={artist.id} {...artist} />
          ))}
        </div>
      </div>
    </main>
  );
}
