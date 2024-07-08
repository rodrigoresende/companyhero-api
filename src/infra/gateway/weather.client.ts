import { ApiError } from "@/helpers";
import { Weather } from "@/types";

export default class WeatherClient {
  async getWeather(city: string): Promise<Weather | undefined> {
    const credentials = process.env.WEATHER_API;
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${credentials}&q=${city}&aqi=no`
    );
    const data = await response.json();

    if (data?.error) {
      throw new ApiError("No matching location found", 404);
    }

    return {
      city: data?.location?.name,
      state: data?.location?.region,
      country: data?.location?.country,
      temp_c: data?.current?.temp_c,
    };
  }
}
