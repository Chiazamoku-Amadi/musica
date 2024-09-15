import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";
import {
  fetchCurrentUserPlaylists,
  fetchFeaturedPlaylists,
} from "../spotifyAPI";
import { PlaylistResponse } from "../types/types";
import playlistAvatar from "../assets/playlist-avatar.png";
import { setCurrentUserPlaylists } from "../features/playlist/currentUserPlaylistsSlice";
import { Link, Route, Routes } from "react-router-dom";
import Playlist from "./Playlist";

const MyPlaylists = () => {
  const [featuredPlaylists, setFeaturedPlaylists] = useState<
    PlaylistResponse[]
  >([]);
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const currentUserPlaylists = useAppSelector(
    (state) => state.currentUserPlaylists
  );
  const dispatch = useAppDispatch();

  // Fetching current user's playlists
  useEffect(() => {
    if (accessToken) {
      fetchCurrentUserPlaylists(accessToken)
        .then((data) => dispatch(setCurrentUserPlaylists(data)))
        .catch(console.error);
    }
  }, [accessToken, dispatch]);

  // Fetching featured playlists
  useEffect(() => {
    if (accessToken) {
      fetchFeaturedPlaylists(accessToken)
        .then((data) => setFeaturedPlaylists(data))
        .catch(console.error);
    }
  }, [accessToken]);

  // Rendering current user's playlists
  const userPlaylists = currentUserPlaylists.map((playlist) => (
    <Link to={`${playlist.id}`} key={playlist.id} className="space-y-2">
      {playlist.images ? (
        <img
          src={playlist.images[0].url}
          alt="album-image"
          className="rounded-xl shadow-2xl h-52 w-full"
        />
      ) : (
        <div
          className={`flex justify-center items-center rounded-lg ${
            isDarkMode ? "bg-dark-navbar-bg" : "bg-dark-topbar-bg bg-opacity-80"
          }`}
        >
          <img
            src={playlistAvatar}
            alt="playlist-avatar"
            className="object-contain w-40 h-52"
          />
        </div>
      )}

      <div>
        <p className="text-xs md:text-sm">
          {playlist.name.length >= 20
            ? `${playlist.name.slice(0, 20)}...`
            : playlist.name}{" "}
        </p>
        <p className="text-[10px] md:text-xs text-secondary-text">
          {playlist.owner.display_name}
        </p>
      </div>
    </Link>
  ));

  // Rendering featured playlists
  const playlists = featuredPlaylists.map((playlist) => (
    <Link to={`${playlist.id}`} key={playlist.id} className="space-y-2">
      <img
        src={playlist.images[0].url}
        alt="album-image"
        className="rounded-xl shadow-2xl h-52 w-full"
      />

      <div>
        <p className="text-xs md:text-sm">
          {playlist.name.length >= 20
            ? `${playlist.name.slice(0, 20)}...`
            : playlist.name}{" "}
        </p>
        <p className="text-[10px] md:text-xs text-secondary-text">
          {playlist.owner.display_name}
        </p>
      </div>
    </Link>
  ));

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="flex justify-end overflow-hidden h-screen w-full">
            <Navbar />

            <main
              className={`${
                isDarkMode ? "bg-dark-background" : "bg-light-background"
              } overflow-y-auto h-screen w-full`}
            >
              <Topbar />

              <div className="space-y-6 md:space-y-10 p-4 md:p-8 w-full">
                <section
                  className={`${
                    isDarkMode ? "text-primary-text" : "text-dark-background"
                  } w-full`}
                >
                  <h3 className="text-2xl md:text-3xl font-medium mb-4">
                    My Playlists
                  </h3>

                  <div className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6 xs:gap-x-3">
                    {userPlaylists}
                  </div>
                </section>

                <section
                  className={`${
                    isDarkMode ? "text-primary-text" : "text-dark-background"
                  } w-full`}
                >
                  <h3 className="text-2xl md:text-3xl font-medium mb-4">
                    Featured Playlists
                  </h3>

                  <div className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6 xs:gap-x-3">
                    {playlists}
                  </div>
                </section>
              </div>
            </main>
          </div>
        }
      />

      <Route path=":playlistId" element={<Playlist />} />
    </Routes>
  );
};

export default MyPlaylists;
