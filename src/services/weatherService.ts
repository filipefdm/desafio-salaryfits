import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { getOpenWeatherAPIKey } from "../config/config";
import { ForecastData, WeatherForecast } from "../models/forecast";
import { Weather, WeatherData } from "../models/weather";

const apiKey = getOpenWeatherAPIKey();
const prisma = new PrismaClient();

export interface FiveDayWeatherForecast {
  forecasts: WeatherForecast[];
}
export const saveWeather = async (city: string): Promise<void> => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await axios.get<WeatherData>(url);
    const weatherData = response.data;

    const { main, wind, name } = weatherData;

    const weather: Weather = {
      city: name,
      temperature: parseFloat((main.temp - 273.15).toFixed(1)),
      humidity: main.humidity,
      windSpeed: wind.speed,
    };

    await prisma.weather.create({
      data: weather,
    });
  } catch (error) {
    console.error("Erro ao salvar os dados de clima:", error);
    throw new Error(
      "Erro ao salvar os dados de clima. Por favor, tente novamente mais tarde."
    );
  }
};

export const getCurrentWeather = async (city: string): Promise<Weather> => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await axios.get<WeatherData>(url);
    const weatherData = response.data;

    const { main, wind, name } = weatherData;

    const weather: Weather = {
      city: name,
      temperature: main.temp,
      humidity: main.humidity,
      windSpeed: wind.speed,
    };

    return weather;
  } catch (error) {
    console.error("Erro ao obter o clima atual:", error);
    throw new Error(
      "Erro ao obter o clima atual. Por favor, verifique o nome da cidade e tente novamente."
    );
  }
};

export const getFiveDayWeatherForecast = async (
  city: string
): Promise<FiveDayWeatherForecast> => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=5&appid=${apiKey}`;

    const response = await axios.get<ForecastData>(url);
    const forecastData = response.data;

    const fiveDayForecast: WeatherForecast[] = forecastData.list.map(
      (forecast) => {
        const temperatureInCelsius = forecast.main.temp - 273.15;
        const roundedTemperature = temperatureInCelsius.toFixed(1);

        return {
          date: forecast.dt_txt,
          weather: forecast.weather[0].main,
          description: forecast.weather[0].description,
          temperature: parseFloat(roundedTemperature),
        };
      }
    );

    return { forecasts: fiveDayForecast };
  } catch (error) {
    console.error("Erro ao obter a previsão do tempo para 5 dias:", error);
    throw new Error("Erro ao obter a previsão do tempo para 5 dias.");
  }
};
