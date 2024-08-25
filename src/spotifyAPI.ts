import api from "./api";

// To get current user's data
export const fetchCurrentUserData = async (accessToken: string) => {
  const response = await api.get("/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

// To get trending albums
export const fetchTrendingAlbums = async (accessToken: string) => {
  const response = await api.get("/search", {
    params: {
      q: "year:2022",
      type: "album",
      limit: 10,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.albums.items;
};

// To get popular artists
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

// To get recommended genres
export const fetchRecommendedGenres = async (accessToken: string) => {
  const response = await api.get("/recommendations/available-genre-seeds", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.genres;
};

// To get popular shows
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

// To get recently played tracks
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

// To get current user's saved tracks
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

// To get current user's saved shows
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

// To get current user's playlists
export const fetchCurrentUserPlaylists = async (accessToken: string) => {
  const response = await api.get("/me/playlists", {
    params: {
      limit: 12,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.items;
};

// To get featured playlists
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

// To create a playlist
export const createPlaylist = async (
  accessToken: string | null,
  userId: string | null,
  title: string,
  description: string,
  isPublic: boolean
) => {
  const response = await api.post(
    `/users/${userId}/playlists`,
    {
      name: title,
      description: description,
      public: isPublic,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
};

// To get a playlist
export const fetchPlaylist = async (
  accessToken: string,
  playlistId: string
) => {
  const response = await api.get(`/playlists/${playlistId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

// To get the tracks in a playlist
export const fetchPlaylistTracks = async (
  accessToken: string,
  playlistId: string
) => {
  const response = await api.get(`/playlists/${playlistId}/tracks`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.items;
};
