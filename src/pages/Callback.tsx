import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "../features/auth/authSlice";
import { getAccessToken, verifyAuthState } from "../spotifyAuth";
// import { TokenResponse } from "../types/types";
import { useAppDispatch } from "../app/hooks";
import Loader from "../components/Loader";

const LOGIN_ROUTE = "/";

const Callback: React.FC = () => {
  const dispatch = useAppDispatch();
  // const location = useLocation();
  const navigate = useNavigate();
  const hasRun = useRef(false);

  // The user is typically redirected to http://myApp.com/callback?code=AUTH_CODE
  // useEffect(() => {
  //   const fetchToken = async () => {
  //     try {
  //       await new Promise((resolve) => {
  //         setTimeout(resolve, 3000);
  //       });

  //       const urlParams = new URLSearchParams(window.location.search); // Extract the auth code from the url
  //       const authCode = urlParams.get("code");

  //       // If there is an auth code, exchange it for an access token
  //       if (authCode) {
  //         getAccessToken(authCode).then((data: TokenResponse) => {
  //           dispatch(setAccessToken(data.access_token)); // Dispatch an action to save the access token in the Redux store
  //           navigate("/home"); // Redirect to home page
  //         });
  //       }
  //     } catch (error) {
  //       console.error("Error getting access token:", error);
  //     }
  //   };

  //   fetchToken();
  // }, [dispatch, location, navigate]);

  useEffect(() => {
    // StrictMode runs effects twice in development, and an auth code is single-use
    if (hasRun.current) return;
    hasRun.current = true;

    const completeLogin = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const state = params.get("state");
      const error = params.get("error"); // e.g. access_denied when the user cancels

      if (error || !code) {
        navigate(LOGIN_ROUTE, { replace: true });
        return;
      }

      if (!verifyAuthState(state)) {
        console.error("Spotify auth state mismatch");
        navigate(LOGIN_ROUTE, { replace: true });
        return;
      }

      try {
        const data = await getAccessToken(code);
        dispatch(setAccessToken(data.access_token));
        navigate("/home", { replace: true });
      } catch (err) {
        console.error("Error getting access token:", err);
        navigate(LOGIN_ROUTE, { replace: true });
      }
    };

    completeLogin();
  }, [dispatch, navigate]);

  return <Loader />;
};

export default Callback;
