import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/postgresql/config';

export async function GET(request: NextRequest) {
  try {
    console.log('Testing database connection...');
    console.log('Environment variables:', {
      DB_USER: process.env.DB_USER,
      DB_HOST: process.env.DB_HOST,
      DB_PORT: process.env.DB_PORT,
      DB_NAME: process.env.DB_NAME,
      DB_PASSWORD: process.env.DB_PASSWORD ? '***' : '(empty)',
    });

    // Test connection
    const result = await pool.query('SELECT NOW() as current_time');
    
    return NextResponse.json(
      {
        status: 'success',
        message: 'Database connection successful',
        timestamp: result.rows[0],
        config: {
          user: process.env.DB_USER,
          host: process.env.DB_HOST,
          port: process.env.DB_PORT,
          database: process.env.DB_NAME,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Database test error:', error);
    
    return NextResponse.json(
      {
        status: 'error',
        message: 'Database connection failed',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
