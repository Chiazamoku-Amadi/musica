import api from "./api";
import { Device } from "./types/types";

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

// To get recommended tracks
export const fetchTracks = async (accessToken: string) => {
  const response = await api.get("/search", {
    params: {
      q: "year:2022",
      type: "track",
      limit: 10,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.tracks.items;
};

// To add tracks to a playlist
export const addTracksToPlaylist = async (
  accessToken: string | null,
  playlistId: string,
  uri: string[]
) => {
  const response = await api.post(
    `playlists/${playlistId}/tracks`,
    {
      uris: uri,
      position: 0,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response;
};

// To get the currently playing track
export const fetchCurrentlyPlayingTrack = async (accessToken: string) => {
  const response = await api.get("me/player/currently-playing", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

// To start/resume playback for a track
// Suggestion: When a non-premium subscriber clicks on the play/pause button, let them get an alert that says it's a premium feature
// However, I believe all users probably have access to the preview. If this is so, then the alert should come immediately the track ends (instead of "LISTEN ON SPOTIFY")
// NB: PREMIUM FEATURE
export const playCurrentTrack = async (accessToken: string, id: string) => {
  try {
    // Get available devices
    const devices = await fetchAvailableDevices(accessToken);

    if (devices.length === 0) {
      console.error("No devices available");
      return;
    }

    // Optionally transfer playback to the first available device
    const activeDevice = devices.find((device: Device) => device.is_active);

    if (!activeDevice) {
      // Transfer playback to the first available device
      await transferPlayback(accessToken, devices[0].id);
    }

    // Play the track
    const response = await api.put(
      "me/player/play",
      {
        uris: [`spotify:track:${id}`],
        position_ms: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error playing track", error);
  }
};

// To get available devices connectedto user's account
export const fetchAvailableDevices = async (accessToken: string) => {
  const response = await api.get("/me/player/devices", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data.devices;
};

// To transfer playback state to a particular device
export const transferPlayback = async (
  accessToken: string,
  deviceId: string
) => {
  const response = await api.put(
    "/me/player",
    {
      device_ids: [deviceId],
      play: true,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
};
