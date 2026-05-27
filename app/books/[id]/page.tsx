import DeleteButton from "@/app/components/deletebutton";
import { db } from "@/app/lib/db";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

async function getBook(id: number) {
  const book = await db
    .selectFrom("books")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirst();

  if (!book) notFound();
  return book;
}

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await getBook(Number(id));

  return (
    <div className="mx-auto max-w-2xl">
      <div className="card">
        <h1 className="mb-4 text-3xl font-bold">{book.title}</h1>
        <div className="space-y-2 text-gray-700">
          <p>
            <strong>Author:</strong> {book.author}
          </p>
          <p>
            <strong>Year:</strong> {book.year}
          </p>
          <p>
            <strong>Added on:</strong>{" "}
            {new Date(book.created_at).toLocaleDateString()}
          </p>
        </div>
        <div className="mt-6 flex gap-3">
          <DeleteButton bookId={book.id} />
        </div>
      </div>
    </div>
  );
}
