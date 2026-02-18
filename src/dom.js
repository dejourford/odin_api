// function to render the weather
export function renderWeather(dataToDisplay, unit = "C") {
    console.log(dataToDisplay)

    const images = {
        "sun": "../src/assets/images/sun.png",
        "clear": "../src/assets/images/sun.png",
        "cloud": "../src/assets/images/cloudy-day.png",
        "rain": "../src/assets/images/rain.png",
        "snow": "../src/assets/images/snowflake.png",
        "thunder": "../src/assets/images/storm.png"
    }

    function removeActiveClass() {
        const toggleButtons = document.querySelectorAll(".temperature-buttons button");
        toggleButtons.forEach((button) => {
            if (button.classList.contains("active")) {
                button.classList.remove("active");
            }
        })
    }

    // clear dom before appending new items
    const weatherContainer = document.querySelector(".weather-container");
    weatherContainer.innerHTML = ""


    // create weather card and append to the .weather-container
    const card = document.createElement("section");
    card.classList.add("card")

    // create card title using query name
    const cardTitle = document.createElement("h2")

    const city = dataToDisplay.address
    cardTitle.textContent = city.charAt(0).toUpperCase() + city.slice(1);

    // create card top
    const cardTop = document.createElement("div");
    cardTop.classList.add("card-top");

    // create forecast for top section
    const forecastList = document.createElement("ul");
    forecastList.classList.add("forecast")

    // create 7 forecast list items and append to forecast list
    for (let i = 0; i < 6; i++) {
        const forecastItem = document.createElement("li");
        forecastItem.classList.add("forecast-item");

        const forecastItemTitle = document.createElement("h2");

        const date = new Date(dataToDisplay.days[i].datetime + "T00:00");

        const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" });

        forecastItemTitle.textContent = dayOfWeek

        const forecastGroup = document.createElement("div");
        forecastGroup.classList.add("forecast-group");

        const img = document.createElement("img");
        const description =  `${dataToDisplay.days[i].description}`;
        console.log(images)
        
        Object.entries(images).forEach(([key, src]) => {
            if (description.toLowerCase().includes(`${key}`)) {
                console.log(src)
                img.src = `${src}`
            }
        })
        img.alt = description;

        const rawTemp = dataToDisplay.days[i].tempmax;
        const temperature = unit === "C" ? Math.round((rawTemp * 9) / 5 + 32) : Math.round(rawTemp);

        const temperatureText = document.createElement("p");
        temperatureText.textContent = `${temperature}°${unit}`;

        forecastGroup.append(img, temperatureText)
        forecastItem.append(forecastItemTitle, forecastGroup);


        forecastList.append(forecastItem)
    }

    // create card buttons container
    const cardButtonsContainer = document.createElement("div");
    cardButtonsContainer.classList.add("temperature-buttons");

    // create card buttons
    const farenheitButton = document.createElement("button");
    if (unit === "F") {
        farenheitButton.classList.add("active");
    }
    farenheitButton.id = "farenheit"
    farenheitButton.textContent = "F";
    farenheitButton.addEventListener("click", () => {
        if (unit === "F") return;
        removeActiveClass();
        renderWeather(dataToDisplay, "F")
    })


    const celsiusButton = document.createElement("button");
    if (unit === "C") {
        celsiusButton.classList.add("active");
    }
    celsiusButton.id = "celsius"
    celsiusButton.textContent = "C";
    celsiusButton.addEventListener("click", () => {
        if (unit === "C") return;
        removeActiveClass();
        renderWeather(dataToDisplay, "C")
    })

    cardButtonsContainer.append(farenheitButton, celsiusButton);

    cardTop.append(forecastList, cardButtonsContainer);

    // create card bottom
    const cardBottom = document.createElement("div");
    cardBottom.classList.add("card-bottom");

    // create images
    const cardImg = document.createElement("img")
    
    Object.entries(images).forEach(([key, src]) => {
            if (dataToDisplay.days[0].description.toLowerCase().includes(`${key}`)) {
                console.log(src)
                cardImg.src = `${src}`;
            }
        })
    cardImg.alt = `${dataToDisplay.days[0].description}`;

    // create card text
    const cardText = document.createElement("p");
    cardText.textContent = unit === "F" ? Math.round(dataToDisplay.days[0].tempmax) + `°${unit}` : Math.round((dataToDisplay.days[0].tempmax * 9) / 5 + 32) + `°${unit}`

    cardBottom.append(cardImg, cardText);

    // Assembly
    card.append(cardTitle, cardTop, cardBottom);
    weatherContainer.append(card);
}

// function to show loader during api fetch
export function showLoader() {
  const container = document.querySelector(".weather-container");
  container.innerHTML = "<div class='loader'></div>";
}
