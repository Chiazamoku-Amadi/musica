// Creating Utility Functions for Authentication
import api from "./api";

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

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
export const getSpotifyAuthURL = async (): Promise<string> => {
  const scopes = "user-read-private user-read-email";
  const codeVerifier = generateRandomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  // Store code verifier in local storage
  window.localStorage.setItem("code_verifier", codeVerifier);
  console.log("set", codeChallenge);

  return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${encodeURIComponent(scopes)}&code_challenge=${encodeURIComponent(
    codeChallenge
  )}&code_challenge_method=S256`;
};

// Access Token Request: Getting the access token - Exchanging the auth code for an access token
export const getAccessToken = async (code: string): Promise<TokenResponse> => {
  const codeVerifier = window.localStorage.getItem("code_verifier");
  console.log("get", codeVerifier);

  if (!codeVerifier) {
    throw new Error("Code verifier not found in local storage");
  }

  const response = await api.post<TokenResponse>(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      code_verifier: codeVerifier,
    }).toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      },
    }
  );

  return response.data;
};
