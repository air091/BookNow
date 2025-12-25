const pool = require("../config/db");

const selectAllServicesByUser = async (userId) => {
  const selectQuery = `SELECT * FROM services WHERE created_by = $1`;
  try {
    const result = await pool.query(selectQuery, [userId]);
    return result.rows;
  } catch (err) {
    console.error(`Select all services by user failed ${err}`);
  }
};

const insertServiceByUser = async (name, description, createdBy) => {
  const insertQuery = `INSERT INTO services (name, description, created_by)
                      VALUES ($1, $2, $3)
                      RETURNING *`;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query(insertQuery, [
      name,
      description,
      createdBy,
    ]);
    await client.query("COMMIT");
    return result.rows[0];
  } catch (err) {
    await client.query("ROLLBACK");
  } finally {
    client.release();
  }
};

const updateService = async (name, description) => {};

module.exports = { selectAllServicesByUser, insertServiceByUser };
