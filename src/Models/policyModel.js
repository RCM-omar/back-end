import pool from "../config/db.js";

export const getPolicies = async () => {
  const res = await pool.query("SELECT * FROM rcm.policy");
  return res.rows;
};

export const getPolicyById = async (id) => {
  const res = await pool.query("SELECT * FROM rcm.policy WHERE policy_id = $1", [
    id,
  ]);
  return res.rows[0];
};

export const searchPolicy = async (queryParams) => {
  const keys = Object.keys(queryParams);
  const values = Object.values(queryParams);

  // Build WHERE clause dynamically
  const whereClause = keys
    .map((key, idx) => `${key} ILIKE $${idx + 1}`)
    .join(" OR ");

  // Construct SQL query
  const query = `
    SELECT * 
    FROM rcm.policy 
    ${whereClause ? `WHERE ${whereClause}` : ""}
  `;

  // Execute query
  const res = await pool.query(
    query,
    values.map((value) => `%${value}%`)
  );
  return res.rows;
};
