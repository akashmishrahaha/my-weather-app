window.onload = () => {
  console.log("Listening");
  let val = 2;
  const background = document.querySelector(".first-div");

  background.style.backgroundImage = 'url("/img/2.jpg")';
  background.style.backgroundPosition = "center";
  background.style.backgroundRepeat = "no-repeat";
  background.style.backgroundSize = "cover";

  const t = new Date();
  const h = t.getHours();
  const m = t.getMinutes();
  const s = t.getSeconds();
  const time = document.querySelector(".time");
  const day = document.querySelector(".day");
  const d = t.getDate();
  const month = t.getMonth() + 1;
  const year = t.getFullYear();
  const searchicon = document.querySelector(".search-icon");
  console.log(searchicon);
  searchicon.addEventListener("click", async (event) => {
    event.preventDefault();
    await submitData();
  });

  async function submitData() {
    const place = document.querySelector(".inputPlace");
    const placeValue = place.value;
    const placeinfo = document.querySelector(".placeinfo");
    placeinfo.textContent = placeValue;
    // Using tomorrow.io
    const apiKey = CONFIG.API_KEY;

    try {
      const response = await fetch(
        `https://api.tomorrow.io/v4/weather/forecast?location=${placeValue}&apikey=${apiKey}`
      );
      const finalResponse = await response.json();
      const temperature = finalResponse.timelines.hourly[0].values.temperature;
      const humidity = finalResponse.timelines.hourly[0].values.humidity;
      const visibility = finalResponse.timelines.hourly[0].values.visibility;
      const windSpeed = finalResponse.timelines.hourly[0].values.windSpeed;
      console.log(temperature);
      console.log(humidity);
      console.log(visibility);
      console.log(windSpeed);
      const tempt = document.querySelector(".temperature");
      tempt.textContent = temperature + "°C";
      const temperatureValue = document.querySelector(".tempvalue");
      temperatureValue.textContent = temperature + "°C";
      const humidityValue = document.querySelector(".humidityValue");
      humidityValue.textContent = humidity + "%";
      const visibilityValue = document.querySelector(".visibilityValue");
      visibilityValue.textContent = visibility + "mi";
      const windValue = document.querySelector(".windValue");
      windValue.textContent = windSpeed + "km/h ";
      const precipitationProbability =
        finalResponse.timelines.hourly[0].values.precipitationProbability;
      console.log(precipitationProbability);
      const rainIntensity =
        finalResponse.timelines.hourly[0].values.rainIntensity;
      console.log(rainIntensity);
      const weatherCode = finalResponse.timelines.hourly[0].values.weatherCode;
      console.log(weatherCode);
      const logotop = document.querySelector(".logotop");
      const aboutWeather = document.querySelector(".info");
      time.textContent = h + ":" + m + ":" + s;
      day.textContent = d + " " + month + " " + year;
      const inputPlace = document.querySelector(".inputPlace");

      // Style

      const secondDiv = document.querySelector(".second-div");
      const hr = document.querySelectorAll("hr");
      const isRaining = precipitationProbability > 50 || rainIntensity > 0;
      let season = "";
      if (isRaining) {
        season = "Raining";
        aboutWeather.textContent = season;
        logotop.src = "svg/raining.png";
        background.style.backgroundImage = 'url("/img/4.jpg")';
        background.style.backgroundPosition = "center";
        background.style.backgroundRepeat = "no-repeat";
        background.style.backgroundSize = "cover";
        inputPlace.style.borderBottomColor = "lightblue";
      }
      if (temperature < 0) {
        season = "Winter";
        aboutWeather.textContent = season;
        logotop.src = "svg/snowman.png";
        background.style.backgroundImage = 'url("/img/2.jpg")';
        background.style.backgroundPosition = "center";
        background.style.backgroundRepeat = "no-repeat";
        hr.forEach((hrs) => {
          hrs.style.color = "lightblue";
        });
        inputPlace.style.borderBottomColor = "lightblue";
        background.style.backgroundSize = "cover";
      } else if (temperature > 25) {
        season = "Summer";
        background.style.backgroundImage = 'url("/img/11.jpg")';
        background.style.backgroundPosition = "center";
        background.style.backgroundRepeat = "no-repeat";
        inputPlace.style.borderBottomColor = "yellow";
        background.style.backgroundSize = "cover";
        changeWinterStyle(secondDiv);
        hr.forEach((hrs) => {
          hrs.style.color = "yellow";
        });
        logotop.src = "svg/sun.png";
        aboutWeather.textContent = season;
      } else if (temperature >= 10 && temperature <= 20) {
        season = "Autumn";
        changeAutumnStyle(secondDiv);
        aboutWeather.textContent = season;
        background.style.backgroundImage = 'url("/img/3.jpg")';
        background.style.backgroundPosition = "center";
        background.style.backgroundRepeat = "no-repeat";
        background.style.backgroundSize = "cover";
      } else {
        season = "Other Season";
        changeAutumnStyle(secondDiv);
        aboutWeather.textContent = season;
      }

      // Placename and country
      const placename = document.querySelector(".placename");
      placename.textContent = placeValue;
      const country = document.querySelector(".country");
      console.log(finalResponse);
      const lat = finalResponse.location.lat;
      const lon = finalResponse.location.lon;
      country.textContent = lat + " " + lon;
    } catch (err) {
      console.log("Unable to fetch data");
    }
  }

  function changeSummerStyle(element) {
    const newStyles = `
                .second-div::before {
                content: "";
                    background: url("/img/summer.jpg");
                                    
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: cover;
                    filter: brightness(50%);
                }
            `;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = newStyles;
    document.head.appendChild(styleSheet);
  }
  function changeWinterStyle(element) {
    const newStyles = `
                .second-div::before {
                content: "";
                    background: url("/img/winter.jpg");
                                    
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: cover;
                    filter: brightness(50%);
                }
            `;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = newStyles;
    document.head.appendChild(styleSheet);
  }
};
