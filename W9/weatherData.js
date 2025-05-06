// Local repository of weather data for Indian metro cities
const weatherData = {
    "mumbai": {
        name: "Mumbai",
        temperature: 32,
        humidity: 80,
        condition: "rainy",
        windSpeed: 9
    },
    "delhi": {
        name: "Delhi",
        temperature: 38,
        humidity: 45,
        condition: "sunny",
        windSpeed: 12
    },
    "bangalore": {
        name: "Bangalore",
        temperature: 26,
        humidity: 65,
        condition: "cloudy",
        windSpeed: 8
    },
    "hyderabad": {
        name: "Hyderabad",
        temperature: 33,
        humidity: 60,
        condition: "sunny",
        windSpeed: 11
    },
    "chennai": {
        name: "Chennai",
        temperature: 35,
        humidity: 75,
        condition: "cloudy",
        windSpeed: 14
    },
    "kolkata": {
        name: "Kolkata",
        temperature: 34,
        humidity: 78,
        condition: "rainy",
        windSpeed: 10
    },
    "ahmedabad": {
        name: "Ahmedabad",
        temperature: 36,
        humidity: 50,
        condition: "sunny",
        windSpeed: 9
    },
    "pune": {
        name: "Pune",
        temperature: 30,
        humidity: 65,
        condition: "cloudy",
        windSpeed: 7
    },
    "jaipur": {
        name: "Jaipur",
        temperature: 37,
        humidity: 40,
        condition: "sunny",
        windSpeed: 13
    },
    "lucknow": {
        name: "Lucknow",
        temperature: 36,
        humidity: 48,
        condition: "sunny",
        windSpeed: 8
    },
    "kochi": {
        name: "Kochi",
        temperature: 31,
        humidity: 85,
        condition: "rainy",
        windSpeed: 12
    },
    "chandigarh": {
        name: "Chandigarh",
        temperature: 34,
        humidity: 55,
        condition: "cloudy",
        windSpeed: 9
    },
    "indore": {
        name: "Indore",
        temperature: 33,
        humidity: 45,
        condition: "sunny",
        windSpeed: 8
    },
    "nagpur": {
        name: "Nagpur",
        temperature: 35,
        humidity: 50,
        condition: "sunny",
        windSpeed: 10
    },
    "surat": {
        name: "Surat",
        temperature: 34,
        humidity: 65,
        condition: "cloudy",
        windSpeed: 9
    },
    "bhopal": {
        name: "Bhopal",
        temperature: 34,
        humidity: 48,
        condition: "sunny",
        windSpeed: 11
    },
    "vizag": {
        name: "Vizag",
        temperature: 32,
        humidity: 75,
        condition: "rainy",
        windSpeed: 15
    },
    "guwahati": {
        name: "Guwahati",
        temperature: 29,
        humidity: 82,
        condition: "rainy",
        windSpeed: 8
    },
    "bhubaneswar": {
        name: "Bhubaneswar",
        temperature: 33,
        humidity: 70,
        condition: "cloudy",
        windSpeed: 12
    },
    "thiruvananthapuram": {
        name: "Thiruvananthapuram",
        temperature: 30,
        humidity: 88,
        condition: "rainy",
        windSpeed: 10
    }
};

// Make it accessible to other scripts
window.weatherData = weatherData;