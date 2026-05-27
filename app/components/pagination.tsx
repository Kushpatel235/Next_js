// app/components/Pagination.tsx
import Link from 'next/link';

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  search,
}: {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  search: string;
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const searchParam = search ? `&search=${encodeURIComponent(search)}` : '';
  
  if (totalPages <= 1) return null;
  
  return (
    <div className="flex justify-center gap-2 mt-8">
      {currentPage > 1 && (
        <Link
          href={`/books?page=${currentPage - 1}${searchParam}`}
          className="px-4 py-2 border rounded-lg hover:bg-gray-100"
        >
          Previous
        </Link>
      )}
      
      <span className="px-4 py-2">
        Page {currentPage} of {totalPages}
      </span>
      
      {currentPage < totalPages && (
        <Link
          href={`/books?page=${currentPage + 1}${searchParam}`}
          className="px-4 py-2 border rounded-lg hover:bg-gray-100"
        >
          Next
        </Link>
      )}
    </div>
  );
}