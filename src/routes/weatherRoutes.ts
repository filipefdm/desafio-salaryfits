import express, { Request, Response } from "express";
import { saveWeather } from "../controllers/weatherController";
import { Weather, getSavedWeatherData } from "../models/weather";
import * as weatherService from "../services/weatherService";

const router = express.Router();

// SALVAR O CLIMA DA CIDADE
router.post("/save", saveWeather);

// OBTER OS DADOS DE CLIMA ATUAL
router.get("/current", async (req: Request, res: Response) => {
  try {
    const city = req.query.city as string;
    const weatherData = await weatherService.getCurrentWeather(city);

    if (!weatherData) {
      throw new Error("Não foi possível obter os dados do clima atual.");
    }

    const weather: Weather = {
      city: weatherData.city,
      temperature: weatherData.temperature,
      humidity: weatherData.humidity,
      windSpeed: weatherData.windSpeed,
    };

    res.json(weather);
  } catch (error) {
    console.error("Erro ao obter o clima atual:", error);
    res.status(500).json({ error: "Erro ao obter o clima atual." });
  }
});

// RECUPERAR OS DADOS DE CLIMA SALVOS
router.get("/saved", async (req: Request, res: Response) => {
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
