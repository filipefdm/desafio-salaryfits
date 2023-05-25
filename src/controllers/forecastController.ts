import { Request, Response } from "express";
import * as weatherService from "../services/weatherService";

export async function getWeatherForecast(req: Request, res: Response) {
  try {
    const city = req.query.city as string;
    const forecast = await weatherService.getFiveDayWeatherForecast(city);
    res.json(forecast);
  } catch (error) {
    console.error("Erro ao obter a previsão do tempo para 5 dias:", error);
    res
      .status(500)
      .json({ error: "Erro ao obter a previsão do tempo para 5 dias." });
  }
}
