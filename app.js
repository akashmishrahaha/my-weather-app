window.onload = () => {
  console.log("Listening");
  const svg1 = document.querySelectorAll("svg")[0];
  const svg2 = document.querySelectorAll("svg")[1];
  svg1.style.width = "2rem";
  svg2.style.width = "2rem";
  svg1.style.display = "none";
  svg2.style.display = "none";
  const submitButton = document.querySelector(".submit");
  submitButton.addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent form submission and page reload
    await submitPlace();
  });

  async function submitPlace() {
    const place = document.querySelector(".place").value;
    const timeArr = await getPlace(place);
    const currentTemp = parseInt(timeArr[0]);
    const newSunrise = parseInt(timeArr[1]);
    const newSunset = parseInt(timeArr[2]);
    const displaySpace = document.getElementById("displaySpace");
    if (currentTemp > 30) {
      displaySpace.innerHTML = currentTemp + " °C";
      svg1.style.display = "inline-block";
      displaySpace.innerHTML += svg1.outerHTML;
    } else if (currentTemp <= 30 && currentTemp > 10) {
      displaySpace.innerHTML = currentTemp + " °C";
      svg2.style.display = "inline-block";
      displaySpace.innerHTML += svg2.outerHTML;
    }
    console.log(newSunrise);
    // let Sunrise = document.createElement("p");
    // Sunrise.textContent = newSunrise;
    // displaySpace.appendChild(Sunrise);
  }

  async function getPlace(place) {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=ae8aef5f2d494665994175222230408&q=${place}&aqi=yes`
      );
      const finalR = await response.json();
      const sunrise = finalR.current.sunrise;
      const sunset = finalR.current.sunset;
      let timeArr = [finalR.current.temp_c, sunrise, sunset];
      return timeArr;
    } catch (error) {
      console.error("Error fetching data:", error);
      return "Error fetching data";
    }
  }
};
