// app/components/SearchBar.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchBar({ initialSearch }: { initialSearch: string }) {
  const [search, setSearch] = useState(initialSearch);
  const router = useRouter();
  
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/books?search=${encodeURIComponent(search)}`);
  }
  
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search books..."
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}