import pool from "../config/db.js";


export const getPersons = async () => {
  const res = await pool.query("SELECT * FROM Person");
  console.log(res.rows);
  
  return res.rows;
};


export const getPersonById = async (id) => {
  const res = await pool.query("SELECT * FROM Person WHERE person_id = $1", [
    id,
  ]);
  return res.rows[0];
};

export const insertPerson = async (Person) => {
  const keys = Object.keys(Person);
  const values = Object.values(Person);

  const columns = keys.join(", "); // Column names as a comma-separated string
  const placeholders = keys.map((_, idx) => `$${idx + 1}`).join(", "); // $1, $2, ..., $n

  const query = `INSERT INTO Person (${columns}) VALUES (${placeholders}) RETURNING *`;
  const res = await pool.query(query, values);
  return res.rows[0];
};

export const updatePerson = async (id, Person) => {
  const keys = Object.keys(Person);
  const values = Object.values(Person);

  const setClause = keys.map((key, idx) => `${key} = $${idx + 1}`).join(", ");

  // Add person_id as the last parameter
  const query = `UPDATE Person SET ${setClause} WHERE person_id = $${
    keys.length + 1
  } RETURNING *`;

  // Execute query
  const res = await pool.query(query, [...values, id]);
  return res.rows[0];
};

export const deletePerson = async (id) => {
  const res = await pool.query(
    "DELETE FROM Person WHERE person_id = $1 RETURNING *",
    [id]
  );
  return res.rows[0];
};

export const searchPerson = async (queryParams) => {
  const keys = Object.keys(queryParams);
  const values = Object.values(queryParams);

  // Build WHERE clause dynamically
  const whereClause = keys
    .map((key, idx) => `${key} ILIKE $${idx + 1}`)
    .join(" AND ");

  // Construct SQL query
  const query = `
    SELECT * 
    FROM Person 
    ${whereClause ? `WHERE ${whereClause}` : ""}
  `;

  // Execute query
  const res = await pool.query(
    query,
    values.map((value) => `%${value}%`)
  );
  return res.rows;
};
