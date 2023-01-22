const express = require("express");

const server = express();

const model = require("../model/tasks.js");

server.get("/", (require, response) => {
  const tasks = model.listTasks();
  const list = tasks.map(Task);
  const body = /*html*/ `
  <!doctype html>
    <form method="POST">
      <input id="content" name="content" aria-label="New task" required>
      <button>Add task +</button>
    </form>
    <ul>${list.join("")}</ul>
  `;
  response.send(body);
});

server.post(
  "/",
  express.urlencoded({ extended: false }),
  (require, response) => {
    const task = {
      content: require.body.content,
      complete: 0,
    };
    model.createTask(task);
    response.redirect("/");
  }
);

server.post(
  "/update",
  express.urlencoded({ extended: false }),
  (require, response) => {
    const { action, id } = require.body;
    if (action === "remove") model.removeTask(id);
    if (action === "toggle") model.toggleTask(id);
    response.redirect("/");
  }
);

function Task(task) {
  return /*html*/ `
    <li>
      <form method="POST" action="/update">
        <input type="hidden" name="id" value="${task.id}">
        <button name="action" value="toggle" aria-label="Toggle complete">
          ${task.complete ? "☑︎" : "☐"}
        </button>
        <span style="${task.complete ? "text-decoration: line-through" : ""}">
          ${task.content}
        </span>
        <button name="action" value="remove">&times;</button>
      </form>
    </li>
  `;
}

module.exports = server;
