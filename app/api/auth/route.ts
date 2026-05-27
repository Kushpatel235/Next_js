// app/api/auth/route.ts
import { db } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

export async function POST(request: NextRequest) {
  try {
    const { email, password, isLogin } = await request.json();
    
    if (isLogin) {
      // Login
      const user = await db
        .selectFrom('users')
        .selectAll()
        .where('email', '=', email)
        .executeTakeFirst();
      
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 401 });
      }
      
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
      }
      
      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET);
      return NextResponse.json({ token });
    } else {
      // Sign up
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const user = await db
        .insertInto('users')
        .values({ email, password: hashedPassword })
        .returningAll()
        .executeTakeFirst();
      
      if (!user) {
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
      }

      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET);
      return NextResponse.json({ token });
    }
  } catch {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
