import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import axios from "axios";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Endpoint para salvar os dados de clima no banco de dados
app.post("/clima/salvar", async (req: Request, res: Response) => {
  try {
    const apiKey = "7fa6f49dd9cede25accd83dc938eb6c0";
    const city = req.body.city as string;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await axios.get(url);
    const weatherData = response.data;

    // Persiste os dados de clima recebidos no banco de dados usando o Prisma
    await prisma.weather.create({
      data: {
        city,
        temperature: weatherData.main.temp,
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
      },
    });

    res.json({ message: "Dados de clima salvos com sucesso." });
  } catch (error) {
    console.error("Erro ao salvar os dados de clima:", error);
    res.status(500).json({ error: "Erro ao salvar os dados de clima." });
  }
});

app.get("/clima/atual", async (req: Request, res: Response) => {
  try {
    const apiKey = "7fa6f49dd9cede25accd83dc938eb6c0";
    const city = req.query.city as string;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await axios.get(url);
    const dadosClima = response.data;

    // Salva os dados de clima no banco de dados usando o Prisma
    const savedWeather = await prisma.weather.create({
      data: {
        city: dadosClima.name,
        temperature: dadosClima.main.temp,
        humidity: dadosClima.main.humidity,
        windSpeed: dadosClima.wind.speed,
      },
    });

    res.json(savedWeather);
  } catch (error) {
    console.error("Erro ao obter o clima atual:", error);
    res.status(500).json({ error: "Erro ao obter o clima atual." });
  }
});

app.get("/clima/previsao", async (req: Request, res: Response) => {
  try {
    const apiKey = "7fa6f49dd9cede25accd83dc938eb6c0";
    const city = req.query.city as string;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    const response = await axios.get(url);
    const dadosPrevisao = response.data;

    res.json(dadosPrevisao);
  } catch (error) {
    console.error("Erro ao obter a previsão do clima:", error);
    res.status(500).json({ error: "Erro ao obter a previsão do clima." });
  }
});

app.get("/clima/previsao/5dias", async (req: Request, res: Response) => {
  try {
    const apiKey = "7fa6f49dd9cede25accd83dc938eb6c0";
    const city = req.query.city as string;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=5&appid=${apiKey}`;

    const response = await axios.get(url);
    const dadosPrevisao5Dias = response.data;

    res.json(dadosPrevisao5Dias);
  } catch (error) {
    console.error("Erro ao obter a previsão do clima para 5 dias:", error);
    res
      .status(500)
      .json({ error: "Erro ao obter a previsão do clima para 5 dias." });
  }
});

// Endpoint adicional para recuperar os dados de clima salvos no banco de dados
app.get("/clima/salvos", async (req: Request, res: Response) => {
  try {
    // Recupera os dados de clima salvos no banco de dados usando o Prisma
    const dadosClimaSalvos = await prisma.weather.findMany();
    res.json(dadosClimaSalvos);
  } catch (error) {
    console.error("Erro ao recuperar os dados de clima salvos:", error);
    res
      .status(500)
      .json({ error: "Erro ao recuperar os dados de clima salvos." });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`O servidor está ouvindo na porta ${port}`);
});
