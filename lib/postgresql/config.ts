import { Pool } from 'pg';

// PostgreSQL connection pool configuration
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'tranquil_db',
});

pool.on('error', (error) => {
  console.error('Unexpected error on idle client', error);
});

export default pool;
