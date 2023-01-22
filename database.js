const Database = require("better-sqlite3");
// this library exports a constructor function that creates a new SQLite database and returns a JS object with methods for talking to that db

const db = new Database(process.env.DB_FILE);
console.log(db);

const select_date = db.prepare("SELECT DATE()");
const result = select_date.get();
console.log(result);
// { 'DATE()': '2023-01-22' }



