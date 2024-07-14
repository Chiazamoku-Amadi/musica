import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { toggleTheme } from "../features/theme/themeSlice";
import Search from "./Search";
import User from "./User";

const Topbar = () => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const dispatch = useAppDispatch();

  return (
    <div
      className={`flex justify-between items-center ${
        isDarkMode ? "bg-dark-topbar-bg" : "bg-light-topbar-bg"
      } px-8 py-4 w-full`}
    >
      <Search />

      <div
        onClick={() => dispatch(toggleTheme())}
        className="flex items-center gap-8"
      >
        {isDarkMode ? (
          <Icon
            icon="entypo:light-up"
            className={`text-primary-text hover:text-dark-navbar-bg text-lg py-1 cursor-pointer`}
          />
        ) : (
          <Icon
            icon="arcticons:dark-launcher"
            className={`text-light-navbar-bg hover:text-dark-background text-lg py-1 cursor-pointer`}
          />
        )}

        <User />
      </div>
    </div>
  );
};

export default Topbar;
