
const { Pool } = require("pg");

const pool = new Pool({
    connectionString: "postgres://postgres:Azizjon.0107@localhost:5432/blogy"
});

const pg = async (SQL, ...values) => {
  const client = await pool.connect();

  try {
    const { rows } = await client.query(SQL, values.length ? values : null);

    return rows;
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
};

module.exports = pg;
