const config = require("../config.js");

module.exports = {
  client: "pg",
  connection: config.db.connection,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "./",
  },
  seeds: {
    directory: "./seeds",
  },
};
