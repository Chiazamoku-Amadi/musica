import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Callback from "./pages/Callback";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import Favorites from "./pages/Favorites";
import Playlists from "./pages/Playlists";
import CreateNewPlaylistModal from "./components/modal/CreateNewPlaylistModal";
import Player from "./components/Player";

const App: React.FC = () => {
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
