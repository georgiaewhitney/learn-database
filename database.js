const Database = require("better-sqlite3");
// this library exports a constructor function that creates a new SQLite database and returns a JS object with methods for talking to that db

const db = new Database();
console.log(db);
