import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";
import { useAppSelector } from "../app/hooks";
import {
  fetchSavedShows,
  fetchRecentlyPlayedTracks,
  fetchSavedTracks,
} from "../spotifyAPI";
import { SavedShowsResponse, TracksResponse } from "../types/types";
import Track from "../components/Track";
import Show from "../components/Show";
import Loader from "../components/Loader";

const Favorites: React.FC = () => {
  const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState<
    TracksResponse[]
  >([]);
  const [savedTracks, setSavedTracks] = useState<TracksResponse[]>([]);
  const [savedShows, setSavedShows] = useState<SavedShowsResponse[]>([]);
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

  // Fetching tracks current user recently listened to
  useEffect(() => {
    if (accessToken) {
      setIsLoading(true);

      fetchRecentlyPlayedTracks(accessToken)
        .then((data) => {
          setRecentlyPlayedTracks(data);
          setTimeout(() => {
            setIsLoading(false);
          }, 3000);
        })
        .catch(console.error);
    }
  }, [accessToken]);

  // Fetching current user's saved tracks
  useEffect(() => {
    if (accessToken) {
      setIsLoading(true);

      fetchSavedTracks(accessToken)
        .then((data) => {
          setSavedTracks(data);
          setTimeout(() => {
            setIsLoading(false);
          }, 3000);
        })
        .catch(console.error);
    }
  }, [accessToken]);

  // Fetching current user's saved shows
  useEffect(() => {
    if (accessToken) {
      setIsLoading(true);

      fetchSavedShows(accessToken)
        .then((data) => {
          setSavedShows(data);
          setTimeout(() => {
            setIsLoading(false);
          }, 3000);
        })
        .catch(console.error);
    }
  }, [accessToken]);

  // Create an array of key-value pairs [trackId, track]
  const trackEntries: [string, TracksResponse][] = recentlyPlayedTracks.map(
    (track) => [track.track.id, track]
  );

  // Create a Map with the track entries (Note: Track entries are already structured like Maps)
  // This also filters trackEntries such that there are no repeated key-value pairs
  const trackMap = new Map<string, TracksResponse>(trackEntries);

  // Create an array from the values of the Map(trackMap)
  const filteredRecentTracks = Array.from(trackMap.values());

  // Rendering the recently played tracks
  const recentTracks = filteredRecentTracks.map((track) => {
    return (
      <Track
        key={track.track.id}
        id={track.track.id}
        name={track.track.name}
        album={track.track.album}
        artists={track.track.artists}
        duration_ms={track.track.duration_ms}
        added_at={track.track.added_at}
        preview_url={track.track.preview_url}
        isLoading={isLoading}
      />
    );
  });

  // Rendering current user's saved tracks
  const tracks = savedTracks.map((track) => {
    return (
      <Track
        key={track.track.id}
        id={track.track.id}
        name={track.track.name}
        album={track.track.album}
        artists={track.track.artists}
        duration_ms={track.track.duration_ms}
        added_at={track.track.added_at}
        preview_url={track.track.preview_url}
        isLoading={isLoading}
      />
    );
  });

  // Rendering current user's saved shows
  const shows = savedShows.map((show) => (
    <Show
      key={show.show.id}
      id={show.show.id}
      name={show.show.name}
      publisher={show.show.publisher}
      images={show.show.images}
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
              <h3 className="text-2xl md:text-3xl font-medium mb-4">
                Recently Played Tracks
              </h3>

              <div className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6 xs:gap-x-3">
                {recentTracks}
              </div>
            </section>

            <section
              className={`${
                isDarkMode ? "text-primary-text" : "text-dark-background"
              } w-full`}
            >
              <h3 className="text-2xl md:text-3xl font-medium mb-4">
                Favorite Tracks
              </h3>

              <div className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6 xs:gap-x-3">
                {tracks}
              </div>
            </section>

            <section
              className={`${
                isDarkMode ? "text-primary-text" : "text-dark-background"
              } w-full`}
            >
              <h3 className="text-2xl md:text-3xl font-medium mb-4">
                Favorite Shows
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

export default Favorites;
