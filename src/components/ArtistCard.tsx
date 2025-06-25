import { motion } from "framer-motion";

interface Artist {
  name: string;
  category: string;
  price: number;
  location: string;
}

export default function ArtistCard({ name, category, price, location }: Artist) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
      className="border rounded-xl p-4 shadow hover:shadow-md transition"
    >
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-gray-600">{category}</p>
      <p className="text-sm">💰 ₹{price}</p>
      <p className="text-sm">📍 {location}</p>
      <button className="mt-2 text-blue-600 hover:underline">Ask for Quote</button>
    </motion.div>
  );
}
