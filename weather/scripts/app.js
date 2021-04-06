const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector(".time");
const icon = document.querySelector(".icon img");


function updateUI(data) {
    const { cityDets, weather } = data;

    //for day and night image

    let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";
    time.setAttribute("src", timeSrc);

    // for icons

    let iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute("src", iconSrc);

    //for all the text

    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>`;

    if (card.classList.contains("d-none")) {
        card.classList.remove("d-none")
    }

};

const updateCity = async (city) => {
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);
    return { cityDets, weather };
};


//event listener
cityForm.addEventListener("submit", e => {
    e.preventDefault();
    card.classList.add("d-none");
    card.classList.remove("d-none");
    const city = cityForm.city.value.trim();
    cityForm.reset();
    localStorage.setItem("city", city);
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));


});

//local storage
if (localStorage.getItem("city")) {
    const cit = localStorage.getItem("city");
    updateCity(cit)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
};
