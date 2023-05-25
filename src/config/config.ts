export const getOpenWeatherAPIKey = (): string => {
  const apiKey = process.env.OPEN_WEATHER_API_KEY;

  if (!apiKey) {
    throw new Error("A chave de API do OpenWeather não está configurada.");
  }

  return apiKey;
};
