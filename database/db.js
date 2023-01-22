const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const Database = require("better-sqlite3");
// this library exports a constructor function that creates a new SQLite database and returns a JS object with methods for talking to that db

const db = new Database(process.env.DB_FILE);
console.log(db);

/*
- if we don't set DB_FILE env var creates an in-memory temp database
- otherwise connect to the db contained in the file we specified (if existing)
- if it doesn't exist create a new db file and connect to it
*/

const schemaPath = join("database", "schema.sql");
const schema = readFileSync(schemaPath, "utf-8");
db.exec(schema);

/*
- make sure db has the right structure by running schema.sql
- this is responsible for creating the tables and columns needed
- it should be safe to run every time 
*/

/*
const select_date = db.prepare("SELECT DATE()");
const result = select_date.get();
console.log(result);
// { 'DATE()': '2023-01-22' }
*/

const select_table = db.prepare("SELECT name FROM sqlite_schema");
const result = select_table.all();
console.log(result);

module.exports = db;
/*
export the db for use in other files
*/
