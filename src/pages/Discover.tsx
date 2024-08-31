import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";
import { fetchRecommendedGenres, fetchPopularShows } from "../spotifyAPI";
import { ShowResponse } from "../types/types";
import Show from "../components/Show";

const Discover: React.FC = () => {
  const [popularShows, setPopularShows] = useState<ShowResponse[]>([]);
  const [recommededGenres, setRecommededGenres] = useState<string[]>([]);
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  // Fetching Recommended Genres
  useEffect(() => {
    if (accessToken) {
      fetchRecommendedGenres(accessToken)
        .then((data) => setRecommededGenres(data))
        .catch(console.error);
    }
  }, [accessToken]);

  // Fetching Popular Shows
  useEffect(() => {
    if (accessToken) {
      fetchPopularShows(accessToken)
        .then((data) => setPopularShows(data))
        .catch(console.error);
    }
  }, [accessToken]);

  const genres = recommededGenres.slice(0, 20).map((genre, index) => (
    <p
      key={index}
      className={`text-sm md:text-base font-medium mb-4 hover:text-opacity-80 hover:border-opacity-80 border ${
        isDarkMode
          ? "text-light-topbar-bg border-light-topbar-bg"
          : "text-dark-navbar-bg border-dark-topbar-bg"
      } px-6 py-1 rounded-full cursor-pointer`}
    >
      {genre}
    </p>
  ));

  const shows = popularShows.map((show) => (
    <Show
      key={show.id}
      id={show.id}
      name={show.name}
      publisher={show.publisher}
      images={show.images}
    />
  ));

  return (
    <div className="flex justify-end overflow-hidden h-screen w-full">
      <Navbar />

      <main
        className={`${
          isDarkMode ? "bg-dark-background" : "bg-light-background"
        } overflow-y-auto h-screen w-full`}
      >
        <Topbar />

        <div className="space-y-6 md:space-y-10 p-4 md:p-8 w-full">
          <section
            className={`${
              isDarkMode ? "text-primary-text" : "text-dark-background"
            } w-full`}
          >
            <h3 className="text-2xl md:text-3xl font-medium mb-4">Genres</h3>

            <div className="flex flex-wrap justify-start items-start gap-x-4 gap-y-2 w-full">
              {genres}
            </div>
          </section>

          <section
            className={`${
              isDarkMode ? "text-primary-text" : "text-dark-background"
            } w-full`}
          >
            <h3 className="text-2xl md:text-3xl font-medium mb-4">
              Popular Shows
            </h3>

            <div className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6 xs:gap-x-3">
              {shows}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Discover;
