import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import "./Weather.css";

const WeatherDetails = ({
  icon,
  temp,
  city,
  country,
  lat,
  log,
  humidity,
  wind,
}) => {
  return (
    <>
      <div className="image">
        <img src={icon} style={{ height: "200px" }} />
      </div>
      <div className="temp">{temp} &deg; C</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className="lat">Latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="log">Longitude</span>
          <span>{log}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src="./image/humidity.jpg" alt="humidity" className="icon" />
          <div className="data">
            <div className="humidity-precent">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src="./image/wind.jpg" alt="wind" className="icon" />
          <div className="data">
            <div className="wind-precent">{wind} km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  );
};

function Weather() {
  const [icon, setIcon] = useState("./image/cloud.jpg");
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);

  const [text, setText] = useState("Chennai");

  const [cityNoFound, setCityNoFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const weatherIconMap = {
    "01d": "./image/sun.jpg",
    "01n": "./image/sun.jpg",
    "02d": "./image/cloud.jpg",
    "02n": "./image/cloud.jpg",
    "03d": "./image/sun.jpg",
    "03n": "./image/sun.jpg",
    "04d": "./image/drizzle.jpg",
    "04n": "./image/drizzle.jpg",
    "09d": "./image/rainy.jpg",
    "09n": "./image/rainy.jpg",
    "10d": "./image/rainy.jpg",
    "10n": "./image/rainy.jpg",
    "13d": "./image/snow.jpg",
    "13n": "./image/snow.jpg",
  };

  const search = async () => {
    setLoading(true);

    let api_key = "07976025a9918032463b19f5f8a56b96";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;

    try {
      let res = await fetch(url);
      let data = await res.json();
      // console.log(data); 
      if (data.cod === "404") {
        console.error("City Not Found");
        setCityNoFound(true);
        setLoading(false);
        return;
      }
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || "./image/sun.jpg");
      setCityNoFound(false);
    } catch (error) {
      console.log("Error occurred :", error.meaasage);
      setError("An Error occurred while fetching weather data");
    } finally {
      setLoading(false);
    }
  };

  const handleCity = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  useEffect(function () {
    search();
  }, []);

  return (
    <div className="container">
      <div className="input-container">
        <input
          type="text"
          className="cityinput"
          placeholder="Search City"
          onChange={handleCity}
          value={text}
          onKeyDown={handleKeyDown}
        />
        <div className="search-icon" onClick={() => search()}>
          <IoSearchOutline />
        </div>
      </div>

      {loading && <div className="loading-message">Loading....</div>}
      {error && <div className="error-message">{error}</div>}
      {cityNoFound && <div className="city-not-found">City Not Found</div>}

      {!loading && !cityNoFound && (
        <WeatherDetails
          icon={icon}
          temp={temp}
          city={city}
          country={country}
          lat={lat}
          log={log}
          humidity={humidity}
          wind={wind}
        />
      )}
    </div>
  );
}

export default Weather;
