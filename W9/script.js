document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const cityName = document.getElementById('city-name');
    const temp = document.getElementById('temp');
    const condition = document.getElementById('condition');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');
    const weatherIcon = document.getElementById('weather-icon');
    const weatherInfo = document.getElementById('weather-info');
    const errorMessage = document.getElementById('error-message');

    // Event listener for search button
    searchBtn.addEventListener('click', fetchWeatherData);

    // Event listener for Enter key in the input field
    cityInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            fetchWeatherData();
        }
    });

    // Function to fetch weather data using AJAX
    function fetchWeatherData() {
        // Get the city name from input and convert to lowercase
        const city = cityInput.value.trim().toLowerCase();
        
        // Create a new XMLHttpRequest object
        const xhr = new XMLHttpRequest();
        
        // Instead, we'll use a timeout to simulate network request
        xhr.onreadystatechange = function() {
            // Check if the request is complete and successful
            if (this.readyState === 4) {
                // Hide any error message that might be showing
                errorMessage.style.display = 'none';
                
                // Simulate a successful response by checking our local data
                if (weatherData[city]) {
                    const data = weatherData[city];
                    
                    // Update the UI with weather data
                    cityName.textContent = data.name;
                    temp.textContent = data.temperature;
                    condition.textContent = data.condition;
                    humidity.textContent = data.humidity;
                    windSpeed.textContent = data.windSpeed;
                    
                    // Set the appropriate weather icon
                    weatherIcon.className = 'weather-icon';
                    weatherIcon.classList.add(data.condition);
                    
                    // Show the weather info panel
                    weatherInfo.style.display = 'block';
                } else {
                    // City not found in our data, show error message
                    weatherInfo.style.display = 'none';
                    errorMessage.style.display = 'block';
                }
            }
        };
        
        // Begin the simulated AJAX request
        xhr.open('GET', 'simulated-weather-api-endpoint', true);
        xhr.send();
    }
});