import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setAccessToken } from "../features/auth/authSlice";
import { getAccessToken } from "../spotifyAuth";
import { TokenResponse } from "../types/types";
import { useAppDispatch } from "../app/hooks";

const Callback: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // The user is typically redirected to http://myApp.com/callback?code=AUTH_CODE
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search); // Extract the auth code from the url
    const authCode = urlParams.get("code");

    // If there is an auth code, exchange it for an access token
    if (authCode) {
      getAccessToken(authCode)
        .then((data: TokenResponse) => {
          dispatch(setAccessToken(data.access_token)); // Dispatch an action to save the access token in the Redux store
          navigate("/home"); // Redirect to home page
        })
        .catch((error) => {
          console.error("Error getting access token:", error);
        });
    }
  }, [dispatch, location, navigate]);

  return <div>Loading Home Page...</div>;
};

export default Callback;
