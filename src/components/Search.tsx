import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { useAppSelector } from "../app/hooks";

const Search = () => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  return (
    <div
      className={`flex items-center gap-1 md:gap-2 border ${
        isDarkMode ? "border-dark-navbar-bg" : "border-secondary-text"
      } rounded-full px-2 md:px-4 py-2 w-3/5 md:w-2/5`}
    >
      <Icon
        icon="bitcoin-icons:search-outline"
        className="text-secondary-text text-lg"
      />
      <input
        type="text"
        name="searchQuery"
        placeholder="Search for a song or singer"
        className={`bg-transparent text-xs md:text-sm ${
          isDarkMode ? "text-primary-text" : "text-light-navbar-bg"
        } placeholder:text-secondary-text outline-none w-full`}
      />
    </div>
  );
};

export default Search;
