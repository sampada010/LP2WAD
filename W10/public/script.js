function fetchTasks() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:3001/tasks", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const tasks = JSON.parse(xhr.responseText);
      displayTasks(tasks);
    }
  };
  xhr.send();
}

function displayTasks(tasks) {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span id="task-${index}">${task}</span>
      <div class="task-buttons">
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

function addTask() {
  const task = document.getElementById("taskInput").value.trim();
  if (task === "") return;

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3001/tasks", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      fetchTasks();
    }
  };
  xhr.send(JSON.stringify({ action: "add", task: task }));
  document.getElementById("taskInput").value = "";
}

function editTask(index) {
  const currentText = document.getElementById(`task-${index}`).innerText;
  const newText = prompt("Edit task:", currentText);
  if (newText !== null && newText.trim() !== "") {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3001/tasks", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = function () {
      if (xhr.status === 200) {
        fetchTasks();
      }
    };
    xhr.send(JSON.stringify({ action: "update", index: index, task: newText.trim() }));
  }
}

function deleteTask(index) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3001/tasks", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    if (xhr.status === 200) {
      fetchTasks();
    }
  };
  xhr.send(JSON.stringify({ action: "delete", index: index }));
}

window.onload = fetchTasks;
