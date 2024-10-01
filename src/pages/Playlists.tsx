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
import { Skeleton } from "@mui/material";
import Loader from "../components/Loader";

const MyPlaylists = () => {
  const [featuredPlaylists, setFeaturedPlaylists] = useState<
    PlaylistResponse[]
  >([]);
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const [showAnimatedLoader, setShowAnimatedLoader] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const currentUserPlaylists = useAppSelector(
    (state) => state.currentUserPlaylists
  );
  const currentlyPlayingTrack = useAppSelector(
    (state) => state.player.currentlyPlayingTrack
  );
  const dispatch = useAppDispatch();

  // Simulating data fetching and show loader for 2s
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimatedLoader(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Fetching current user's playlists
  useEffect(() => {
    if (accessToken) {
      setIsLoading(true);

      fetchCurrentUserPlaylists(accessToken)
        .then((data) => {
          dispatch(setCurrentUserPlaylists(data));
          setTimeout(() => {
            setIsLoading(false);
          }, 3000);
        })
        .catch(console.error);
    }
  }, [accessToken, dispatch]);

  // Fetching featured playlists
  useEffect(() => {
    if (accessToken) {
      setIsLoading(true);

      fetchFeaturedPlaylists(accessToken)
        .then((data) => {
          setFeaturedPlaylists(data);
          setTimeout(() => {
            setIsLoading(false);
          }, 3000);
        })
        .catch(console.error);
    }
  }, [accessToken]);

  // Rendering current user's playlists
  const userPlaylists = currentUserPlaylists.map((playlist) => (
    <Link to={`${playlist.id}`} key={playlist.id} className="space-y-2">
      {isLoading ? (
        <Skeleton
          variant="rounded"
          animation="wave"
          height="13rem"
          sx={{
            bgcolor: isDarkMode ? `grey.800` : `grey.400`,
          }}
        />
      ) : playlist.images ? (
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
        {isLoading ? (
          <Skeleton
            variant="text"
            animation="wave"
            sx={{
              fontSize: "1rem",
              bgcolor: isDarkMode ? `grey.800` : `grey.400`,
            }}
          />
        ) : (
          <p className="text-xs md:text-sm">
            {playlist.name.length >= 20
              ? `${playlist.name.slice(0, 20)}...`
              : playlist.name}{" "}
          </p>
        )}

        {isLoading ? (
          <Skeleton
            variant="text"
            animation="wave"
            sx={{
              fontSize: "1rem",
              bgcolor: isDarkMode ? `grey.800` : `grey.400`,
            }}
          />
        ) : (
          <p className="text-[10px] md:text-xs text-secondary-text">
            {playlist.owner.display_name}
          </p>
        )}
      </div>
    </Link>
  ));

  // Rendering featured playlists
  const playlists = featuredPlaylists.map((playlist) => (
    <Link to={`${playlist.id}`} key={playlist.id} className="space-y-2">
      {isLoading ? (
        <Skeleton
          variant="rounded"
          animation="wave"
          height="13rem"
          sx={{
            bgcolor: isDarkMode ? `grey.800` : `grey.400`,
          }}
        />
      ) : (
        <img
          src={playlist.images[0].url}
          alt="album-image"
          className="rounded-xl shadow-2xl h-52 w-full"
        />
      )}

      <div>
        {isLoading ? (
          <Skeleton
            variant="text"
            animation="wave"
            sx={{
              fontSize: "1rem",
              bgcolor: isDarkMode ? `grey.800` : `grey.400`,
            }}
          />
        ) : (
          <p className="text-xs md:text-sm">
            {playlist.name.length >= 20
              ? `${playlist.name.slice(0, 20)}...`
              : playlist.name}{" "}
          </p>
        )}

        {isLoading ? (
          <Skeleton
            variant="text"
            animation="wave"
            sx={{
              fontSize: "1rem",
              bgcolor: isDarkMode ? `grey.800` : `grey.400`,
            }}
          />
        ) : (
          <p className="text-[10px] md:text-xs text-secondary-text">
            {playlist.owner.display_name}
          </p>
        )}
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

              {showAnimatedLoader ? (
                <Loader />
              ) : (
                <div
                  className={`${
                    currentlyPlayingTrack
                      ? "px-4 md:px-8 pt-4 md:pt-8 pb-52 md:pb-32"
                      : "p-4 md:p-8"
                  } space-y-6 md:space-y-10 w-full`}
                >
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
              )}
            </main>
          </div>
        }
      />

      <Route path=":playlistId" element={<Playlist />} />
    </Routes>
  );
};

export default MyPlaylists;
