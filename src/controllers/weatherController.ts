import { Request, Response } from "express";
import * as weatherService from "../services/weatherService";

// SALVAR O CLIMA
export const saveWeather = async (req: Request, res: Response) => {
  try {
    const city = req.body.city as string;

    if (!city || typeof city !== "string") {
      return res.status(400).json({ error: "Parâmetro 'city' inválido." });
    }

    await weatherService.saveWeather(city);
    res.json({ message: "Dados de clima salvos com sucesso." });
  } catch (error) {
    console.error("Erro ao salvar os dados de clima:", error);
    res.status(500).json({
      error:
        "Erro ao salvar os dados de clima. Por favor, tente novamente mais tarde.",
    });
  }
};

// OBTER O CLIMA ATUAL
export const getCurrentWeather = async (req: Request, res: Response) => {
  try {
    const city = req.query.city as string;

    if (!city || typeof city !== "string") {
      return res.status(400).json({ error: "Parâmetro 'city' inválido." });
    }

    const currentWeather = await weatherService.getCurrentWeather(city);
    res.json(currentWeather);
  } catch (error) {
    console.error("Erro ao obter o clima atual:", error);
    res.status(500).json({
      error:
        "Erro ao obter o clima atual. Por favor, verifique o nome da cidade e tente novamente.",
    });
  }
};
