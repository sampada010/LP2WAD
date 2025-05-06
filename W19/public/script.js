const tableBody = document.querySelector("#studentsTable tbody");

document.getElementById("studentForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  for (let key in data) {
    if (key !== "Name" && key !== "Roll_No") {
      data[key] = parseInt(data[key]);
    }
  }
  await fetch("/api/students", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  e.target.reset();
  fetchStudents();
});

async function fetchStudents() {
  const res = await fetch("/api/students");
  const data = await res.json();
  renderTable(data);
  updateStudentCount(data.length);
}

function updateStudentCount(count) {
  document.getElementById("studentCount").innerText = `👥 Total Students: ${count}`;
}


function renderTable(data) {
  tableBody.innerHTML = "";
  data.forEach((student) => {
    const row = `
      <tr>
        <td>${student.Name}</td>
        <td>${student.Roll_No}</td>
        <td>${student.WAD_Marks}</td>
        <td>${student.DSBDA_Marks}</td>
        <td>${student.CNS_Marks}</td>
        <td>${student.CC_Marks}</td>
        <td>${student.AI_marks}</td>
      </tr>`;
    tableBody.innerHTML += row;
  });
}

async function filterDSBDA() {
  const res = await fetch("/api/dsbda-above-20");
  const data = await res.json();
  renderTable(data);
}

async function filterAllAbove25() {
  const res = await fetch("/api/all-above-25");
  const data = await res.json();
  renderTable(data);
}

async function filterWADCCBelow40() {
  const res = await fetch("/api/math-science-less-40");
  const data = await res.json();
  renderTable(data);
}

async function updateMarks() {
  const name = document.getElementById("updateName").value;
  if (!name) return alert("Please enter a name to update.");
  await fetch(`/api/students/${name}`, {
    method: "PUT"
  });
  document.getElementById("updateName").value = "";
  fetchStudents();
}

async function deleteStudent() {
  const name = document.getElementById("deleteName").value;
  if (!name) return alert("Enter a name to delete.");
  await fetch(`/api/students/${name}`, {
    method: "DELETE"
  });
  document.getElementById("deleteName").value = "";
  fetchStudents();
}


window.onload = fetchStudents;
