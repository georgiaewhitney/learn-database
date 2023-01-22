const db = require("../database/db.js");

const insert_task = db.prepare(`INSERT INTO tasks (content) 
VALUES (?) 
RETURNING id, content, created_at`);

function createTask(content) {
  return insert_task.get(content);
}
/*
Prepared statement created outside of the function so that it can be reused every time the function is called - faster than recreating it each time we create a task
*/

/* 
using get method since we expect single value 
calling, we should receive inserted task object
*/

createTask("Eat a banana");
createTask("Try to learn SQLite");
const tasks = db.prepare("SELECT * FROM tasks").all();
console.log(tasks);

const result = createTask("Send mum flowers");
console.log(result);

module.exports = { createTask };
