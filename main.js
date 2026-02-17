// listener for sumbit button
const searchButton = document.querySelector("#search-button")
searchButton.addEventListener("click", () => {
    console.log("search button clicked")
})

// listener for form
let query;
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
   e.preventDefault();
    console.log("form submit")

    // get query from input value
    const formData = new FormData(form);
    query = formData.get("search");
    console.log(query)
})