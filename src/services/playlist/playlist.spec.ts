import { expect, test, describe } from "vitest";
import PlaylistService from "./index";

const playlist = new PlaylistService();

describe("PlaylistService", async () => {
  test("Should return type POP", async () => {
    const list = await playlist.getPlaylist(26);
    expect(list?.type).toBe("POP");
  });

  test("Should return type ROCK", async () => {
    const list = await playlist.getPlaylist(25);
    expect(list?.type).toBe("ROCK");
  });

  test("Should return type CLASSIC", async () => {
    const list = await playlist.getPlaylist(9);
    expect(list?.type).toBe("CLASSIC");
  });

  test("Should return invalid params", async () => {
    expect(
      async () => await playlist.getPlaylist(undefined)
    ).rejects.toThrowError();
  });
});
