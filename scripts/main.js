import getCocktail from './cocktail-api.js'

const weatherDataElement = document.querySelector(".weather-info");
const locationFormElement = document.querySelector(".location-form");
const cocktailReferralElement = document.querySelector(".cocktail-referral__button");
const cocktailElement = document.querySelector(".cocktail-referral__info");

let cocktailWeatherName = "";

locationFormElement.addEventListener("submit", function (event) {
    event.preventDefault();
    const cityName = event.target.cityName.value;

    async function fetchWeather() {
        const apiKey = '4d59c0ab4bd0c31a8f44c4d80db80407';

        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
            const data = response.data;

            displayWeather(data);
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('weatherData').textContent = 'Error!. Please try again later.';
        }
    }

    function displayWeather(data) {

        cocktailWeatherName = data.weather[0].description;

        weatherDataElement.innerHTML = `
          <h2>Weather in ${data.name}</h2>
          <p>Temperature: ${data.main.temp} °C</p>
          <p>Description: ${cocktailWeatherName}</p>
          <p>Humidity: ${data.main.humidity}%</p>
          <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    }

    fetchWeather();

    event.target.reset();
});

async function displayCocktail() {
    cocktailElement.innerText = "";
    const cocktail = await getCocktail();

    const cocktailName = document.createElement('p');
    cocktailName.classList.add(".cocktail-referral__name");
    cocktailName.innerText = `${cocktailWeatherName} ${cocktail.cocktailName}`.toUpperCase();

    const cocktailPicture = document.createElement('img');
    cocktailPicture.classList.add(".cocktail-referral__picture");
    cocktailPicture.src = cocktail.cocktailImg;

    cocktailElement.appendChild(cocktailName);
    cocktailElement.appendChild(cocktailPicture);
}

cocktailReferralElement.addEventListener("click", displayCocktail)

//display cocktail at page load
displayCocktail();