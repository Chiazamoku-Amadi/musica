import { useAppDispatch, useAppSelector } from "../app/hooks";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import User from "../components/User";
import { toggleTheme } from "../features/theme/themeSlice";
import { toggleNavbar } from "../features/navbar/navbarSlice";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  playTrack,
  setCurrentlyPlayingTrack,
} from "../features/player/playerSlice";
import { CurrentlyPlayingTrackResponse } from "../types/types";
import Loader from "../components/Loader";
import { fetchAlbum } from "../spotifyAPI";
import { AlbumResponse } from "../types/types";

const Album = () => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const [showAnimatedLoader, setShowAnimatedLoader] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const currentlyPlayingTrack = useAppSelector(
    (state) => state.player.currentlyPlayingTrack
  );
  const [album, setAlbum] = useState<AlbumResponse>();
  const selectedArtist = useAppSelector(
    (state) => state.selectedArtist.selectedArtist
  );
  const selectedAlbumId = useParams().albumId;

  const dispatch = useAppDispatch();

  // Simulating data fetching and show loader for 2s
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimatedLoader(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Fetching one album
  useEffect(() => {
    if (accessToken && selectedAlbumId) {
      setIsLoading(true);

      fetchAlbum(accessToken, selectedAlbumId)
        .then((data) => {
          setAlbum(data);
          setTimeout(() => {
            setIsLoading(false);
          }, 3000);
        })
        .catch(console.error);
    }
  }, [accessToken, selectedAlbumId]);

  const tracks =
    album &&
    album.tracks.items.map((track, index) => {
      const minutes = Math.floor(track.duration_ms / 60000);
      const seconds = track.duration_ms % 60;

      // Handles clicking a track to play it
      const handleTrackClick = async () => {
        const currentTrack: CurrentlyPlayingTrackResponse = {
          is_playing: true, // We want the track to start playing once clicked
          progress_ms: 0,
          item: {
            id: track.id,
            name: track.name,
            album: album,
            artists: track.artists,
            duration_ms: track.duration_ms,
            added_at: track.added_at,
            preview_url: track.preview_url,
            isLoading: isLoading,
          },
        };

        // Dispatch the action to set the currently playing track
        dispatch(setCurrentlyPlayingTrack(currentTrack));

        // Dispatch the action to play the track
        dispatch(playTrack());
      };

      let currentTrack;
      if (track.id === currentlyPlayingTrack?.item.id) {
        currentTrack = track;
      }

      return (
        <tr
          key={track.id}
          className={`text-xs border-b cursor-pointer hover:text-primary-text ${
            isDarkMode ? "hover:bg-[#a1a1a1]" : "hover:bg-[#b8b8b8]"
          }
              ${
                currentTrack
                  ? `${
                      isDarkMode ? "bg-[#a1a1a1]" : "bg-[#b8b8b8]"
                    } text-primary-text`
                  : "odd:bg-white even:bg-light-topbar-bg"
              }
            `}
          onClick={handleTrackClick}
        >
          <td scope="row" className="px-6 py-4 w-[5%] font-medium">
            {index + 1}
          </td>
          <td className="px-6 py-4 w-[30%]">
            {track.name.length >= 40
              ? `${track.name.slice(0, 40)}...`
              : track.name}
          </td>
          <td className="px-6 py-4 w-[30%]">
            {album.name.length >= 40
              ? `${album.name.slice(0, 40)}...`
              : album.name}
          </td>
          <td className="px-6 py-4 w-[25%]">{album.release_date}</td>
          <td className="px-6 py-4 w-[10%]">{`${minutes}:${
            seconds < 10 ? "0" : ""
          }${seconds}`}</td>
        </tr>
      );
    });

  return (
    <div className="flex justify-end overflow-hidden h-screen w-full">
      <Navbar />

      <main
        className={`${
          isDarkMode ? "bg-dark-background" : "bg-light-background"
        } overflow-y-auto h-screen w-full`}
      >
        {album ? (
          showAnimatedLoader ? (
            <Loader />
          ) : (
            <>
              <section
                className={`sticky top-0 z-10 backdrop-filter backdrop-blur-lg bg-opacity-80 ${
                  isDarkMode ? "bg-dark-topbar-bg" : "bg-light-topbar-bg"
                } p-4 md:p-8 h-2/5 w-full`}
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
                    to={`/home/artists/${selectedArtist?.id}`}
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

                  <div className="flex justify-start items-end gap-x-4 md:gap-x-8">
                    {album.images && album.images.length > 0 && (
                      <img
                        src={album.images[0].url}
                        alt="playlist-image"
                        className="object-cover rounded-lg w-32 md:w-40 h-32 md:h-40"
                      />
                    )}

                    <h4
                      className={`text-xl md:text-6xl text-dark-background font-medium ${
                        isDarkMode ? "text-opacity-100" : "text-opacity-80"
                      }`}
                    >
                      {album.name}
                    </h4>
                  </div>
                </div>
              </section>

              <section
                className={`flex flex-col gap-y-4 px-4 md:px-8 pt-2 md:pt-4 pb-4 md:pb-8 ${
                  currentlyPlayingTrack
                    ? "pb-52 md:pb-32"
                    : "px-4 md:px-8 pt-2 md:pt-4 pb-4 md:pb-8"
                } w-full`}
              >
                <Icon
                  icon="prime:list"
                  className={`text-3xl self-end ${
                    isDarkMode ? "text-secondary-text" : "text-dark-topbar-bg"
                  }`}
                />

                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead
                      className={`text-xs text-white uppercase bg-dark-topbar-bg ${
                        isDarkMode ? "bg-opacity-100" : "bg-opacity-50"
                      } w-full`}
                    >
                      <tr>
                        <th scope="col" className="px-6 py-3 w-[5%]">
                          #
                        </th>
                        <th scope="col" className="px-6 py-3 w-[30%]">
                          Title
                        </th>
                        <th scope="col" className="px-6 py-3 w-[30%]">
                          Album
                        </th>
                        <th scope="col" className="px-6 py-3 w-[25%]">
                          Release Date
                        </th>
                        <th scope="col" className="px-6 py-3 w-[10%]">
                          <Icon
                            icon="fluent:clock-20-filled"
                            className="text-xl"
                          />
                        </th>
                      </tr>
                    </thead>
                    <tbody>{tracks}</tbody>
                  </table>
                </div>
              </section>
            </>
          )
        ) : (
          <Loader />
        )}
      </main>
    </div>
  );
};

export default Album;
