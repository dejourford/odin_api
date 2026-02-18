import { fetchWeather } from "./src/api.js";
import { renderWeather } from "./src/dom.js";
import { showLoader } from "./src/dom.js";

// listener for form
const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
   e.preventDefault();
    console.log("form submit")

    // get query from input value
    const formData = new FormData(form);
    const query = formData.get("search");
    console.log(query)

    try {
        showLoader();
        const dataToDisplay = await fetchWeather(query)
        renderWeather(dataToDisplay, "F");
    }
    catch (error) {
        console.error(error)
    }
})