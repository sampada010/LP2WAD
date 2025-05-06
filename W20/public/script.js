const API_URL = 'http://localhost:3001';

let editingId = null;

document.addEventListener('DOMContentLoaded', () => {
    loadEmployees();

    const form = document.getElementById('employeeForm');
    const cancelBtn = document.getElementById('cancelEdit');
    const submitBtn = document.getElementById('submitBtn');

    form?.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = {
            name: form.name.value,
            department: form.department.value,
            designation: form.designation.value,
            salary: form.salary.value,
            joiningdate: form.joiningdate.value
        };

        try {
            if (editingId) {
                await fetch(`${API_URL}/update/${editingId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
            } else {
                await fetch(`${API_URL}/create`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
            }

            form.reset();
            editingId = null;
            submitBtn.textContent = 'Add Employee';
            cancelBtn.style.display = 'none';
            loadEmployees();
        } catch (err) {
            alert('Error saving employee');
        }
    });

    cancelBtn.addEventListener('click', () => {
        form.reset();
        editingId = null;
        submitBtn.textContent = 'Add Employee';
        cancelBtn.style.display = 'none';
    });
});

async function loadEmployees() {
    const tbody = document.querySelector('#employeeTable tbody');
    if (!tbody) return;

    tbody.innerHTML = '';

    try {
        const res = await fetch(`${API_URL}/employees`);
        const employees = await res.json();

        if (employees.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6">No employees found</td></tr>';
            return;
        }

        employees.forEach(emp => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${emp.name}</td>
                <td>${emp.department}</td>
                <td>${emp.designation}</td>
                <td>${emp.salary}</td>
                <td>${emp.joiningdate}</td>
                <td>
                    <button onclick="editEmployee('${emp._id}')">Edit</button>
                    <button onclick="deleteEmployee('${emp._id}')">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (err) {
        alert('Error loading employees');
    }
}

async function deleteEmployee(id) {
    if (!confirm('Delete this employee?')) return;
    try {
        await fetch(`${API_URL}/delete/${id}`, { method: 'DELETE' });
        loadEmployees();
    } catch (err) {
        alert('Error deleting employee');
    }
}

async function editEmployee(id) {
    try {
        const res = await fetch(`${API_URL}/employees`);
        const employees = await res.json();
        const emp = employees.find(e => e._id === id);
        if (!emp) return alert('Employee not found');

        const form = document.getElementById('employeeForm');
        form.name.value = emp.name;
        form.department.value = emp.department;
        form.designation.value = emp.designation;
        form.salary.value = emp.salary;
        form.joiningdate.value = emp.joiningdate;

        editingId = id;
        document.getElementById('submitBtn').textContent = 'Update Employee';
        document.getElementById('cancelEdit').style.display = 'inline-block';
    } catch (err) {
        alert('Error editing employee');
    }
}
