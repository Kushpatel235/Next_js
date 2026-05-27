// app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="text-center py-12">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <h2 className="text-xl font-bold mb-2">Something went wrong!</h2>
        <p>{error.message}</p>
      </div>
      <button
        onClick={reset}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Try again
      </button>
    </div>
  );
}