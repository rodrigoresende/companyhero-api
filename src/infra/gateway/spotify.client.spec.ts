import { expect, test, describe } from "vitest";
import { SpotifyClient } from "@/infra";

const spotifyClient = new SpotifyClient();

describe("Spotify", async () => {
  test("Should return valid playlist", async () => {
    const spotify = await spotifyClient.getPlaylist("2BCkGjRMRz0TEn8xwsa29V");
    expect(spotify).toBeDefined();
  });

  test("Should return invalid playlist", async () => {
    const spotify = await spotifyClient.getPlaylist("");
    expect(spotify).toBeUndefined();
  });
});
