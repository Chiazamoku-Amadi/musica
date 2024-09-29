import { Fragment, useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";
import { fetchRecommendedGenres, fetchPopularShows } from "../spotifyAPI";
import { ShowResponse } from "../types/types";
import Show from "../components/Show";
import { Skeleton } from "@mui/material";
import Loader from "../components/Loader";

const Discover: React.FC = () => {
  const [popularShows, setPopularShows] = useState<ShowResponse[]>([]);
  const [recommendedGenres, setRecommendedGenres] = useState<string[]>([]);
  const [showAnimatedLoader, setShowAnimatedLoader] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  // Simulating data fetching and show loader for 2s
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimatedLoader(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Fetching Recommended Genres
  useEffect(() => {
    if (accessToken) {
      setIsLoading(true);

      fetchRecommendedGenres(accessToken)
        .then((data) => {
          setRecommendedGenres(data);
          setTimeout(() => {
            setIsLoading(false);
          }, 3000);
        })
        .catch(console.error);
    }
  }, [accessToken]);

  // Fetching Popular Shows
  useEffect(() => {
    if (accessToken) {
      setIsLoading(true);

      fetchPopularShows(accessToken)
        .then((data) => {
          setPopularShows(data);
          setTimeout(() => {
            setIsLoading(false);
          }, 3000);
        })
        .catch(console.error);
    }
  }, [accessToken]);

  const genres = recommendedGenres.slice(0, 20).map((genre, index) => (
    <Fragment key={index}>
      {isLoading ? (
        <Skeleton
          variant="rounded"
          animation="wave"
          width={140}
          height={40}
          sx={{
            borderRadius: "20px",
            bgcolor: isDarkMode ? `grey.800` : `grey.400`,
          }}
        />
      ) : (
        <p
          className={`text-sm md:text-base font-medium mb-4 border ${
            isDarkMode
              ? "text-light-topbar-bg border-light-topbar-bg"
              : "text-dark-navbar-bg border-dark-topbar-bg"
          } px-6 py-1 rounded-full`}
        >
          {genre}
        </p>
      )}
    </Fragment>
  ));

  const shows = popularShows.map((show) => (
    <Show
      key={show.id}
      id={show.id}
      name={show.name}
      publisher={show.publisher}
      images={show.images}
      isLoading={isLoading}
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

        {showAnimatedLoader ? (
          <Loader />
        ) : (
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
        )}
      </main>
    </div>
  );
};

export default Discover;
