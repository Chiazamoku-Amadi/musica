import api from "./api";

export const fetchTrendingAlbums = async (accessToken: string) => {
  const response = await api.get("/search", {
    params: {
      q: "year:2024",
      type: "album",
      limit: 5,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

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

  return response.data.artists.items;
};

export const fetchRecommendedGenres = async (accessToken: string) => {
  const response = await api.get("/recommendations/available-genre-seeds", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.genres;
};

export const fetchPopularShows = async (accessToken: string) => {
  const response = await api.get("/search", {
    params: {
      q: "year:2024",
      type: "show",
      limit: "12",
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.shows.items;
};

export const fetchRecentlyPlayedTracks = async (accessToken: string) => {
  const response = await api.get("/me/player/recently-played", {
    params: {
      limit: "12",
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.items;
};

export const fetchSavedTracks = async (accessToken: string) => {
  const response = await api.get("/me/tracks", {
    params: {
      limit: 12,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.items;
};

export const fetchSavedShows = async (accessToken: string) => {
  const response = await api.get("/me/shows", {
    params: {
      limit: 12,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.items;
};

export const fetchCurrentUserPlaylists = async (accessToken: string) => {
  const response = await api.get("/me/playlists", {
    params: {
      limit: 12,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  console.log(response.data.items);
  return response.data.items;
};

export const fetchFeaturedPlaylists = async (accessToken: string) => {
  const response = await api.get("/browse/featured-playlists", {
    params: {
      limit: 12,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.playlists.items;
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
