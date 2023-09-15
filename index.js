const apiKey = "76be7e38f753474ebf414147231109";
const apiUrl = "http://api.weatherapi.com/v1";

// Search location function
function searchLocation() {
  const searchTerm = document.getElementById("Location").value;

  fetch(`${apiUrl}/forecast.json?key=${apiKey}&q=${searchTerm}&days=1`)
    .then((response) => response.json())
    .then((data) => {
      const weatherDataElement = document.getElementById("currentWeather");

      // Gets the information for currentWeather
      const today = data.forecast.forecastday[0].day;

      weatherDataElement.innerHTML = `
      <h2 class="countryName">${data.location.name}, ${data.location.country}</h2>
      <h3 class="countryTime">${data.location.localtime}</h3>
      <div class="weatherInfo">
        <div class="weatherInfoPanel">
          <p class="info">Average Temp: ${today.avgtemp_c}</p>
        </div>
        <div class="weatherInfoPanel">
          <div class="stack">
            <p class="info">H: ${today.maxtemp_c}°C</p> 
            <p class="info">L: ${today.mintemp_c}°C</p>
          </div>
          <div class="stack">
            <p class="info">
              <img src="../assets/wind-solid.svg" alt="SVG Image">
              Wind: ${data.current.wind_kph}kph
            </p>
            <p class="info">
              <img src="../assets/droplet-solid .svg" alt="SVG Image">
              Humidity: ${data.current.humidity}%
            </p>
          </div>
          
        </div>
    </div>
  `;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function populateGraph() {
  const searchTerm = document.getElementById("Location").value;
  fetch(`${apiUrl}/forecast.json?key=${apiKey}&q=${searchTerm}&days=1`)
    .then((response) => response.json())
    .then((data) => {
      const xValues = [];
      const yValues = [];

      const hourlyForecast = data.forecast.forecastday[0].hour;

      // Loop through each hourly forecast
      hourlyForecast.forEach((hourData) => {
        // Access the time for each hour
        const time = hourData.time;
        const justHours = time.split(" ")[1];
        // Do something with the time, e.g., add it to xValues array
        xValues.push(justHours);

        // Access other data for the hour, e.g., temperature, and add it to yValues array
        const temperature = hourData.temp_c;
        yValues.push(temperature);
      });
      drawGraph(xValues, yValues);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

function drawGraph(xValues, yValues) {
  new Chart(myChart, {
    type: "line",
    data: {
      labels: xValues,
      datasets: [
        {
          label: "Temperature (°C)",
          data: yValues,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "category",
          title: {
            display: true,
            text: "Time",
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Temperature (°C)",
          },
        },
      },
    },
  });
}
