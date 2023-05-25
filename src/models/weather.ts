import { PrismaClient } from "@prisma/client";

export interface WeatherData {
  main: {
    temp: number; // Temperatura em Kelvin
    humidity: number; // Umidade em percentual
  };
  wind: {
    speed: number; // Velocidade do vento em metros por segundo
  };
  name: string; // Nome da cidade
}

export interface Weather {
  city: string; // Nome da cidade
  temperature: number; // Temperatura em Kelvin
  humidity: number; // Umidade em percentual
  windSpeed: number; // Velocidade do vento em metros por segundo
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
