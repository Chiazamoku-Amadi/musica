import React, { useEffect, useState } from "react";
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
import Loader from "./components/Loader";
import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  // To ensure the access token is always available (even after a page refreshes)
  useEffect(() => {
    // Check for token in local storage
    const token = localStorage.getItem("access_token");

    if (token) {
      // Rehydrate token into Redux
      dispatch(setAccessToken(token));
    }
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Routes>
        {/* Route for login */}
        <Route path="/login" element={<Login />} />
        <Route path="/callback" element={<Callback />} />

        {/* Protected Routes */}
        <Route
          path="/home/*"
          element={
            <ProtectedRoute>{isLoading ? <Loader /> : <Home />}</ProtectedRoute>
          }
        />
        <Route
          path="/discover"
          element={
            <ProtectedRoute>
              <Discover />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route
          path="/playlists/*"
          element={
            <ProtectedRoute>
              <Playlists />
            </ProtectedRoute>
          }
        />

        {/* Default route redirects to login or home based on authentication */}
        <Route
          path="/"
          element={
            localStorage.getItem("access_token") ? (
              <Navigate replace to="/home" />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
      </Routes>

      <CreateNewPlaylistModal />
      <Player />
    </>
  );
};

export default App;
