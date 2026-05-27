// app/api/books/route.ts
import { db } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';

// GET - fetch books
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get('search') || '';
  
  let query = db.selectFrom('books').selectAll();
  
  if (search) {
    query = query.where('title', 'ilike', `%${search}%`);
  }
  
  const books = await query.execute();
  
  return NextResponse.json(books);
}

// POST - add a book
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, author, year } = body;
    
    if (!title || !author || !year) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const result = await db
      .insertInto('books')
      .values({ title, author, year })
      .returningAll()
      .executeTakeFirst();
    
    return NextResponse.json(result, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to add book' },
      { status: 500 }
    );
  }
}

// DELETE - remove a book
export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ error: 'Book ID required' }, { status: 400 });
  }
  
  await db.deleteFrom('books').where('id', '=', Number(id)).execute();
  
  return NextResponse.json({ success: true });
}
