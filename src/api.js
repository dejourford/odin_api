const api_key = "W9P8PAQLZQ5UH9E4BWG5JRMZY";
// create function for fetching data from api
export async function fetchWeather(location) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=${api_key}`);

        if (!response.ok) {
            throw new Error("Location not found")
        }

        const data = await response.json();
        console.log(data)
        return {
            address: data.address,
            currentConditions: data.currentConditions,
            days: data.days,
            description: data.description,
        }
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }


}