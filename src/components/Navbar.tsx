import { Icon } from "@iconify-icon/react";
import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleNavbar } from "../features/navbar/navbarSlice";
import { toggleModal } from "../features/modal/modalSlice";

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
  ];

  const menuCategory = menu.filter((menuItem) => menuItem.category === "Menu");
  const playlistCategory = menu.filter(
    (menuItem) => menuItem.category === "Library"
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
                    } w-full`}
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
                        ? `text-${hoverColor} group-hover:text-opacity-80 font-medium`
                        : `text-primary-text group-hover:text-${hoverColor} group-hover:text-opacity-80`
                    } w-full`}
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

          <div
            className={`group ${
              openNav ? "pt-[6px]" : "pt-[14px]"
            } pl-4 pr-6 w-full`}
          >
            <li
              className={`flex justify-start items-center gap-3 text-base text-primary-text group-hover:text-${hoverColor} group-hover:text-opacity-80 cursor-pointer ${
                openNav ? "pl-2" : `bg-opacity-0`
              } w-full`}
              onClick={() => dispatch(toggleModal())}
            >
              <Icon icon="mi:add" />
              <span className={`${openNav ? "block" : "hidden"} pt-1`}>
                Create New Playlist
              </span>
            </li>
          </div>
        </div>

        <div className={`group ${openNav ? "px-4" : "px-2"} w-full`}>
          <Link
            to="/log-out"
            className={`flex justify-start items-center gap-3 text-base cursor-pointer border-t border-t-zinc-600 pl-2 pt-4 ${
              !openNav && "bg-opacity-0"
            } ${
              currentPage === "Log Out"
                ? `text-${hoverColor} group-hover:text-opacity-80 font-medium`
                : `text-primary-text group-hover:text-${hoverColor} group-hover:text-opacity-80`
            } w-full`}
          >
            <Icon icon="solar:logout-2-outline" />
            <span className={`${openNav ? "block" : "hidden"} pt-1`}>
              Log Out
            </span>
          </Link>
        </div>
      </section>
    </aside>
  );
};

export default Navbar;
