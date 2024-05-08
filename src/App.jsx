import { useState, useRef } from "react";
import WeatherNav from "./WeatherNav";
import WeatherContainer from "./WeatherContainer";

function App() {
  // State for form input value, weather data and error
  const [formData, setFormData] = useState({ inputValue: "" });
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const inputRef = useRef(null);

  // API key for weather API from "Free Weather API - WeatherAPI.com"
  const key = import.meta.env.VITE_API_KEY;
  // API URL for weather data based on form input value
  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${formData.inputValue}`;

  // Handles any change in the input field
  const handleChange = (e) => {
    // Update the input value in the form data state
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handles the submitted data from the input
  const handleSubmit = async (e) => {
    // Prevent page reload on form submission
    e.preventDefault();

    // Check if the input value is not empty before fetching data
    if (formData.inputValue.trim() !== "") {
      try {
        // Fetch the weather data from API
        const responseWeather = await fetch(apiUrl);

        // If the response was not successful, throw a network error
        if (!responseWeather.ok) throw new Error("Network response was not ok");

        // Get the weather data in JSON format
        const weatherJsonData = await responseWeather.json();

        // Set the weather data and clear any previous error
        setData(weatherJsonData);
        inputRef.current.blur();
        setError(null);
      } catch (error) {
        // Set the error state if there's an error fetching data
        setError(error);
      }
    }

    // Reset the input value after form submission
    setFormData({ ...formData, inputValue: "" });
  };

  // Handles when the Enter key is pressed
  const handleKeyPress = (e) => {
    // If Enter key is pressed, submit the form
    if (e.key === "Enter") handleSubmit(e);
  };

  // Format the local time
  const formatTime = (localTime) => {
    const date = new Date(localTime);

    const day = date.toLocaleDateString("en-US", { weekday: "long" });
    const month = date.toLocaleDateString("en-US", { month: "long" });
    const dayOfMonth = date.getDate();

    const formattedTime = `${day}, ${dayOfMonth} ${month}`;

    return formattedTime;
  };

  return (
    <>
      <main style={data && { height: "820px" }}>
        <WeatherNav
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleKeyPress={handleKeyPress}
          inputRef={inputRef}
          error={error}
        />

        {data && <WeatherContainer data={data} formatTime={formatTime} />}
      </main>
    </>
  );
}

export default App;
