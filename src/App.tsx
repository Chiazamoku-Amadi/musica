import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Callback from "./pages/Callback";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import Favorites from "./pages/Favorites";
import Playlists from "./pages/Playlists";
import CreateNewPlaylistModal from "./components/modal/CreateNewPlaylistModal";
import Player from "./components/Player";
import { useDispatch } from "react-redux";
import { setAccessToken } from "./features/auth/authSlice";

const App: React.FC = () => {
  const dispatch = useDispatch();

  // To ensure the access token is always available (even after a page refreshes)
  useEffect(() => {
    // Check for token in local storage
    const token = localStorage.getItem("access_token");

    if (token) {
      // Rehydrate token into Redux
      dispatch(setAccessToken(token));
    }
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/home" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/playlists/*" element={<Playlists />} />
      </Routes>

      <CreateNewPlaylistModal />
      <Player />
    </>
  );
};

export default App;
