import express, { Request, Response } from "express";
import { saveWeather } from "../controllers/weatherController";
import { Weather, getSavedWeatherData } from "../models/weather";
import * as weatherService from "../services/weatherService";

const router = express.Router();

router.post("/save-weather", saveWeather);

router.get("/current-weather", async (req: Request, res: Response) => {
  try {
    const city = req.query.city as string;
    const weatherData = await weatherService.getCurrentWeather(city);

    if (!weatherData) {
      throw new Error("Não foi possível obter os dados do clima atual.");
    }

    const weather: Weather = {
      city: weatherData.city,
      temperature: parseFloat((weatherData.temperature - 273.15).toFixed(1)),
      humidity: weatherData.humidity,
      windSpeed: weatherData.windSpeed,
    };

    res.json(weather);
  } catch (error) {
    console.error("Erro ao obter o clima atual:", error);
    res.status(500).json({ error: "Erro ao obter o clima atual." });
  }
});

router.get("/saved-weather", async (req: Request, res: Response) => {
  try {
    const savedWeatherData = await getSavedWeatherData();
    res.json(savedWeatherData);
  } catch (error) {
    console.error("Erro ao recuperar os dados de clima salvos:", error);
    res
      .status(500)
      .json({ error: "Erro ao recuperar os dados de clima salvos." });
  }
});

export default router;
