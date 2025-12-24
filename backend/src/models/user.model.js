const pool = require("../config/db");

const selectAllUsers = async () => {
  const selectQuery = `SELECT * FROM users`;
  try {
    const result = await pool(selectQuery);
    return result.rows;
  } catch (err) {
    console.error("Select all users model failed");
    throw err;
  }
};

const selectUserById = async (userId) => {
  const selectQuery = `SELECT id, name, email, role FROM USERS WHERE id = $1`;
  try {
    const result = await pool.query(selectQuery, [userId]);
    return result.rows[0];
  } catch (err) {
    console.error("Select user by id failed");
    throw err;
  }
};

const selectUserByEmail = async (userEmail) => {
  const selectQuery = `SELECT id, name, email, role FROM USERS WHERE email = $1`;
  try {
    const result = await pool.query(selectQuery, [userEmail]);
    return result.rows[0];
  } catch (err) {
    console.error("Select user by id failed");
    throw err;
  }
};

const insertUser = async (name, email, role, password) => {
  const insertQuery = `INSERT users (name, email, role, password)
                      VALUES ($1, $2, $3, $4)
                      RETURNING id, name, email, role`;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query(insertQuery, [
      name,
      email,
      role,
      password,
    ]);
    await client.query("COMMIT");
    return result.rows[0];
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Insert user model failed");
    throw err;
  } finally {
    client.release();
  }
};

const updateUser = async (userId, payload) => {
  const columns = {
    name: "name",
    email: "email",
    role: "role",
    password: "password",
  };
  const fields = [];
  const values = [];
  let index = 1;

  for (const [key, column] of Object.entries(columns)) {
    if (payload[key] !== undefined) {
      fields.push(`${column} = $${index}`);
      values.push(payload[key]);
    }
  }
  values.push(userId);
  const updateQuery = `UPDATE users
                      SET ${fields.join(", ")}
                      WHERE id = $${index}
                      RETURNING id, name, email, role`;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query(updateQuery, values);
    await client.query("COMMIT");
    return result.rows[0];
  } catch (err) {
    await client.query("ROLLBACK");
  } finally {
    client.release();
  }
};

const deleteUser = async (userId) => {
  const deleteQuery = `DELETE FROM users WHERE id = $1`;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query(deleteQuery, [userId]);
    await client.query("COMMIT");
    return result.rows[0];
  } catch (err) {
    await client.query("ROLLBACK");
  } finally {
    client.release();
  }
};

module.exports = {
  selectAllUsers,
  selectUserById,
  selectUserByEmail,
  insertUser,
  updateUser,
  deleteUser,
};
