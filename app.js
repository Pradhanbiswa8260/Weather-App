document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "49502aa3575f4b5bf7c6183988e2588e";

  const weatherDataEle = document.querySelector(".weather-data");
  const cityNameEle = document.querySelector("#city-name");
  const formEle = document.querySelector("form");
  const imgIcon = document.querySelector(".icon");

  formEle.addEventListener("submit", (e) => {
    e.preventDefault();
    const cityValue = cityNameEle.value;
    getWeatherData(cityValue);
  });

  async function getWeatherData(cityValue) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found!");
      }
      const data = await response.json();
      console.log(data.weather[0].description);

      const temprature = Math.floor(data.main.temp);
      const description = data.weather[0].description;
      const icon = data.weather[0].icon;

      const details = [
        `Feels like:${Math.floor(data.main.feels_like)}°C`,
        `Humidity:${data.main.humidity}%`,
        `Wind Speed:${data.wind.speed} m/s`,
      ]

      weatherDataEle.querySelector(".temp").textContent = `${temprature}°C`;

      weatherDataEle.querySelector(".desc").textContent = `${description}`;

        imgIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="">`;

        weatherDataEle.querySelector(".details").innerHTML = details.map((detail) => {
           return `<div>${detail}</div>`;
        }).join("");

    } catch (error) {
       weatherDataEle.querySelector(".temp").textContent = "";
        imgIcon.innerHTML = "";
       weatherDataEle.querySelector(".desc").textContent = "An Error Occurred!";
    }
  }
});


//End

