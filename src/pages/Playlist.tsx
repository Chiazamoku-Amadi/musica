import { useDispatch } from "react-redux";
import { useAppSelector } from "../app/hooks";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import User from "../components/User";
import { toggleTheme } from "../features/theme/themeSlice";
import { toggleNavbar } from "../features/navbar/navbarSlice";
import playlistAvatar from "../assets/playlist-avatar.png";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPlaylist, fetchPlaylistTracks } from "../spotifyAPI";
import { PlaylistResponse, TracksResponse } from "../types/types";

const Playlist = () => {
  const [clickedPlaylistData, setClickedPlaylistData] =
    useState<PlaylistResponse | null>(null);
  const [playlistTracks, setPlaylistTracks] = useState<TracksResponse[]>([]);
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const clickedPlaylistId = useParams().playlistId;

  const dispatch = useDispatch();

  console.log(playlistTracks);

  // Fetching clicked playlist
  useEffect(() => {
    if (accessToken && clickedPlaylistId) {
      fetchPlaylist(accessToken, clickedPlaylistId)
        .then((data) => setClickedPlaylistData(data))
        .catch(console.error);
    }
  }, [accessToken, clickedPlaylistId]);

  // Fetching a playlist's tracks
  useEffect(() => {
    if (accessToken && clickedPlaylistId) {
      fetchPlaylistTracks(accessToken, clickedPlaylistId)
        .then((data) => setPlaylistTracks(data))
        .catch(console.error);
    }
  }, [accessToken, clickedPlaylistId]);

  const tracks = playlistTracks.map((track, index) => {
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
      const years = Math.floor(differenceInMS / (1000 * 60 * 60 * 24 * 7 * 52)); // Converts the difference to years

      // Conditionally returns the difference
      if (minutes < 60) {
        return `${minutes} minutes ago`;
      } else if (hours < 24) {
        return `${hours} hours ago`;
      } else if (days < 7) {
        return `${days} days ago`;
      } else if (weeks < 52) {
        return `${weeks} weeks ago`;
      } else {
        return `${years} years ago`;
      }
    };

    return (
      <tr key={index} className="odd:bg-white even:bg-light-topbar-bg border-b">
        <th scope="row" className="px-6 py-4 w-[5%] font-medium">
          {index + 1}
        </th>
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
        <td className="px-6 py-4 w-[10%]">{`${minutes}:${seconds}`}</td>
      </tr>
    );
  });

  return (
    <>
      {clickedPlaylistData ? (
        <div className="flex justify-end overflow-hidden h-screen w-full">
          <Navbar />

          <main
            className={`${
              isDarkMode ? "bg-dark-background" : "bg-light-background"
            } overflow-y-auto h-screen w-full`}
          >
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
                    {isDarkMode ? (
                      <Icon
                        icon="entypo:light-up"
                        className={`text-primary-text hover:text-dark-background text-lg py-1 cursor-pointer`}
                      />
                    ) : (
                      <Icon
                        icon="arcticons:dark-launcher"
                        className={`text-light-navbar-bg hover:text-dark-background text-lg py-1 cursor-pointer`}
                      />
                    )}
                  </div>

                  <User />

                  <Icon
                    icon="pajamas:hamburger"
                    className="flex md:hidden text-secondary-text cursor-pointer"
                    onClick={() => dispatch(toggleNavbar())}
                  />
                </div>
              </div>

              <div className="flex justify-start items-end gap-x-8 h-4/5">
                {clickedPlaylistData.images ? (
                  <img
                    src={clickedPlaylistData.images[0].url}
                    alt="playlist-image"
                    className="object-cover rounded-lg w-40 h-40"
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
                      className="object-cover w-40 h-40 "
                    />
                  </div>
                )}

                <div className="flex flex-col justify-center items-start gap-y-2">
                  <p className="text-xs md:text-sm text-secondary-text">
                    {clickedPlaylistData.public
                      ? "Public Playlist"
                      : "Private Playlist"}
                  </p>
                  <h4
                    className={`text-lg md:text-6xl text-dark-background font-medium ${
                      isDarkMode ? "text-opacity-100" : "text-opacity-80"
                    }`}
                  >
                    {clickedPlaylistData.name}
                  </h4>
                  <p className="text-xs md:text-sm text-secondary-text font-bold">
                    {clickedPlaylistData.owner.display_name}
                  </p>
                </div>
              </div>
            </section>

            <section className="flex flex-col gap-y-4 px-4 md:px-8 pt-2 md:pt-4 pb-4 md:pb-8 w-full">
              <Icon
                icon="prime:list"
                className={`text-3xl self-end ${
                  isDarkMode ? "text-secondary-text" : "text-dark-topbar-bg"
                }`}
              />

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
                      Date Added
                    </th>
                    <th scope="col" className="px-6 py-3 w-[10%]">
                      <Icon icon="fluent:clock-20-filled" className="text-xl" />
                    </th>
                  </tr>
                </thead>
                <tbody>{tracks}</tbody>
              </table>
            </section>
          </main>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Playlist;
