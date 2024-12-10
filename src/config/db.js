import pg from "pg";

const { Pool } = pg;
// Set up the PostgreSQL connection
const pool = new Pool({
  user: "postgres", // Database username
  host: "localhost", // Database host
  database: "rcm", // Database name
  password: "postgres", // Database password
  port: "5432", // Default PostgreSQL port
});

console.log({
  user: process.env.DB_USER, // Database username
  host: process.env.DB_HOST, // Database host
  database: process.env.DB_DATABASE, // Database name
  password: process.env.DB_PASSWORD, // Database password
  port: process.env.DB_PORT, // Default PostgreSQL port
});


export default pool;
