import { getCitySuggestions } from './search.js';

// Fetch weather data when the button is clicked
document.getElementById("getWeather").addEventListener("click", () => {
    const city = document.getElementById("cityInput").value.trim();

    if (!city) {
        document.getElementById("weatherResult").innerHTML = `<p>Please enter a city.</p>`;
        return;
    }

    fetch(`/api/weather?city=${city}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById("weatherResult").innerHTML = `<p>Error: ${data.error}</p>`;
            } else {
                document.getElementById("weatherResult").innerHTML = `
                    <h2>${data.name}, ${data.sys.country}</h2>
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>Weather: ${data.weather[0].description}</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Wind Speed: ${data.wind.speed} m/s</p>
                `;
            }
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            document.getElementById("weatherResult").innerHTML = `<p>Failed to fetch data. Try again.</p>`;
        });
});

// Handle input for city search suggestions
document.getElementById("cityInput").addEventListener("input", async () => {
    const query = document.getElementById("cityInput").value.trim().toLowerCase();
    if (query.length < 2) {
        document.getElementById("suggestions").innerHTML = '';
        return;
    }

    const suggestions = await getCitySuggestions(query);
    updateSuggestions(suggestions);
});

// Update the suggestion list
function updateSuggestions(suggestions) {
    const suggestionsList = document.getElementById("suggestions");
    suggestionsList.innerHTML = "";
    suggestions.forEach(suggestion => {
        const li = document.createElement("li");
        li.textContent = suggestion;
        li.addEventListener("click", () => {
            document.getElementById("cityInput").value = suggestion;
            fetchWeather(suggestion);
        });
        suggestionsList.appendChild(li);
    });
}

// Fetch weather data when a city is selected from suggestions
function fetchWeather(city) {
    fetch(`/api/weather?city=${city}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById("weatherResult").innerHTML = `<p>Error: ${data.error}</p>`;
            } else {
                document.getElementById("weatherResult").innerHTML = `
                    <h2>${data.name}, ${data.sys.country}</h2>
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>Weather: ${data.weather[0].description}</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Wind Speed: ${data.wind.speed} m/s</p>
                `;
            }
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            document.getElementById("weatherResult").innerHTML = `<p>Failed to fetch data. Try again.</p>`;
        });
}
