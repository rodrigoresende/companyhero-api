import { SpotifyClient } from "@/infra";

import { ApiError } from "@/helpers";

const spotifyClient = new SpotifyClient();

export default class PlaylistService {
  async getPlaylist(temp: number | undefined) {
    if (!temp) {
      throw new ApiError("temperature is required", 400);
    }

    if (temp > 25) {
      return {
        type: "POP",
        playlist: await spotifyClient.getPlaylist("37i9dQZF1DX1ngEVM0lKrb"),
      };
    }

    if (temp >= 10 && temp <= 25) {
      return {
        type: "ROCK",
        playlist: await spotifyClient.getPlaylist("2BCkGjRMRz0TEn8xwsa29V"),
      };
    }

    if (temp < 10) {
      return {
        type: "CLASSIC",
        playlist: await spotifyClient.getPlaylist("1kGtBpJnR0bPWX4JXi5wUo"),
      };
    }
  }
}
