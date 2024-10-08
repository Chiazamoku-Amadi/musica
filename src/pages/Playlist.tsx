import { useAppDispatch, useAppSelector } from "../app/hooks";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import User from "../components/User";
import { toggleTheme } from "../features/theme/themeSlice";
import { toggleNavbar } from "../features/navbar/navbarSlice";
import playlistAvatar from "../assets/playlist-avatar.png";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPlaylist } from "../spotifyAPI";
import { toggleModal } from "../features/modal/addTracksToPlaylistModalSlice";
import AddToPlaylistModal from "../components/modal/AddToPlaylistModal";
import { setCurrentPlaylist } from "../features/playlist/currentPlaylistSlice";
import {
  playTrack,
  setCurrentlyPlayingTrack,
} from "../features/player/playerSlice";
import { CurrentlyPlayingTrackResponse } from "../types/types";
import Loader from "../components/Loader";

const Playlist = () => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const [showAnimatedLoader, setShowAnimatedLoader] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const currentPlaylist = useAppSelector(
    (state) => state.currentPlaylist.currentPlaylist
  );
  const currentlyPlayingTrack = useAppSelector(
    (state) => state.player.currentlyPlayingTrack
  );
  const currentPlaylistId = useParams().playlistId;

  const dispatch = useAppDispatch();

  // Simulating data fetching and show loader for 2s
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimatedLoader(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Fetching current playlist
  useEffect(() => {
    if (accessToken && currentPlaylistId) {
      fetchPlaylist(accessToken, currentPlaylistId)
        .then((data) => {
          dispatch(
            setCurrentPlaylist({
              id: data.id,
              name: data.name,
              description: data.description,
              images: data.images,
              owner: data.owner,
              public: data.public,
              tracks: data.tracks,
            })
          );
          setTimeout(() => {
            setIsLoading(false);
          }, 3000);
        })
        .catch(console.error);
    }
  }, [accessToken, currentPlaylistId, dispatch]);

  const tracks =
    currentPlaylist &&
    currentPlaylist.tracks.items.map((track, index) => {
      const timeAdded = new Date(track.added_at).toLocaleDateString();
      const minutes = Math.floor(track.track.duration_ms / 60000);
      const seconds = track.track.duration_ms % 60;

      const timeSince = (date: string | number | Date): string => {
        const now = new Date(); // Returns the current date in a Date object format
        const trackDate = new Date(date); // Converts the date the track was added into a Date object
        const differenceInMS = now.getTime() - trackDate.getTime(); // Returns the difference between the current date and the date the track was added in ms

        const minutes = Math.floor(differenceInMS / (1000 * 60)); // Converts the difference to minutes
        const hours = Math.floor(differenceInMS / (1000 * 60 * 60)); // Converts the difference to hours
        const days = Math.floor(differenceInMS / (1000 * 60 * 60 * 24)); // Converts the difference to days
        const weeks = Math.floor(differenceInMS / (1000 * 60 * 60 * 24 * 7)); // Converts the difference to weeks
        const years = Math.floor(
          differenceInMS / (1000 * 60 * 60 * 24 * 7 * 52)
        ); // Converts the difference to years

        // Conditionally returns the difference
        if (minutes < 60) {
          return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
        } else if (hours < 24) {
          return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
        } else if (days < 7) {
          return `${days} ${days === 1 ? "day" : "days"} ago`;
        } else if (weeks < 52) {
          return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
        } else {
          return `${years} ${years === 1 ? "year" : "years"} ago`;
        }
      };

      // Handles clicking a track to play it
      const handleTrackClick = async () => {
        const currentTrack: CurrentlyPlayingTrackResponse = {
          is_playing: true, // We want the track to start playing once clicked
          progress_ms: 0,
          item: {
            id: track.track.id,
            name: track.track.name,
            album: track.track.album,
            artists: track.track.artists,
            duration_ms: track.track.duration_ms,
            added_at: track.track.added_at,
            preview_url: track.track.preview_url,
            isLoading: isLoading,
          },
        };

        // Dispatch the action to set the currently playing track
        dispatch(setCurrentlyPlayingTrack(currentTrack));

        // Dispatch the action to play the track
        dispatch(playTrack());
      };

      let currentTrack;
      if (track.track.id === currentlyPlayingTrack?.item.id) {
        currentTrack = track.track;
      }

      return (
        <tr
          key={track.track.id}
          className={`text-xs border-b cursor-pointer ${
            isDarkMode
              ? "bg-dark-topbar-bg hover:bg-dark-navbar-bg text-primary-text border-b-dark-navbar-bg"
              : "bg-light-topbar-bg hover:bg-zinc-400 hover:bg-opacity-40 text-dark-background border-b-light-navbar-bg border-opacity-10"
          }
            ${
              currentTrack &&
              `${
                isDarkMode
                  ? "bg-dark-navbar-bg bg-opacity-50"
                  : "bg-zinc-400 bg-opacity-40"
              }`
            }
          `}
          onClick={handleTrackClick}
        >
          <td scope="row" className="px-6 py-4 w-[5%] font-medium">
            {index + 1}
          </td>
          <td className="px-6 py-4 w-[30%]">
            {track.track.name.length >= 25
              ? `${track.track.name.slice(0, 25)}...`
              : track.track.name}
          </td>
          <td className="px-6 py-4 w-[30%]">
            {track.track.album.name.length >= 25
              ? `${track.track.album.name.slice(0, 25)}...`
              : track.track.album.name}
          </td>
          <td className="px-6 py-4 w-[25%]">{timeSince(timeAdded)}</td>
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
        {currentPlaylist ? (
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
                    to={"/playlists"}
                    className={`flex justify-center items-center gap-2 self-start hover:text-dark-background cursor-pointer ${
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

                  <div className="flex justify-between items-end">
                    <div className="flex flex-col md:flex-row justify-start items-start md:items-end gap-y-4 md:gap-x-8">
                      {currentPlaylist.images &&
                      currentPlaylist.images.length > 0 ? (
                        <img
                          src={currentPlaylist.images[0].url}
                          alt="playlist-image"
                          className="object-cover rounded-lg w-24 md:w-40 h-24 md:h-40"
                        />
                      ) : (
                        <div
                          className={`flex justify-center items-center rounded-lg ${
                            isDarkMode
                              ? "bg-dark-navbar-bg"
                              : "bg-dark-topbar-bg bg-opacity-80"
                          }`}
                        >
                          <img
                            src={playlistAvatar}
                            alt="playlist-avatar"
                            className="object-cover w-24 md:w-40 h-24 md:h-40"
                          />
                        </div>
                      )}

                      <div className="flex flex-col justify-center items-start gap-y-0 md:gap-y-2">
                        <p className="text-xs md:text-sm text-secondary-text">
                          {currentPlaylist.public
                            ? "Public Playlist"
                            : "Private Playlist"}
                        </p>
                        <h4
                          className={`text-lg md:text-6xl font-medium ${
                            isDarkMode
                              ? "text-primary-text text-opacity-100"
                              : "text-dark-background text-opacity-80"
                          }`}
                        >
                          {currentPlaylist.name}
                        </h4>
                        <p className="text-xs md:text-sm text-secondary-text font-bold">
                          {currentPlaylist.owner.display_name}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => dispatch(toggleModal())}
                      className={`${
                        isDarkMode
                          ? "bg-dark-navbar-bg hover:bg-opacity-90"
                          : "bg-dark-topbar-bg bg-opacity-80 hover:bg-opacity-70"
                      } text-xs md:text-base text-white py-2 px-4 md:px-8 rounded-lg`}
                    >
                      Add Songs
                    </button>
                  </div>
                </div>
              </section>

              <section
                className={`flex flex-col gap-y-4 ${
                  currentlyPlayingTrack
                    ? "pb-52 md:pb-32"
                    : "px-4 md:px-8 pt-2 md:pt-4 pb-4 md:pb-8"
                } px-4 md:px-8 pt-2 md:pt-4 pb-4 md:pb-8 w-full`}
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
                      className={`text-xs uppercase bg-opacity-30
                        ${
                          isDarkMode
                            ? "bg-dark-navbar-bg text-primary-text"
                            : "bg-light-navbar-bg text-dark-background"
                        } 
                      w-full`}
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
                          Date Added
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

      <AddToPlaylistModal
        currentPlaylist={currentPlaylist}
        playlistId={currentPlaylistId || ""}
      />
    </div>
  );
};

export default Playlist;
