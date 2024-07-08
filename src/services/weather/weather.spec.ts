import { expect, test, describe } from "vitest";
import WeatherService from "./index";

const weatherService = new WeatherService();

describe("weatherService", async () => {
  test("Should - return valid city", async () => {
    const weather = await weatherService.getWeatherByCity("São Paulo");
    expect(weather?.city).toBeDefined();
  });

  test("Should - return valid state", async () => {
    const weather = await weatherService.getWeatherByCity("São Paulo");
    expect(weather?.state).toBeDefined();
  });

  test("Should - return valid country", async () => {
    const weather = await weatherService.getWeatherByCity("São Paulo");
    expect(weather?.country).toBeDefined();
  });

  test("Should - return valid temp_c", async () => {
    const weather = await weatherService.getWeatherByCity("São Paulo");
    expect(weather?.temp_c).toBeDefined();
  });

  test("Should - return invalid response", async () => {
    expect(
      async () => await weatherService.getWeatherByCity("Tremmm")
    ).rejects.toThrowError();
  });
});
