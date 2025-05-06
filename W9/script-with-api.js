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

    // OpenWeatherMap API key - replace with your own API key
    const apiKey = 'YOUR_API_KEY_HERE';

    // Event listener for search button
    searchBtn.addEventListener('click', fetchWeatherData);

    // Event listener for Enter key in the input field
    cityInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            fetchWeatherData();
        }
    });

    // Function to fetch weather data using AJAX with real API
    function fetchWeatherData() {
        // Get the city name from input
        const city = cityInput.value.trim();
        
        if (!city) {
            errorMessage.textContent = "Please enter a city name";
            errorMessage.style.display = 'block';
            weatherInfo.style.display = 'none';
            return;
        }
        
        // Create a new XMLHttpRequest object
        const xhr = new XMLHttpRequest();
        
        // API endpoint with the city and API key
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        
        xhr.onreadystatechange = function() {
            // Check if the request is complete
            if (this.readyState === 4) {
                // Hide any error message that might be showing
                errorMessage.style.display = 'none';
                
                // Check if response is successful
                if (this.status === 200) {
                    // Parse the JSON response
                    const data = JSON.parse(this.responseText);
                    
                    // Update the UI with weather data
                    cityName.textContent = data.name + ', ' + (data.sys.country || '');
                    temp.textContent = Math.round(data.main.temp);
                    condition.textContent = data.weather[0].description;
                    humidity.textContent = data.main.humidity;
                    windSpeed.textContent = Math.round(data.wind.speed * 3.6); // Convert m/s to km/h
                    
                    // Set the appropriate weather icon based on weather condition code
                    setWeatherIcon(data.weather[0].id);
                    
                    // Show the weather info panel
                    weatherInfo.style.display = 'block';
                } else {
                    // API returned an error, show error message
                    weatherInfo.style.display = 'none';
                    errorMessage.textContent = "City not found. Please try again.";
                    errorMessage.style.display = 'block';
                }
            }
        };
        
        // Begin the AJAX request
        xhr.open('GET', url, true);
        xhr.send();
    }
    
    // Function to set the weather icon based on OpenWeatherMap condition code
    function setWeatherIcon(weatherId) {
        weatherIcon.className = 'weather-icon';
        
        // Clear previous classes
        weatherIcon.classList.remove('sunny', 'cloudy', 'rainy', 'snowy');
        
        // Set the appropriate weather icon based on condition code
        // OpenWeatherMap condition codes: https://openweathermap.org/weather-conditions
        if (weatherId >= 200 && weatherId < 300) {
            // Thunderstorm
            weatherIcon.classList.add('rainy');
        } else if (weatherId >= 300 && weatherId < 400) {
            // Drizzle
            weatherIcon.classList.add('rainy');
        } else if (weatherId >= 500 && weatherId < 600) {
            // Rain
            weatherIcon.classList.add('rainy');
        } else if (weatherId >= 600 && weatherId < 700) {
            // Snow
            weatherIcon.classList.add('snowy');
        } else if (weatherId >= 700 && weatherId < 800) {
            // Atmosphere (fog, mist, etc)
            weatherIcon.classList.add('cloudy');
        } else if (weatherId === 800) {
            // Clear sky
            weatherIcon.classList.add('sunny');
        } else if (weatherId > 800) {
            // Clouds
            weatherIcon.classList.add('cloudy');
        }
    }
});