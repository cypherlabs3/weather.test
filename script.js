const apiKey = 'aaf61a86b0ce289cfeca4841bccccd84';  // Replace with your actual OpenWeather API key
const defaultCity = 'London';  // Default city

// Function to fetch weather data
async function getWeather(city) {
    console.log('Fetching weather for:', city);  // Log to check if the function is being called
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    console.log(data);  // Log the full data object

    if (data.cod === 200) {
        displayWeather(data);
    } else {
        alert('City not found!');
    }
}

// Function to display weather data
function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    
    // Get current time based on the city's timezone (data.timezone is in seconds)
    const timezoneOffset = data.timezone;
    const initialTime = new Date(Date.now() + timezoneOffset * 1000); // Adjust for timezone offset once

    // Function to update time every second
    function updateTime() {
        const localTime = new Date(initialTime.getTime() + (Date.now() - initialTime.getTime())); // Update time by adding the difference since the initial time
        const hours = localTime.getUTCHours();
        const minutes = localTime.getUTCMinutes();
        const seconds = localTime.getUTCSeconds();
        const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        
        const weatherHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
            <p>Current Time: ${formattedTime}</p>
        `;
        
        weatherInfo.innerHTML = weatherHTML;
    }

    // Update time every second (1000 ms = 1 second)
    setInterval(updateTime, 1000);

    // Initial time update
    updateTime();
}

// Fetch weather data for the default city
document.addEventListener('DOMContentLoaded', async () => {
    // Fetch weather data for the default city
    await getWeather(defaultCity);
});
