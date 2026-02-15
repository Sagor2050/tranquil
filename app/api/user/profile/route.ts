import { NextRequest, NextResponse } from 'next/server';
import { withAuth, DecodedToken } from '@/lib/middleware';
import { getUserById } from '@/lib/auth';

async function handler(request: NextRequest, decoded: DecodedToken) {
  try {
    if (request.method === 'GET') {
      const user = await getUserById(decoded.id);

      if (!user) {
        return NextResponse.json(
          { message: 'User not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ user }, { status: 200 });
    }

    return NextResponse.json(
      { message: 'Method not allowed' },
      { status: 405 }
    );
  } catch (error) {
    console.error('Profile error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const GET = (request: NextRequest) => withAuth(handler)(request);
