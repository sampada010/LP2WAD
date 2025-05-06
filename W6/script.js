
    // Toppers data (normally this would be in a separate JSON file)
    const toppersData = [
      {
        year: "2024",
        name: "Aditya Sharma",
        department: "Computer Engineering",
        percentage: "98.75%",
        photo: "/api/placeholder/300/300"
      },
      {
        year: "2023",
        name: "Priya Patel",
        department: "Information Technology",
        percentage: "97.80%",
        photo: "/api/placeholder/300/300"
      },
      {
        year: "2022",
        name: "Rahul Kumar",
        department: "Computer Engineering",
        percentage: "97.50%",
        photo: "/api/placeholder/300/300"
      },
      {
        year: "2021",
        name: "Neha Deshmukh",
        department: "Information Technology",
        percentage: "96.90%",
        photo: "/api/placeholder/300/300"
      },
      {
        year: "2020",
        name: "Siddharth Joshi",
        department: "Computer Engineering",
        percentage: "95.75%",
        photo: "/api/placeholder/300/300"
      },
      {
        year: "2019",
        name: "Anjali Mahajan",
        department: "Information Technology",
        percentage: "96.20%",
        photo: "/api/placeholder/300/300"
      }
    ];

    // Function to create and display topper cards
    function displayToppers() {
      const toppersContainer = document.getElementById('toppers-container');
      
      toppersData.forEach(topper => {
        const card = document.createElement('div');
        card.className = 'col-12 col-sm-6 col-md-4';
        
        card.innerHTML = `
          <div class="card">
            <img src="${topper.photo}" class="profile-img" alt="${topper.name}">
            <div class="card-body">
              <h5 class="card-title">${topper.year} Topper</h5>
              <h6 class="card-subtitle mb-2 text-muted">${topper.name}</h6>
              <p class="card-text">Department: ${topper.department}</p>
              <p class="card-text">Percentage: ${topper.percentage}</p>
            </div>
          </div>
        `;
        
        toppersContainer.appendChild(card);
      });
    }

    // Call the function when the page loads
    window.onload = displayToppers;
