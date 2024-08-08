import api from "./api";

export const fetchTrendingAlbums = async (accessToken: string) => {
  const response = await api.get("/search", {
    params: {
      q: "year:2020",
      type: "album",
      limit: 5,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // console.log(response.data);
  return response.data.albums.items;
};

export const fetchPopularArtists = async (accessToken: string) => {
  const response = await api.get("/search", {
    params: {
      q: "year:2022",
      type: "artist",
      limit: 12,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // console.log(response.data);
  return response.data.artists.items;
};

// export const fetchSpotifyData = async (
//   endpoint: string,
//   accessToken: string | null
// ): Promise<string> => {
//   if (!accessToken) {
//     throw new Error("No access token found");
//   }

//   const response = await api.get(`/${endpoint}`, {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });

//   return response.data;
// };
