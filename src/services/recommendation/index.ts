import { Weather } from "@/types";

import WeatherService from "@/services/weather";

const weatherService = new WeatherService();

export default class RecommendationService {
  async get(city: string): Promise<Weather | undefined> {
    return await weatherService.getWeatherByCity(city);
  }
}
