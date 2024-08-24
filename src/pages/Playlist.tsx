import { useDispatch } from "react-redux";
import { useAppSelector } from "../app/hooks";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import User from "../components/User";
import { toggleTheme } from "../features/theme/themeSlice";
import { toggleNavbar } from "../features/navbar/navbarSlice";
import playlistAvatar from "../assets/playlist-avatar.png";

const Playlist = () => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  const dispatch = useDispatch();

  const allTracks = [
    {
      id: 1,
      title: "Title",
      album: "Album",
      dateAdded: "Date Added",
      duration: "Duration",
    },
    {
      id: 2,
      title: "Title",
      album: "Album",
      dateAdded: "Date Added",
      duration: "Duration",
    },
    {
      id: 3,
      title: "Title",
      album: "Album",
      dateAdded: "Date Added",
      duration: "Duration",
    },
    {
      id: 4,
      title: "Title",
      album: "Album",
      dateAdded: "Date Added",
      duration: "Duration",
    },
    {
      id: 5,
      title: "Title",
      album: "Album",
      dateAdded: "Date Added",
      duration: "Duration",
    },
    {
      id: 6,
      title: "Title",
      album: "Album",
      dateAdded: "Date Added",
      duration: "Duration",
    },
    {
      id: 7,
      title: "Title",
      album: "Album",
      dateAdded: "Date Added",
      duration: "Duration",
    },
    {
      id: 8,
      title: "Title",
      album: "Album",
      dateAdded: "Date Added",
      duration: "Duration",
    },
    {
      id: 9,
      title: "Title",
      album: "Album",
      dateAdded: "Date Added",
      duration: "Duration",
    },
    {
      id: 10,
      title: "Title",
      album: "Album",
      dateAdded: "Date Added",
      duration: "Duration",
    },
  ];

  const tracks = allTracks.map((track, index) => (
    <tr key={index} className="odd:bg-white even:bg-light-topbar-bg border-b">
      <th scope="row" className="px-6 py-4 w-[5%] font-medium">
        {track.id}
      </th>
      <td className="px-6 py-4 w-[30%]">{track.title}</td>
      <td className="px-6 py-4 w-[30%]">{track.album}</td>
      <td className="px-6 py-4 w-[25%]">{track.dateAdded}</td>
      <td className="px-6 py-4 w-[10%]">{track.duration}</td>
    </tr>
  ));

  return (
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

            <div className="flex flex-col justify-center items-start gap-y-2">
              <p className="text-xs md:text-sm text-secondary-text">
                Public Playlist
              </p>
              <h4
                className={`text-lg md:text-8xl text-dark-background font-medium ${
                  isDarkMode ? "text-opacity-100" : "text-opacity-80"
                }`}
              >
                New Playlist
              </h4>
              <p className="text-xs md:text-sm text-secondary-text">
                New Playlist Description
              </p>
              <p className="text-xs md:text-sm text-secondary-text font-bold">
                Playlist Owner
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
  );
};

export default Playlist;
