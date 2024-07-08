import { Playlist } from "@/types";

export default class SpotifyClient {
  private async getToken() {
    const clientID = process.env.SPOTIFY_CLIENT_ID as string;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET as string;

    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");
    urlencoded.append("client_id", clientID);
    urlencoded.append("client_secret", clientSecret);

    const requestOptions: RequestInit = {
      method: "POST",
      body: urlencoded,
      redirect: "follow",
    };

    const token = await fetch(
      "https://accounts.spotify.com/api/token",
      requestOptions
    )
      .then(async (response) => {
        const data = await response.json();
        return data?.access_token;
      })
      .catch((error) => console.error(error));

    return token;
  }

  async getPlaylist(style: string): Promise<Playlist[]> {
    const token = await this.getToken();

    const requestOptions: RequestInit = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      redirect: "follow",
    };

    const playlist = await fetch(
      `https://api.spotify.com/v1/playlists/${style}/tracks`,
      requestOptions
    )
      .then(async (response) => {
        const data = await response.json();
        const formatedPlaylist = data?.items?.map((item: any) => {
          return {
            title: item?.track?.name,
            artist: item?.track?.artists?.[0]?.name,
            url: item?.track?.external_urls?.spotify,
            duration: item?.track?.duration_ms,
            album: item?.track?.album?.name,
          };
        });

        return formatedPlaylist;
      })
      .catch((error) => console.error(error));

    return playlist;
  }
}
