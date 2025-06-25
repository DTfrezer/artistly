// src/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Table from "@/components/Table";

interface Artist {
  id: string;
  name: string;
  category: string[];
  location: string;
  price: number;
}

export default function DashboardPage() {
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "artists"));
        const docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Artist[];

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
