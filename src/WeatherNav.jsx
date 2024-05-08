import PropTypes from "prop-types";

function WeatherNav({
  formData,
  handleChange,
  handleSubmit,
  handleKeyPress,
  inputRef,
  error,
}) {
  return (
    <nav className="weather-nav">
      <form
        onSubmit={handleSubmit}
        className="weather-nav-search"
        autoComplete="off"
      >
        <div className="input-data">
          <input
            ref={inputRef}
            type="text"
            name="inputValue"
            className=""
            value={formData.inputValue}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            required
          />
          <div className="underline"></div>
          <label>Enter city or location</label>
        </div>
        <button type="submit" style={{ display: "none" }}></button>
      </form>
      <div className={`input-error ${error ? "show" : ""}`}>
        {error && "Oops! Location not found!"}
      </div>
    </nav>
  );
}

WeatherNav.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func.isRequired,
  inputRef: PropTypes.object,
  error: PropTypes.string,
};

export default WeatherNav;
