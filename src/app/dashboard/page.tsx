'use client';

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Table from "@/components/Table";

// Match the actual Firestore structure
interface Artist {
  id: string;
  name: string;
  bio: string;
  category: string[];
  languages: string[];
  fee: string;
  location: string;
}

export default function DashboardPage() {
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "artists"));
        const docs: Artist[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || "",
            bio: data.bio || "",
            category: data.category || [],
            languages: data.languages || [],
            fee: data.fee || "",
            location: data.location || "",
          };
        });

        setArtists(docs);
      } catch (error) {
        console.error("Error fetching artists from Firestore:", error);
      }
    };

    fetchArtists();
  }, []);

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">📊 Manager Dashboard</h1>
      <p className="mb-6 text-gray-600">Review recent artist submissions below:</p>

      {artists.length > 0 ? (
        <Table data={artists} />
      ) : (
        <p className="text-gray-500">No submissions yet.</p>
      )}
    </main>
  );
}
