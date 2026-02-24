import bcrypt from 'bcryptjs';
import pool from '@/lib/postgresql/config';

interface User {
  id: number;
  email: string;
  name: string;
  avatar_url?: string;
  bio?: string;
  created_at: Date;
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Verify password
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Create new user (signup)
export async function createUser(
  email: string,
  name: string,
  password: string
): Promise<User | null> {
  try {
    const hashedPassword = await hashPassword(password);

    const result = await pool.query(
      'INSERT INTO users (email, name, password_hash) VALUES ($1, $2, $3) RETURNING id, email, name, avatar_url, bio, created_at',
      [email, name, hashedPassword]
    );

    return result.rows[0];
  } catch (error) {
    console.error('Error creating user:', error);
    if (error instanceof Error) {
      console.error('Database error details:', error.message);
      console.error('Stack:', error.stack);
    }
    return null;
  }
}

// Get user by email (for login)
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const result = await pool.query(
      'SELECT id, email, name, avatar_url, bio, created_at FROM users WHERE email = $1',
      [email]
    );

    return result.rows[0] || null;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

// Get user by email with password (for login verification)
export async function getUserByEmailWithPassword(email: string) {
  try {
    const result = await pool.query(
      'SELECT id, email, name, password_hash, avatar_url, bio, created_at FROM users WHERE email = $1',
      [email]
    );

    return result.rows[0] || null;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

// Get user by ID
export async function getUserById(id: number): Promise<User | null> {
  try {
    const result = await pool.query(
      'SELECT id, email, name, avatar_url, bio, created_at FROM users WHERE id = $1',
      [id]
    );

    return result.rows[0] || null;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}
