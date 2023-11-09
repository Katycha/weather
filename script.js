const API_KEY = "9d039935f738c18f1c901c61a76d8afc";

const wrapper = document.getElementById("wrapper");
const loader = document.getElementById("loader");

wrapper.style.display = "none";
loader.style.display = "block";

async function getWeather() {
  const city = prompt("Введите город");

  const responseImage = await fetch(
    `https://api.teleport.org/api/urban_areas/slug:${city}/images/`
  );

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`
  );

  const result = await response.json();

  console.log("result:", result);

  const cityH2 = document.getElementById("city1");
  cityH2.innerHTML = `Город:  ${result.name}`;

  const temp = document.getElementById("temp");
  temp.innerHTML = `Температура: ${result.main.temp}`;
  console.log(temp);

  const feelsLike = document.getElementById("feelsLike");
  feelsLike.innerHTML = `Ощущается как: ${result.main.feels_like}`;

  /*const minTemp = document.getElementById("minTemp");
  minTemp.innerHTML = `Минимальная температура: ${result.main.temp_min}`;

  const maxTemp = document.getElementById("maxTemp");
  maxTemp.innerHTML = `Максимальная температура: ${result.main.temp_max}`;*/

  const description = document.getElementById("description");
  description.innerHTML = `Описание: ${result.weather[0].description}`;
}
async function getWeatherCurrentPosition(location) {
  console.log("location:", location);

  const { longitude, latitude } = location.coords;

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=ru`
  );

  const result = await response.json();
  wrapper.style.display = "block";
  loader.style.display = "none";
  console.log("result:", result);

  const cityH2 = document.getElementById("city1");
  cityH2.innerHTML = `Город:  ${result.name}`;

  const temp = document.getElementById("temp");
  temp.innerHTML = `Температура: ${result.main.temp}`;

  const feelsLike = document.getElementById("feelsLike");
  feelsLike.innerHTML = `Ощущается как: ${result.main.feels_like}`;

  /*const minTemp = document.getElementById("minTemp");
  minTemp.innerHTML = `Минимальная температура: ${result.main.temp_min}`;

  const maxTemp = document.getElementById("maxTemp");
  maxTemp.innerHTML = `Максимальная температура: ${result.main.temp_max}`;*/

  const description = document.getElementById("description");
  description.innerHTML = `Описание: ${result.weather[0].description}`;
}

async function errorPosition() {
  const city = "Toktogul";

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`
  );
  const result = await response.json();

  wrapper.style.display = "block";
  loader.style.display = "none";

  console.log("Город по умолчанию:", result);

  const city1 = document.getElementById("city1");
  city1.innerHTML = `Город: ${result.name}`;

  const temp = document.getElementById("temp");
  temp.innerHTML = `Температура: ${result.main.temp}`;

  const feelsLike = document.getElementById("feelsLike");
  feelsLike.innerHTML = `Ощущается как: ${result.main.feels_like}`;

  const description = document.getElementById("description");
  description.innerHTML = `Описание: ${result.weather[0].description}`;
}
navigator.geolocation.getCurrentPosition(
  getWeatherCurrentPosition,
  errorPosition
);
