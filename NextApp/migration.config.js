require("dotenv").config();

module.exports = {
  migrationsTable: "pgmigrations", // where migration history is stored
  dir: "migrations",               // folder where migration files live
  db: {
    connectionString: process.env.DATABASE_URL, // Neon DB URL
    ssl: { rejectUnauthorized: false },         // required for Neon
  },
};
console.log("DB_URL:", process.env.DATABASE_URL)

