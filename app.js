const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

let tasks = [];

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.set("views", "./views");

app.use(express.static("public"));
// Serve static files from the public directory

// Render the main view with tasks
app.get("/", (req, res) => {
  res.render("index", { tasks });
});

// Add a new task
app.post("/add", (req, res) => {
  const task = req.body.task;
  if (task) {
    tasks.push({ id: tasks.length + 1, task: task });
  }
  res.render("partials/task_list", { tasks });
});

// Delete a task
app.post("/delete/:taskId", (req, res) => {
  const taskId = parseInt(req.params.taskId, 10);
  tasks = tasks.filter((task) => task.id !== taskId);
  res.render("partials/task_list", { tasks });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
