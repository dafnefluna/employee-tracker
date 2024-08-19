import dotenv from 'dotenv';
dotenv.config();
import pg from 'pg';
// Import and require Pool (node-postgres)
// We'll be creating a Connection Pool. Read up on the benefits here: https://node-postgres.com/features/pooling

const { Pool } = pg;
// here we initalize a NEW CONNECTION --> DB CONFIG
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: 'localhost',
  database: process.env.DB_NAME,
  port: 5432,
});

// WE MAKE a CONNECTION to the database
const connectToDb = async () => {
  try {
    await pool.connect();
    console.log('Connected to the database.');
  } catch (err) {
    console.error('Error connecting to database:', err);
    process.exit(1);
  }
};

export { pool, connectToDb };
