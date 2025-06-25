interface FilterProps {
  category: string;
  location: string;
  setCategory: (val: string) => void;
  setLocation: (val: string) => void;
}

export default function FilterBlock({
  category,
  location,
  setCategory,
  setLocation,
}: FilterProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border px-4 py-2 rounded"
      >
        <option value="">All Categories</option>
        <option value="Singer">Singer</option>
        <option value="Dancer">Dancer</option>
        <option value="DJ">DJ</option>
        <option value="Speaker">Speaker</option>
      </select>

      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border px-4 py-2 rounded"
      >
        <option value="">All Locations</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Delhi">Delhi</option>
        <option value="Pune">Pune</option>
        <option value="Bangalore">Bangalore</option>
      </select>
    </div>
  );
}