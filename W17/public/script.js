fetch('/api/employees')
  .then(response => response.json())
  .then(data => {
    const list = document.getElementById('employee-list');
    data.forEach(emp => {
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `
        <img src="${emp.image}" alt="${emp.name}">
        <h3>${emp.name}</h3>
        <p><strong>${emp.designation}</strong></p>
        <p>Dept: ${emp.department}</p>
        <p>Salary: ${emp.salary}</p>
      `;
      list.appendChild(div);
    });
  })
  .catch(err => {
    console.error('Error loading employees:', err);
  });
