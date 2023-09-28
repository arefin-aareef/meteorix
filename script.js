const apiKey = "945d5602f479313cc6b738ba6ab39c77";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const toggleButton = document.querySelector(".toggle");

let isCelsius = true;
let isUserLocation = false;

async function getWeatherByLocation() {
  try {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const response = await fetch(
        `${apiUrl}&lat=${latitude}&lon=${longitude}&appid=${apiKey}`
      );

      if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
      } else {
        var data = await response.json();
        console.log(data);
        document.querySelector(".city").innerHTML = data.name;

        if (isCelsius) {
          document.querySelector(".temp").innerHTML =
            Math.round(data.main.temp) + "°C";
        } else {
          const tempFahrenheit = (data.main.temp * 9) / 5 + 32;
          document.querySelector(".temp").innerHTML =
            Math.round(tempFahrenheit) + "°F";
        }

        document.querySelector(".humidity").innerHTML =
          data.main.humidity + " %";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main == "Clouds") {
          weatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
          weatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main == "Rain") {
          weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
          weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
          weatherIcon.src = "images/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

        if (isUserLocation) {
            alert(`Current location: ${data.name}`);
            isUserLocation = false;
          }
      }
    });
  } catch (error) {
    console.error("Error getting user location:", error);
  }
}

async function getWeatherByCity(city) {
  try {
    const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);

    if (response.status == 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      var data = await response.json();
      console.log(data);
      document.querySelector(".city").innerHTML = data.name;

      if (isCelsius) {
        document.querySelector(".temp").innerHTML =
          Math.round(data.main.temp) + "°C";
      } else {
        const tempFahrenheit = (data.main.temp * 9) / 5 + 32;
        document.querySelector(".temp").innerHTML =
          Math.round(tempFahrenheit) + "°F";
      }

      document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
      document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

      if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png";
      } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png";
      } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
      } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
      } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png";
      }

      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

isUserLocation = true; 
getWeatherByLocation();

searchButton.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) {
    getWeatherByCity(city);
  }
});

toggleButton.addEventListener("click", () => {
  isCelsius = !isCelsius;

  const city = searchBox.value.trim();
  if (city) {
    getWeatherByCity(city);
  } else {
    getWeatherByLocation();
  }
});
