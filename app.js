function searchWeather() {
  const city = document.getElementById("city-input").value.trim();
  if (city === "") {
    alert("Please enter a city name.");
    return;
  }

  const apiKey = "b4d2185f07439b02e464024e7fd43657";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "404") {
        alert("City not found. Please enter a valid city name.");
        return;
      }

      // Display weather information on the webpage
      const temperatureCelsius = (data.main.temp - 273.15).toFixed(2);
      const weatherInfo = document.getElementById("weather-info");
      const currentDay = new Date().toLocaleDateString("en-US", {
        weekday: "long",
      });
      const currentDate = new Date().toLocaleDateString();
      const currentTime = new Date().toLocaleTimeString();
      weatherInfo.innerHTML = `
                <div class="header">
                <h1> Weather Overview
                    <h2> ${data.name}, ${data.sys.country}</h2>
                    <p> Day: ${currentDay}</p>
                    <p>Date: ${currentDate}</p>
                    <p>Time: ${currentTime}</p>
                </div>
                <div class="details">
                    <p>Temperature: ${temperatureCelsius}°C</p>
                    <p>Description: ${data.weather[0].description}</p>
                    <p>Wind Speed: ${data.wind.speed} m/s</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                </div>
            `;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}
