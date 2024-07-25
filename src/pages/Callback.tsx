import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setAccessToken } from "../features/auth/authSlice";
import { useAppSelector } from "../app/hooks";
import { fetchSpotifyData } from "../spotifyAPI";
import { getAccessToken, TokenResponse } from "../spotifyAuth";

const Callback: React.FC = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  const dispatch = useDispatch();
  const location = useLocation();

  // The user is typically redirected to http://myApp.com/callback?code=AUTH_CODE
  useEffect(() => {
    // Extract the auth code from the url
    const urlParams = new URLSearchParams(location.search);
    const authCode = urlParams.get("code");

    // If there is an auth code, exchange it for an access token
    if (authCode) {
      getAccessToken(authCode)
        .then((data: TokenResponse) => {
          // Dispatch an action to save the access token in the Redux store
          dispatch(setAccessToken(data.access_token));
          return fetchSpotifyData("me", data.access_token);
        })
        .catch((error) => {
          console.error("Error getting access token:", error);
          // Handle the error appropriately
        });
    }
  }, [dispatch, location, accessToken]);

  return <div>Loading...</div>;
};

export default Callback;
