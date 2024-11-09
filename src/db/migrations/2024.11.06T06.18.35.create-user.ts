import { Migration } from "../scripts/dbMigrate";

export const up: Migration = async (params) => {
  params.context.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(80) NOT NULL,
      CHECK (char_length(name) > 0),
      email VARCHAR(150) UNIQUE NOT NULL,
      CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
      password VARCHAR(255) NOT NULL DEFAULT 'codeable',
      age INTEGER,
      CHECK (age > 0),
      role VARCHAR(50) DEFAULT 'user',
      CHECK (role IN ('admin', 'user')) 
 );
  `);
};
export const down: Migration = async (params) => {
  params.context.query(`DROP TABLE IF EXISTS users`);
};
