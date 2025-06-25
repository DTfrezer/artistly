interface Artist {
  id: string;
  name: string;
  bio: string;
  category: string[];
  languages: string[];
  fee: string;
  location: string;
}

interface TableProps {
  data: Artist[];
}

export default function Table({ data }: TableProps) {
  return (
    <div className="overflow-x-auto rounded border shadow">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">City</th>
            <th className="px-4 py-2">Fee</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((artist) => (
            <tr key={artist.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{artist.name}</td>
              <td className="px-4 py-2">{artist.category.join(", ")}</td>
              <td className="px-4 py-2">{artist.location}</td>
              <td className="px-4 py-2">₹{artist.fee}</td>
              <td className="px-4 py-2">
                <button className="text-blue-600 hover:underline">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
