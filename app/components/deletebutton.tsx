// app/components/DeleteButton.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DeleteButton({ bookId }: { bookId: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this book?')) return;
    
    setLoading(true);
    try {
      await fetch(`/api/books?id=${bookId}`, { method: 'DELETE' });
      router.push('/books');
    } catch {
      alert('Failed to delete');
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
    >
      {loading ? 'Deleting...' : 'Delete Book'}
    </button>
  );
}
