// app/page.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="text-center py-12">
      <div className="mb-8">
        <Image
          src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400"
          alt="Library"
          width={400}
          height={300}
          className="rounded-lg mx-auto"
        />
      </div>
      <h1 className="text-4xl font-bold mb-4">Welcome to Book Library</h1>
      <p className="text-gray-600 mb-8">Manage your book collection easily</p>
      <Link
        href="/books"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Browse Books
      </Link>
    </div>
  );
}