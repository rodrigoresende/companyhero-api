import { expect, test, describe } from "vitest";
import { WeatherClient } from "@/infra";

const weatherClient = new WeatherClient();

describe("Weather", async () => {
  test("Should return valid city", async () => {
    const weather = await weatherClient.getWeather("São Paulo");
    expect(weather?.city).toBeDefined();
  });

  test("Should return valid state", async () => {
    const weather = await weatherClient.getWeather("São Paulo");
    expect(weather?.state).toBeDefined();
  });

  test("Should return valid country", async () => {
    const weather = await weatherClient.getWeather("São Paulo");
    expect(weather?.country).toBeDefined();
  });

  test("Should return valid temp_c", async () => {
    const weather = await weatherClient.getWeather("São Paulo");
    expect(weather?.temp_c).toBeDefined();
  });

  test("Should return invalid city", async () => {
    expect(
      async () => await weatherClient.getWeather("Tremmm")
    ).rejects.toThrowError();
  });
});
