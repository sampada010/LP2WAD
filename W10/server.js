const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3001;

let tasks = [];

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public'

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { action, task, index } = req.body;

  if (action === "add") {
    tasks.push(task);
  } else if (action === "update" && index >= 0) {
    tasks[index] = task;
  } else if (action === "delete" && index >= 0) {
    tasks.splice(index, 1);
  }

  res.json(tasks);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
