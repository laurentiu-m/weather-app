import humidityIcon from "./assets/humidity.png";
import windIcon from "./assets/wind.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { useState } from "react";

function WeatherContainer({ data, formatTime }) {
  const [degree, setDegree] = useState("Celsius");

  const handleDegree = (e) => {
    if (e.target.value === "Fahrenheit") {
      setDegree(e.target.value);
    } else {
      setDegree(e.target.value);
    }
  };

  return (
    <div className="weather-container">
      <div className="weather-container-location">
        <div>
          <FontAwesomeIcon icon={faLocationDot} />
          <h2>
            {data.location.name}, <span>{data.location.country}</span>
          </h2>
        </div>

        <div className="weather-container-date">
          <h3>{formatTime(data.location.localtime)}</h3>
        </div>
      </div>

      <div className="weather-container-current">
        <div className="weather-container-degrees">
          <h1>
            {degree === "Celsius"
              ? Math.floor(data.current.temp_c)
              : Math.floor(data.current.temp_f)}
            °
          </h1>
          <div className="vl-degrees"></div>
          <div className="weather-container-condition">
            <img
              src={data && data.current.condition.icon}
              alt={data && data.current.condition.text + " icon"}
            />
            <h2>{data && data.current.condition.text}</h2>
          </div>
        </div>
      </div>

      <div className="weather-container-details">
        <div>
          <FontAwesomeIcon icon={faCloud} className="icon-details" />
          <h2>{data.current.cloud}%</h2>
          <p>Cloud</p>
        </div>

        <div className="vl"></div>

        <div>
          <img
            src={humidityIcon}
            className="icon-details"
            alt="Humidity icon"
          />
          <h2>{data.current.humidity}%</h2>
          <p>Humidity</p>
        </div>

        <div className="vl"></div>

        <div>
          <img src={windIcon} className="icon-details" alt="Wind icon" />
          <h2>{data.current.wind_kph}km/h</h2>
          <p>Wind</p>
        </div>
      </div>

      <div className="weather-container-degree-type">
        <button
          id={degree === "Celsius" ? "button-active" : ""}
          value={"Celsius"}
          onClick={handleDegree}
        >
          Celsius
        </button>
        <div className="vl"></div>
        <button
          id={degree === "Fahrenheit" ? "button-active" : ""}
          value={"Fahrenheit"}
          onClick={handleDegree}
        >
          Fahrenheit
        </button>
      </div>
    </div>
  );
}

WeatherContainer.propTypes = {
  data: PropTypes.object,
  formatTime: PropTypes.func.isRequired,
};

export default WeatherContainer;
