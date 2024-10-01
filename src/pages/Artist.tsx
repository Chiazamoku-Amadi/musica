import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import User from "../components/User";
import { toggleTheme } from "../features/theme/themeSlice";
import { toggleNavbar } from "../features/navbar/navbarSlice";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchArtistAlbums } from "../spotifyAPI";
import { AlbumResponse } from "../types/types";
import { Skeleton } from "@mui/material";
import Album from "./Album";

const Artist = () => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const selectedArtist = useAppSelector(
    (state) => state.selectedArtist.selectedArtist
  );
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const currentlyPlayingTrack = useAppSelector(
    (state) => state.player.currentlyPlayingTrack
  );
  const [showAnimatedLoader, setShowAnimatedLoader] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [artistAlbums, setArtistAlbums] = useState<AlbumResponse[]>([]);
  const selectedArtistId = useParams().artistId;

  const dispatch = useAppDispatch();

  // Simulating data fetching and show loader for 2s
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimatedLoader(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Fetching artist's albums
  useEffect(() => {
    if (accessToken && selectedArtistId) {
      setIsLoading(true);

      fetchArtistAlbums(accessToken, selectedArtistId)
        .then((data) => {
          setArtistAlbums(data);
          setTimeout(() => {
            setIsLoading(false);
          }, 3000);
        })
        .catch(console.error);
    }
  }, [accessToken, selectedArtistId]);

  const albums = artistAlbums.map((album) => (
    <Link
      to={`albums/${album.id}`}
      key={album.id}
      className="space-y-2 cursor-pointer"
    >
      {isLoading ? (
        <Skeleton
          variant="rounded"
          animation="wave"
          height="13rem"
          sx={{ bgcolor: isDarkMode ? `grey.800` : `grey.400` }}
        />
      ) : (
        <img
          src={album.images[0].url}
          alt="album-image"
          className="rounded-xl shadow-2xl h-52 w-full"
        />
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
        <p className="text-xs md:text-sm">
          {album.name.length >= 20
            ? `${album.name.slice(0, 20)}...`
            : album.name}
        </p>
      )}
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
              {showAnimatedLoader ? (
                <Loader />
              ) : (
                <>
                  <section
                    className={`sticky top-0 z-10 backdrop-filter backdrop-blur-lg bg-opacity-80 ${
                      isDarkMode ? "bg-dark-topbar-bg" : "bg-light-topbar-bg"
                    } p-4 md:p-8 overflow-x-hidden h-2/5 w-full`}
                  >
                    <div className="flex justify-between items-start h-1/5">
                      <Search />

                      <div className="flex items-center gap-4 sm:gap-8">
                        <div
                          className="flex items-center"
                          onClick={() => dispatch(toggleTheme())}
                        >
                          <Icon
                            icon={`${
                              isDarkMode
                                ? "entypo:light-up"
                                : "arcticons:dark-launcher"
                            }`}
                            className={`${
                              isDarkMode
                                ? "text-primary-text"
                                : "text-light-navbar-bg"
                            }  hover:text-dark-background text-lg py-1 cursor-pointer`}
                          />
                        </div>

                        <User />

                        <Icon
                          icon="pajamas:hamburger"
                          className="flex md:hidden text-secondary-text cursor-pointer"
                          onClick={() => dispatch(toggleNavbar())}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col justify-between h-4/5">
                      <Link
                        to={"/home"}
                        className={`flex justify-center items-center gap-1 self-start hover:text-dark-background cursor-pointer ${
                          isDarkMode
                            ? "text-secondary-text"
                            : "text-light-navbar-bg hover:opacity-60"
                        }`}
                      >
                        <Icon
                          icon={`${
                            isDarkMode
                              ? "eva:arrow-back-outline"
                              : "eva:arrow-back-outline"
                          }`}
                          className="text-lg py-1"
                        />

                        <p className="text-sm md:text-base font-medium">Back</p>
                      </Link>

                      <div className="flex justify-start items-end gap-x-4 md:gap-x-8 w-full">
                        {selectedArtist?.images &&
                          selectedArtist.images.length > 0 && (
                            <img
                              src={selectedArtist.images[0].url}
                              alt="playlist-image"
                              className="object-cover rounded-lg w-32 md:w-40 h-32 md:h-40"
                            />
                          )}

                        <h4
                          className={`text-lg md:text-6xl text-dark-background font-medium ${
                            isDarkMode ? "text-opacity-100" : "text-opacity-80"
                          }`}
                        >
                          {selectedArtist?.name}
                        </h4>
                      </div>
                    </div>
                  </section>

                  <section
                    className={`${
                      isDarkMode ? "text-primary-text" : "text-dark-background"
                    } ${
                      currentlyPlayingTrack
                        ? "px-4 md:px-8 pt-4 md:pt-8 pb-52 md:pb-32"
                        : "p-4 md:p-8"
                    } w-full`}
                  >
                    <div className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6 xs:gap-x-3">
                      {albums}
                    </div>
                  </section>
                </>
              )}
            </main>
          </div>
        }
      />

      <Route path="albums/:albumId" element={<Album />} />
    </Routes>
  );
};

export default Artist;
