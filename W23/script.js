document.addEventListener('DOMContentLoaded', function() {
    // Get all tab elements
    const tabs = document.querySelectorAll('.nav-tab');
    
    // Add click event listener to each tab
    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Hide all content sections
        const containers = document.querySelectorAll('.club-container');
        containers.forEach(c => c.classList.remove('active'));
        
        // Show the selected content section
        const targetId = this.getAttribute('data-tab');
        document.getElementById(targetId).classList.add('active');
      });
    });
  });
  