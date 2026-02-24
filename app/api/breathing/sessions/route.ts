import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/postgresql/config';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// GET: Fetch breathing sessions for a user
export async function GET(request: NextRequest) {
  try {
    // Get user ID from token
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };

    // Fetch user's breathing sessions
    const result = await pool.query(
      'SELECT * FROM breathing_sessions WHERE user_id = $1 ORDER BY completed_at DESC LIMIT 30',
      [decoded.id]
    );

    return NextResponse.json(
      {
        message: 'Sessions retrieved successfully',
        sessions: result.rows,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching breathing sessions:', error);
    return NextResponse.json(
      { message: 'Failed to fetch sessions' },
      { status: 500 }
    );
  }
}

// POST: Save a new breathing session
export async function POST(request: NextRequest) {
  try {
    const { technique, duration_seconds, cycles_completed, notes } = await request.json();

    // Get user ID from token
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };

    // Validate input
    if (!technique || !duration_seconds) {
      return NextResponse.json(
        { message: 'Technique and duration are required' },
        { status: 400 }
      );
    }

    // Save session to database
    const result = await pool.query(
      'INSERT INTO breathing_sessions (user_id, technique, duration_seconds, cycles_completed, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [decoded.id, technique, duration_seconds, cycles_completed || 0, notes || null]
    );

    return NextResponse.json(
      {
        message: 'Session saved successfully',
        session: result.rows[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving breathing session:', error);
    return NextResponse.json(
      { message: 'Failed to save session' },
      { status: 500 }
    );
  }
}
