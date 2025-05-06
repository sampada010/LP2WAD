document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/users')
      .then(response => response.json())
      .then(users => {
        const loading = document.querySelector('.loading');
        const table = document.getElementById('userTable');
        const tbody = table.querySelector('tbody');
  
        // Hide the loading text
        loading.style.display = 'none';
        
        // Show the table
        table.style.display = 'table';
  
        // Populate the table with user data
        users.forEach(user => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
          `;
          tbody.appendChild(row);
        });
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  });
  