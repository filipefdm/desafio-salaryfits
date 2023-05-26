import { PrismaClient } from "@prisma/client";

export interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  name: string;
}

export interface Weather {
  city: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
}

const prisma = new PrismaClient();

export async function saveWeatherData(weather: Weather) {
  try {
    await prisma.weather.create({
      data: weather,
    });
  } catch (error) {
    console.error("Erro ao salvar os dados de clima:", error);
    throw new Error("Erro ao salvar os dados de clima.");
  }
}

export async function getSavedWeatherData() {
  try {
    const savedWeatherData = await prisma.weather.findMany();
    return savedWeatherData;
  } catch (error) {
    console.error("Erro ao recuperar os dados de clima salvos:", error);
    throw new Error("Erro ao recuperar os dados de clima salvos.");
  }
}
