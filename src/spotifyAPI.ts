import api from "./api";

export const fetchSpotifyData = async (
  endpoint: string,
  accessToken: string | null
) => {
  if (!accessToken) {
    throw new Error("No access token found");
  }

  const response = await api.get(`/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};
