import pool from "../config/db.js";

export const getPayers = async () => {
  const res = await pool.query("SELECT * FROM rcm.payer");
  return res.rows;
};

export const getPayerById = async (id) => {
  const res = await pool.query("SELECT * FROM rcm.payer WHERE payer_id = $1", [
    id,
  ]);
  return res.rows[0];
};

export const searchPayer = async (queryParams) => {
  const keys = Object.keys(queryParams);
  const values = Object.values(queryParams);

  // Build WHERE clause dynamically
  const whereClause = keys
    .map((key, idx) => `${key} ILIKE $${idx + 1}`)
    .join(" OR ");

  // Construct SQL query
  const query = `
    SELECT * 
    FROM rcm.payer 
    ${whereClause ? `WHERE ${whereClause}` : ""}
  `;

  // Execute query
  const res = await pool.query(
    query,
    values.map((value) => `%${value}%`)
  );
  return res.rows;
};

/*
export const insertPayer = async (Payer) => {
  const keys = Object.keys(Payer);
  const values = Object.values(Payer);

  const columns = keys.join(", "); // Column names as a comma-separated string
  const placeholders = keys.map((_, idx) => `$${idx + 1}`).join(", "); // $1, $2, ..., $n

  const query = `INSERT INTO rcm.payer (${columns}) VALUES (${placeholders}) RETURNING *`;
  const res = await pool.query(query, values);
  return res.rows[0];
};

export const updatePayer = async (id, Payer) => {
  const keys = Object.keys(Payer);
  const values = Object.values(Payer);

  const setClause = keys.map((key, idx) => `${key} = $${idx + 1}`).join(", ");

  // Add Payer_id as the last parameter
  const query = `UPDATE rcm.Payer SET ${setClause} WHERE Payer_id = $${
    keys.length + 1
  } RETURNING *`;

  // Execute query
  const res = await pool.query(query, [...values, id]);
  return res.rows[0];
};

export const deletePayer = async (id) => {
  const res = await pool.query(
    "DELETE FROM rcm.Payer WHERE Payer_id = $1 RETURNING *",
    [id]
  );
  return res.rows[0];
};
*/
