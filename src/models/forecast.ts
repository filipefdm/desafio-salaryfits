import axios from "axios";
import { getOpenWeatherAPIKey } from "../config/config";

const apiKey = getOpenWeatherAPIKey();

export interface ForecastData {
  list: {
    dt_txt: string;
    weather: {
      main: string;
      description: string;
    }[];
    main: {
      temp: number;
    };
  }[];
}

export interface WeatherForecast {
  date: string;
  weather: string;
  description: string;
  temperature: number;
}

export async function getFiveDayWeatherForecast(
  city: string
): Promise<WeatherForecast[]> {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=5&appid=${apiKey}`;

  const response = await axios.get<ForecastData>(url);
  const forecastData = response.data;

  const fiveDayForecast = forecastData.list.map((forecast) => {
    return {
      date: forecast.dt_txt,
      weather: forecast.weather[0].main,
      description: forecast.weather[0].description,
      temperature: forecast.main.temp - 273.15,
    };
  });

  return fiveDayForecast;
}
