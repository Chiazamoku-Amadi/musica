import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { toggleTheme } from "../features/theme/themeSlice";
import Search from "./Search";
import User from "./User";
import { toggleNavbar } from "../features/navbar/navbarSlice";

const Topbar: React.FC = () => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const dispatch = useAppDispatch();

  return (
    <div
      className={`sticky top-0 z-10 backdrop-filter backdrop-blur-lg bg-opacity-80 flex justify-between items-center ${
        isDarkMode ? "bg-dark-topbar-bg" : "bg-light-topbar-bg"
      } px-4 md:px-8 py-4 w-full`}
    >
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
  );
};

export default Topbar;
