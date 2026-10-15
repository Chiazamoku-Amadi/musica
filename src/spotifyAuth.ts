// Creating Utility Functions for Authentication
import api from "./api";
import store from "./app/store";
import { setAccessToken } from "./features/auth/authSlice";
import { TokenResponse } from "./types/types";

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
// const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
// const authUrl = new URL("https://accounts.spotify.com/authorize");

if (!clientId || !redirectUri) {
  throw new Error(
    "Missing VITE_SPOTIFY_CLIENT_ID or VITE_SPOTIFY_REDIRECT_URI",
  );
}

const AUTH_URL = "https://accounts.spotify.com/authorize";
const TOKEN_URL = "https://accounts.spotify.com/api/token";

// Only request what the app uses. Remove any scope you can't tie to a feature.
const SCOPES =
  "user-read-private user-read-email user-read-recently-played user-library-read playlist-modify-public playlist-modify-private playlist-read-private";

// Create Code Verifier
const generateRandomString = (length: number) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));

  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

// Code Challenge
const sha256 = async (plain: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);

  return window.crypto.subtle.digest("SHA-256", data);
};

const base64encode = (input: ArrayBuffer) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

// Authorization Request: Creating the spotify auth url
// export const getSpotifyAuthURL = async (): Promise<string> => {
//   const existingCodeVerifier = window.localStorage.getItem("code_verifier");
//   let codeVerifier;

//   if (existingCodeVerifier) {
//     codeVerifier = existingCodeVerifier;
//   } else {
//     codeVerifier = generateRandomString(64); // Generates a cryptographically sound random string of length 64
//     window.localStorage.setItem("code_verifier", codeVerifier);
//   }

//   const scope =
//     "user-read-private user-read-email user-read-recently-played user-library-read playlist-modify-public playlist-modify-private playlist-read-private user-read-currently-playing user-modify-playback-state user-read-playback-state";
//   const hashed = await sha256(codeVerifier); // Creates a SHA-256 hash of the code verifier. The resulting hashed value is an ArrayBuffer
//   const codeChallenge = base64encode(hashed); // Encodes the hashed value using Base64 URL encoding

//   window.localStorage.setItem("code_verifier", codeVerifier); // Store code verifier in local storage

//   const params = {
//     response_type: "code",
//     client_id: clientId,
//     scope,
//     code_challenge_method: "S256",
//     code_challenge: codeChallenge,
//     redirect_uri: redirectUri,
//   };

//   authUrl.search = new URLSearchParams(params).toString(); // Constructs the full authorization URL with the query parameters from the params object

//   return authUrl.toString(); // Redirects the user's browser to this URL
// };

export const getSpotifyAuthURL = async (): Promise<string> => {
  // Fresh verifier and state for every authorization request
  const codeVerifier = generateRandomString(64);
  const state = generateRandomString(16);

  window.localStorage.setItem("code_verifier", codeVerifier);
  window.sessionStorage.setItem("spotify_auth_state", state);

  const codeChallenge = base64encode(await sha256(codeVerifier));

  const url = new URL(AUTH_URL);
  url.search = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope: SCOPES,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
    state,
  }).toString();

  return url.toString();
};

export const verifyAuthState = (returnedState: string | null): boolean => {
  const expected = window.sessionStorage.getItem("spotify_auth_state");
  window.sessionStorage.removeItem("spotify_auth_state");
  return !!expected && expected === returnedState;
};

// Access Token Request: Getting the access token - Exchanging the auth code for an access token
// export const getAccessToken = async (code: string): Promise<TokenResponse> => {
//   const codeVerifier = localStorage.getItem("code_verifier");

//   if (!codeVerifier) {
//     throw new Error("No code verifier found in local storage");
//   }

//   const params = new URLSearchParams({
//     grant_type: "authorization_code",
//     code,
//     redirect_uri: redirectUri,
//     client_id: clientId,
//     code_verifier: codeVerifier,
//   });

//   const response = await api.post<TokenResponse>(
//     "https://accounts.spotify.com/api/token",
//     params,
//     {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
//       },
//     }
//   );

//   localStorage.setItem("access_token", response.data.access_token);
//   localStorage.setItem("refresh_token", response.data.refresh_token);
//   localStorage.removeItem("code_verifier");

//   return response.data;
// };

export const getAccessToken = async (code: string): Promise<TokenResponse> => {
  const codeVerifier = localStorage.getItem("code_verifier");

  if (!codeVerifier) {
    throw new Error("No code verifier found in local storage");
  }

  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    code_verifier: codeVerifier,
  });

  const response = await api.post<TokenResponse>(TOKEN_URL, params, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  localStorage.setItem("access_token", response.data.access_token);
  localStorage.setItem("refresh_token", response.data.refresh_token);
  localStorage.removeItem("code_verifier");

  return response.data;
};

// Refresh Token Request: Getting the refresh token
// export const getRefreshToken = async () => {
//   // Refresh token that has been previously stored
//   const refreshToken = localStorage.getItem("refresh_token");

//   if (!refreshToken) {
//     throw new Error("No refresh token found in local storage");
//   }

//   const params = new URLSearchParams({
//     grant_type: "refresh_token",
//     refresh_token: refreshToken,
//     client_id: clientId,
//   });

//   const response = await api.post(
//     "https://accounts.spotify.com/api/token",
//     params,
//     {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
//       },
//     }
//   );

//   localStorage.setItem("access_token", response.data.access_token);
//   store.dispatch(setAccessToken(response.data.access_token));

//   localStorage.setItem("refresh_token", response.data.refresh_token);

//   return response.data.access_token;
// };

export const getRefreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");

  if (!refreshToken) {
    throw new Error("No refresh token found in local storage");
  }

  const params = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: clientId,
  });

  const response = await api.post<TokenResponse>(TOKEN_URL, params, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  const { access_token, refresh_token: newRefreshToken } = response.data;

  localStorage.setItem("access_token", access_token);
  store.dispatch(setAccessToken(access_token));

  // Spotify may not return a new refresh token; keep the old one if so
  if (newRefreshToken) {
    localStorage.setItem("refresh_token", newRefreshToken);
  }

  return access_token;
};
