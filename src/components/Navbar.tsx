import { Icon } from "@iconify-icon/react";
import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleNavbar } from "../features/navbar/navbarSlice";

const Navbar: React.FC = () => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const openNav = useAppSelector((state) => state.navbar.openNav);
  const [currentPage, setCurrentPage] = useState<string | null>(null);

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

  console.log(location.pathname);
  console.log(currentPage);

  const menu = [
    {
      title: "Home",
      category: "Menu",
      icon: <Icon icon="solar:home-2-bold" />,
      url: "/home",
    },
    {
      title: "Discover",
      category: "Menu",
      icon: <Icon icon="iconamoon:discover-fill" />,
      url: "/discover",
    },
    {
      title: "Favorites",
      category: "Library",
      icon: <Icon icon="lets-icons:favorites-fill" />,
      url: "/favorites",
    },
    {
      title: "Playlists",
      category: "Library",
      icon: <Icon icon="ph:playlist-bold" />,
      url: "/playlists",
    },
    {
      title: "Create New Playlist",
      category: "Library",
      icon: <Icon icon="solar:pen-new-square-linear" />,
      url: "/create-playlist",
    },
    {
      title: "Settings",
      category: "General",
      icon: <Icon icon="solar:settings-bold" />,
      url: "/settings",
    },
    {
      title: "Log Out",
      category: "General",
      icon: <Icon icon="solar:logout-2-outline" />,
      url: "",
    },
  ];

  const menuCategory = menu.filter((menuItem) => menuItem.category === "Menu");
  const playlistCategory = menu.filter(
    (menuItem) => menuItem.category === "Library"
  );
  const generalCategory = menu.filter(
    (menuItem) => menuItem.category === "General"
  );

  const hoverColor = isDarkMode ? "primary" : "dark-background";

  return (
    <aside
      className={`
            fixed md:static top-0 left-0 flex flex-col justify-start px-0 py-8 gap-12 z-50 overflow-hidden h-screen ${
              isDarkMode ? "bg-dark-navbar-bg" : "bg-light-navbar-bg"
            } ${
        openNav
          ? "w-full md:w-[350px] p-4"
          : "hidden md:block w-[60px] py-4 px-1"
      }`}
    >
      <section
        className={`flex ${
          openNav ? "flex-row" : "flex-col gap-4 pb-8"
        } justify-between items-center px-6`}
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
              onClick={() => dispatch(toggleNavbar())}
            />
          ) : (
            <Icon
              icon="radix-icons:double-arrow-right"
              className={`text-primary-text ${
                isDarkMode ? "hover:text-primary" : "hover:text-dark-background"
              } cursor-pointer`}
              onClick={() => dispatch(toggleNavbar())}
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
            } px-6 pb-1`}
          >
            Menu
          </h4>

          <div
            className={`flex flex-col ${
              openNav ? "gap-2" : "gap-4"
            } pl-4 pr-6 w-full`}
          >
            {menuCategory.map((menuItem, index) => {
              const isCurrentPage = currentPage === menuItem.url;

              return (
                <div key={index} className="group">
                  <Link
                    to={menuItem.url}
                    className={`flex justify-start items-center gap-3 text-base cursor-pointer ${
                      openNav ? "pl-2" : `bg-opacity-0`
                    } ${
                      isCurrentPage
                        ? `text-${hoverColor} group-hover:text-opacity-80 font-medium`
                        : `text-primary-text group-hover:text-${hoverColor} group-hover:text-opacity-80`
                    } rounded w-full`}
                  >
                    {menuItem.icon}
                    <span className={`${openNav ? "block" : "hidden"} pt-1`}>
                      {menuItem.title}
                    </span>
                  </Link>
                </div>
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
            } px-6 pb-1`}
          >
            Library
          </h4>

          <div
            className={`flex flex-col ${
              openNav ? "gap-2" : "gap-4"
            } pl-4 pr-6 w-full`}
          >
            {playlistCategory.map((menuItem, index) => {
              const isCurrentPage = currentPage === menuItem.url;

              return (
                <div key={index} className="group">
                  <Link
                    to={menuItem.url}
                    className={`flex justify-start items-center gap-3 text-base cursor-pointer ${
                      openNav ? "pl-2" : `bg-opacity-0`
                    } ${
                      isCurrentPage
                        ? `text-${hoverColor} group-hover:text-opacity-80`
                        : `text-primary-text group-hover:text-${hoverColor} group-hover:text-opacity-80`
                    } rounded w-full`}
                  >
                    {menuItem.icon}
                    <span className={`${openNav ? "block" : "hidden"} pt-1`}>
                      {menuItem.title}
                    </span>
                  </Link>
                </div>
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
            } px-6 pb-1`}
          >
            General
          </h4>

          <div
            className={`flex flex-col ${
              openNav ? "gap-2" : "gap-4"
            } pl-4 pr-6 w-full`}
          >
            {generalCategory.map((menuItem, index) => {
              const isCurrentPage = currentPage === menuItem.url;

              return (
                <div key={index} className="group">
                  <Link
                    to={menuItem.url}
                    className={`flex justify-start items-center gap-3 text-base cursor-pointer ${
                      openNav ? "pl-2" : `bg-opacity-0`
                    } ${
                      isCurrentPage
                        ? `text-${hoverColor} group-hover:text-opacity-80`
                        : `text-primary-text group-hover:text-${hoverColor} group-hover:text-opacity-80`
                    } rounded w-full`}
                  >
                    {menuItem.icon}
                    <span className={`${openNav ? "block" : "hidden"} pt-1`}>
                      {menuItem.title}
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </aside>
  );
};

export default Navbar;
