import { Icon } from "@iconify-icon/react";
import { useState } from "react";
import { useAppSelector } from "../app/hooks";

const Navbar: React.FC = () => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const [openNav, setOpenNav] = useState(true);

  const menu = [
    {
      title: "Home",
      category: "Menu",
      icon: (
        <Icon
          icon="solar:home-2-bold"
          className={`${!openNav && "text-xl"} text-primary-text`}
        />
      ),
      url: "/home",
    },
    {
      title: "Discover",
      category: "Menu",
      icon: (
        <Icon
          icon="iconamoon:discover-fill"
          className={`${!openNav && "text-xl"} text-primary-text`}
        />
      ),
      url: "/courses",
    },
    {
      title: "Recently Listened",
      category: "Library",
      icon: (
        <Icon
          icon="mdi:recent"
          className={`${!openNav && "text-xl"} text-primary-text`}
        />
      ),
      url: "/graduation",
    },
    {
      title: "Favorites",
      category: "Library",
      icon: (
        <Icon
          icon="lets-icons:favorites-fill"
          className={`${!openNav && "text-xl"} text-primary-text`}
        />
      ),
      url: "/login",
    },
    {
      title: "My Playlists",
      category: "Playlist",
      icon: (
        <Icon
          icon="ph:playlist-bold"
          className={`${!openNav && "text-xl"} text-primary-text`}
        />
      ),
      url: "/login",
    },
    {
      title: "Create New Playlist",
      category: "Playlist",
      icon: (
        <Icon
          icon="solar:pen-new-square-linear"
          className={`${!openNav && "text-xl"} text-primary-text`}
        />
      ),
      url: "/login",
    },
    {
      title: "Settings",
      category: "General",
      icon: (
        <Icon
          icon="solar:settings-bold"
          className={`${!openNav && "text-xl"} text-primary-text`}
        />
      ),
      url: "/login",
    },
    {
      title: "Log Out",
      category: "General",
      icon: (
        <Icon
          icon="solar:logout-2-outline"
          className={`${!openNav && "text-xl"} text-primary-text`}
        />
      ),
      url: "/login",
    },
  ];

  const menuCategory = menu.filter((menuItem) => menuItem.category === "Menu");
  const libraryCategory = menu.filter(
    (menuItem) => menuItem.category === "Library"
  );
  const playlistCategory = menu.filter(
    (menuItem) => menuItem.category === "Playlist"
  );
  const generalCategory = menu.filter(
    (menuItem) => menuItem.category === "General"
  );

  return (
    <aside
      className={`
            fixed md:static top-0 left-0 flex flex-col justify-start px-6 py-8 gap-12 z-50 overflow-auto h-screen ${
              isDarkMode ? "bg-dark-navbar-bg" : "bg-light-navbar-bg"
            } ${
        openNav ? "w-full md:w-[350px] p-4" : "w-[15%] md:w-[4%] py-4 px-1"
      } transition-all duration-300`}
    >
      <section
        className={`flex ${
          openNav ? "flex-row" : "flex-col gap-4"
        } justify-between items-center`}
      >
        <div className="flex justify-start items-center gap-2">
          <Icon
            icon="emojione-monotone:musical-score"
            className={`${
              isDarkMode ? "text-primary" : "text-dark-background"
            } text-3xl`}
          />
          {openNav && <h1 className="text-primary-text text-2xl">Musica</h1>}
        </div>

        <div>
          {openNav ? (
            <Icon
              icon="radix-icons:double-arrow-left"
              className={`text-primary-text ${
                isDarkMode ? "hover:text-primary" : "hover:text-dark-background"
              } cursor-pointer`}
              onClick={() => setOpenNav((prevOpenNav) => !prevOpenNav)}
            />
          ) : (
            <Icon
              icon="radix-icons:double-arrow-right"
              className={`text-primary-text ${
                isDarkMode ? "hover:text-primary" : "hover:text-dark-background"
              } cursor-pointer`}
              onClick={() => setOpenNav((prevOpenNav) => !prevOpenNav)}
            />
          )}
        </div>
      </section>

      <section className="flex flex-col justify-center gap-10">
        <div
          className={`flex flex-col gap-1 ${
            openNav ? "items-start" : "items-center"
          }`}
        >
          <h4
            className={`text-secondary-text ${
              openNav ? "text-sm" : "text-xs"
            } pb-1`}
          >
            Menu
          </h4>

          <div className={`flex flex-col ${openNav ? "gap-2" : "gap-4"}`}>
            {menuCategory.map((menuItem, index) => {
              return (
                <li
                  key={index}
                  className="flex justify-start items-center gap-3 text-base"
                >
                  {menuItem.icon}
                  <span
                    className={`${
                      openNav ? "block" : "hidden"
                    } text-primary-text pt-1`}
                  >
                    {menuItem.title}
                  </span>
                </li>
              );
            })}
          </div>
        </div>

        <div
          className={`flex flex-col gap-1 ${
            openNav ? "items-start" : "items-center"
          }`}
        >
          <h4
            className={`text-secondary-text ${
              openNav ? "text-sm" : "text-xs"
            } pb-1`}
          >
            Library
          </h4>
          <div className={`flex flex-col ${openNav ? "gap-2" : "gap-4"}`}>
            {libraryCategory.map((menuItem, index) => {
              return (
                <li
                  key={index}
                  className="flex justify-start items-center gap-3 text-base"
                >
                  {menuItem.icon}
                  <span
                    className={`${
                      openNav ? "block" : "hidden"
                    } text-primary-text pt-1`}
                  >
                    {menuItem.title}
                  </span>
                </li>
              );
            })}
          </div>
        </div>

        <div
          className={`flex flex-col gap-1 ${
            openNav ? "items-start" : "items-center"
          }`}
        >
          <h4
            className={`text-secondary-text ${
              openNav ? "text-sm" : "text-xs"
            } pb-1`}
          >
            Playlist
          </h4>

          <div className={`flex flex-col ${openNav ? "gap-2" : "gap-4"}`}>
            {playlistCategory.map((menuItem, index) => {
              return (
                <li
                  key={index}
                  className="flex justify-start items-center gap-3 text-base"
                >
                  {menuItem.icon}
                  <span
                    className={`${
                      openNav ? "block" : "hidden"
                    } text-primary-text pt-1`}
                  >
                    {menuItem.title}
                  </span>
                </li>
              );
            })}
          </div>
        </div>

        <div
          className={`flex flex-col gap-1 ${
            openNav ? "items-start" : "items-center"
          }`}
        >
          <h4
            className={`text-secondary-text ${
              openNav ? "text-sm" : "text-xs"
            } pb-1`}
          >
            General
          </h4>

          <div
            className={`flex flex-col ${
              openNav ? "gap-2" : "gap-4 items-center"
            }`}
          >
            {generalCategory.map((menuItem, index) => {
              return (
                <li
                  key={index}
                  className="flex justify-start items-center gap-3 text-base"
                >
                  {menuItem.icon}
                  <span
                    className={`${
                      openNav ? "block" : "hidden"
                    } text-primary-text pt-1`}
                  >
                    {menuItem.title}
                  </span>
                </li>
              );
            })}
          </div>
        </div>
      </section>
    </aside>
  );
};

export default Navbar;
