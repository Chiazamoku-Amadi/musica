import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";
import { useAppSelector } from "../app/hooks";
import {
  fetchSavedShows,
  fetchRecentlyPlayedTracks,
  fetchSavedTracks,
} from "../spotifyAPI";

interface Artist {
  name: string;
}

interface Album {
  images: { url: string }[];
}

interface Track {
  id: string;
  name: string;
  artists: Artist[];
  album: Album;
}

interface Tracks {
  track: Track;
}

interface Show {
  id: string;
  name: string;
  publisher: string;
  images: { url: string }[];
}

interface SavedShows {
  show: Show;
}

const Favorites: React.FC = () => {
  const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState<Tracks[]>(
    []
  );
  const [savedTracks, setSavedTracks] = useState<Tracks[]>([]);
  const [savedShows, setSavedShows] = useState<SavedShows[]>([]);
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  // Fetching tracks current user recently listened to
  useEffect(() => {
    if (accessToken) {
      fetchRecentlyPlayedTracks(accessToken)
        .then((data) => setRecentlyPlayedTracks(data))
        .catch(console.error);
    }
  }, [accessToken]);

  // Fetching current user's saved tracks
  useEffect(() => {
    if (accessToken) {
      fetchSavedTracks(accessToken)
        .then((data) => setSavedTracks(data))
        .catch(console.error);
    }
  }, [accessToken]);

  // Fetching current user's saved shows
  useEffect(() => {
    if (accessToken) {
      fetchSavedShows(accessToken)
        .then((data) => setSavedShows(data))
        .catch(console.error);
    }
  }, [accessToken]);

  // Create an array of key-value pairs [trackId, track]
  const trackEntries: [string, Tracks][] = recentlyPlayedTracks.map((track) => [
    track.track.id,
    track,
  ]);

  // Create a Map with the track entries (Note: Track entries are already structured like Maps)
  // This also filters trackEntries such that there are no repeated key-value pairs
  const trackMap = new Map<string, Tracks>(trackEntries);

  // Create an array from the values of the Map(trackMap)
  const filteredRecentTracks = Array.from(trackMap.values());

  // Rendering the recently played tracks
  const recentTracks = filteredRecentTracks.map((track) => {
    const artists = track.track.artists.map((artist) => artist.name).join(", ");

    return (
      <div key={track.track.id} className="space-y-2">
        <img
          src={track.track.album.images[0].url}
          alt="track-image"
          className="rounded-xl shadow-2xl h-52 w-full"
        />

        <div>
          <p className="text-xs md:text-sm">
            {artists.length >= 20 ? `${artists.slice(0, 20)}...` : artists}
          </p>
          <p className="text-[10px] md:text-xs text-secondary-text">
            {track.track.name}
          </p>
        </div>
      </div>
    );
  });

  // Rendering current user's saved tracks
  const tracks = savedTracks.map((track) => {
    const artists = track.track.artists.map((artist) => artist.name).join(", ");

    return (
      <div key={track.track.id} className="space-y-2">
        <img
          src={track.track.album.images[0].url}
          alt="track-image"
          className="rounded-xl shadow-2xl h-52 w-full"
        />

        <div>
          <p className="text-xs md:text-sm">
            {artists.length >= 20 ? `${artists.slice(0, 20)}...` : artists}
          </p>
          <p className="text-[10px] md:text-xs text-secondary-text">
            {track.track.name}
          </p>
        </div>
      </div>
    );
  });

  // Rendering current user's saved shows
  const shows = savedShows.map((show) => (
    <div key={show.show.id} className="space-y-2">
      <img
        src={show.show.images[0].url}
        alt="show-image"
        className="rounded-xl shadow-2xl h-52 w-full"
      />

      <div>
        <p className="text-xs md:text-sm">
          {show.show.name.length >= 20
            ? `${show.show.name.slice(0, 20)}...`
            : show.show.name}
        </p>
        <p className="text-[10px] md:text-xs text-secondary-text">
          {`${show.show.name.slice(0, 20)}...`}
        </p>
      </div>
    </div>
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
      </main>
    </div>
  );
};

export default Favorites;
