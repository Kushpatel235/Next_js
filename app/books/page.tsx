import type { Metadata } from "next";
import Link from "next/link";
import SearchBar from "../components/searchbar";
import Pagination from "../components/pagination";
import { db } from "../lib/db";

export const metadata: Metadata = {
  title: "All Books | Book Library",
  description: "Browse our collection of books",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getBooks(search: string, page: number) {
  const itemsPerPage = 3;
  const offset = (page - 1) * itemsPerPage;

  let query = db.selectFrom("books").selectAll();

  if (search) {
    query = query.where("title", "ilike", `%${search}%`);
  }

  const books = await query.limit(itemsPerPage).offset(offset).execute();

  const countResult = await db
    .selectFrom("books")
    .select(db.fn.count("id").as("count"))
    .execute();

  const total = Number(countResult[0]?.count || 0);

  return { books, total };
}

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams.search || "";
  const page = Number(resolvedSearchParams.page) || 1;
  const { books, total } = await getBooks(search, page);

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">All Books</h1>

      <div className="mb-6">
        <SearchBar initialSearch={search} />
      </div>

      <div className="grid gap-4">
        {books.map((book) => (
          <div key={book.id} className="card">
            <h2 className="text-xl font-semibold">{book.title}</h2>
            <p className="text-gray-600">
              By {book.author} ({book.year})
            </p>
            <Link
              href={`/books/${book.id}`}
              className="mt-2 inline-block text-blue-600 hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalItems={total}
        itemsPerPage={3}
        search={search}
      />
    </div>
  );
}
