import { useEffect, useState, useRef } from "react";

export default function WeatherWidget({ onClose }) {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const [city, setCity] = useState("");
  const [input, setInput] = useState("");

  const [weather, setWeather] = useState(null);

  const [loading, setLoading] = useState(true);
  const [geoError, setGeoError] = useState("");
  const [weatherError, setWeatherError] = useState("");

  const [failedCities, setFailedCities] = useState([]);

  const abortRef = useRef(null);

  // получить координаты
  const getCoords = async (cityName) => {
    abortRef.current = new AbortController();

    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`,
      { signal: abortRef.current.signal }
    );

    if (!res.ok) throw new Error("geo error");

    const data = await res.json();

    if (!data.length) return null;

    return data[0];
  };

  // получить погоду
  const getWeather = async (lat, lon) => {
    abortRef.current = new AbortController();

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
      { signal: abortRef.current.signal }
    );

    if (!res.ok) throw new Error("weather error");

    return await res.json();
  };

  // ЗАПУСК (Тюмень)
  useEffect(() => {
    loadCity("Тюмень");

    return () => {
      abortRef.current?.abort(); // ❗ важно
    };
  }, []);

  // ОСНОВНАЯ ЛОГИКА
  const loadCity = async (cityName) => {
    setLoading(true);
    setGeoError("");
    setWeatherError("");

    try {
      const coords = await getCoords(cityName);

      if (!coords) {
  setGeoError(`Не удалось получить данные для города ${cityName}`);
  setFailedCities(prev =>
    prev.includes(cityName) ? prev : [...prev, cityName]
  );
  setInput(""); // ❗ обязательно
  setLoading(false);
  return;
}

      const data = await getWeather(coords.lat, coords.lon);

      setWeather(data);
      setCity(cityName);
      setInput(cityName);
    } catch (e) {
      setWeather(null);
      setWeatherError("Не удалось получить данные");
    }

    setLoading(false);
  };

  // КНОПКА "ПОЛУЧИТЬ ПОГОДУ"
  const handleSearch = async () => {
    const value = input.trim();

    if (!value) return;

    if (failedCities.includes(value)) {
      setGeoError(`Не удалось получить данные для города ${value}`);
      return;
    }

    await loadCity(value);
  };

  // UI

  if (loading) {
    return <div className="weather">Loading...</div>;
  }

  return (
    <div className="weather">
      <button onClick={onClose}>✖</button>

      {/* ПОГОДА */}
      <div>
        {weather ? (
          <>
            <h3>{weather.name}</h3>
            <p>{weather.main.temp}°C</p>
            <p>{weather.weather[0].description}</p>
          </>
        ) : (
          <p>No data</p>
        )}

        {weatherError && <p>{weatherError}</p>}
      </div>

      {/* INPUT */}
      <input
  value={input}
  disabled={loading} // ❗
  onChange={(e) => {
    setInput(e.target.value);
    setGeoError("");
  }}
/>

<button onClick={handleSearch} disabled={loading}>
  Get Weather
</button>

      {/* ERRORS */}
      {geoError && <p>{geoError}</p>}
    </div>
  );
}