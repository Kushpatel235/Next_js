import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-12 text-center">
      <h2 className="mb-4 text-2xl font-bold">Book Not Found</h2>
      <p className="mb-4">The book you are looking for does not exist.</p>
      <Link href="/books" className="text-blue-600 hover:underline">
        Back to Books
      </Link>
    </div>
  );
}
