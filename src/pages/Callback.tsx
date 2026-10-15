import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "../features/auth/authSlice";
import { getAccessToken, verifyAuthState } from "../spotifyAuth";
import { useAppDispatch } from "../app/hooks";
import Loader from "../components/Loader";

const LOGIN_ROUTE = "/";

const Callback: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const hasRun = useRef(false);

  // The user is typically redirected to http://myApp.com/callback?code=AUTH_CODE
  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const completeLogin = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const state = params.get("state");
      const error = params.get("error");

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
