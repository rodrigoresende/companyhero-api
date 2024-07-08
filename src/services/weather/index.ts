import { WeatherClient, RedisClient } from "@/infra";
import PlaylistService from "@/services/playlist";
import { Weather, Playlist } from "@/types";

const weatherClient = new WeatherClient();
const redis = new RedisClient();

const playlistService = new PlaylistService();

interface Recommendation extends Weather {
  playlist: PlaylistComplement | undefined;
}

interface PlaylistComplement {
  type: string;
  playlist: Playlist[];
}

export default class WeatherService {
  async getWeatherByCity(city: string): Promise<Recommendation | undefined> {
    const cache = (await redis.get(city)) as string;
    if (cache) {
      return JSON.parse(cache);
    }

    const data = await weatherClient.getWeather(city);

    const playlist = await playlistService.getPlaylist(data?.temp_c);

    const recommendation = {
      city: data?.city,
      state: data?.state,
      country: data?.country,
      temp_c: data?.temp_c,
      playlist,
    };

    await redis.set(city, JSON.stringify(recommendation));

    return recommendation;
  }
}
