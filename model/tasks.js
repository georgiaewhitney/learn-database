const db = require("../database/db.js");

const insert_task = db.prepare(
  /*sql*/
  `
  INSERT INTO tasks (content, complete)
  VALUES ($content, $complete)
  RETURNING id, content, created_at
`
);

const select_tasks = db.prepare(/*sql*/ `
  SELECT
    id,
    content,
    TIME(created_at) AS created_at,
    complete
  FROM tasks
`);

const delete_task = db.prepare(/*sql*/ `
  DELETE FROM tasks WHERE id = ?
`);

function createTask(task) {
  return insert_task.get(task);
}

function listTasks() {
  return select_tasks.all();
}

function removeTask(id) {
  delete_task.run(id);
}

/*
Prepared statement created outside of the function so that it can be reused every time the function is called - faster than recreating it each time we create a task
*/

/* 
using get method since we expect single value 
calling, we should receive inserted task object
*/
/*
createTask("Eat a banana");
createTask("Try to learn SQLite");
const tasks = db.prepare("SELECT * FROM tasks").all();
console.log(tasks);

const result = createTask("Send mum flowers");
console.log(result);
*/

createTask({ content: "stuff", complete: 1 });

createTask({ content: "Eat a banana", complete: 0 });

console.log(listTasks());
console.log(createTask({ content: "Eat an apple", complete: 0 }));

removeTask(1);
console.log(listTasks());

module.exports = { createTask, listTasks, removeTask };
