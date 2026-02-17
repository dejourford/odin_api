// listener for sumbit button
const searchButton = document.querySelector("#search-button")
searchButton.addEventListener("click", () => {
    
} )

// listener for form
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
   e.preventDefault();
    console.log("form submit")
})