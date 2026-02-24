import pool from '@/lib/postgresql/config';

export async function testDatabaseConnection() {
  try {
    console.log('Testing database connection...');
    console.log('DB Config:', {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
    });

    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connection successful!', result.rows[0]);
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}
