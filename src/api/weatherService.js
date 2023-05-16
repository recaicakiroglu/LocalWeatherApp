// src/api/weatherApi.js
import axios from "axios";

const weatherApi = axios.create({
  baseURL: "https://api.open-meteo.com/v1",
});

export function fetchWeather(lat, lng) {
  return weatherApi
    .get("/forecast", {
      params: {
        latitude: lat,
        longitude: lng,
        daily:
          "weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,uv_index_max",
        forecast_days: 1,
        timezone: "auto",
      },
    })
    .then((response) => {
      if (response.status === 200) {
        const body = response.data;
        const weather = {};
        for (const key in body.daily) {
          weather[key] = body.daily[key][0];
        }
        return weather;
      }
      throw new Error("Failed to fetch weather");
    });
}
