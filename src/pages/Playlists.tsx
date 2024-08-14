import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";
import {
  fetchCurrentUserPlaylists,
  fetchFeaturedPlaylists,
} from "../spotifyAPI";

interface Playlist {
  id: string;
  name: string;
  images: { url: string }[];
  owner: { display_name: string };
}

const MyPlaylists = () => {
  const [currentUserPlaylists, setCurrentUserPlaylists] = useState<Playlist[]>(
    []
  );
  const [featuredPlaylists, setFeaturedPlaylists] = useState<Playlist[]>([]);
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (accessToken) {
      fetchCurrentUserPlaylists(accessToken)
        .then((data) => setCurrentUserPlaylists(data))
        .catch(console.error);
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      fetchFeaturedPlaylists(accessToken)
        .then((data) => setFeaturedPlaylists(data))
        .catch(console.error);
    }
  }, [accessToken]);

  console.log(currentUserPlaylists);
  console.log(featuredPlaylists);

  const playlists = featuredPlaylists.map((playlist) => (
    <div key={playlist.id} className="space-y-2">
      <img
        src={playlist.images[0].url}
        alt="album-image"
        className="rounded-xl shadow-2xl h-52 w-full"
      />

      <div>
        <p className="text-xs md:text-sm">
          {playlist.name.length >= 20
            ? `${playlist.name.slice(0, 20)}...`
            : playlist.name}{" "}
        </p>
        <p className="text-[10px] md:text-xs text-secondary-text">
          {playlist.owner.display_name}
        </p>
      </div>
    </div>
  ));

  const userPlaylists = currentUserPlaylists.map((playlist) => (
    <div key={playlist.id} className="space-y-2">
      <img
        src={playlist.images[0].url}
        alt="album-image"
        className="rounded-xl shadow-2xl h-52 w-full"
      />

      <div>
        <p className="text-xs md:text-sm">
          {playlist.name.length >= 20
            ? `${playlist.name.slice(0, 20)}...`
            : playlist.name}{" "}
        </p>
        <p className="text-[10px] md:text-xs text-secondary-text">
          {playlist.owner.display_name}
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
              Featured Playlists
            </h3>

            <div className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6 xs:gap-x-3">
              {playlists}
            </div>
          </section>

          <section
            className={`${
              isDarkMode ? "text-primary-text" : "text-dark-background"
            } w-full`}
          >
            <h3 className="text-2xl md:text-3xl font-medium mb-4">
              My Playlists
            </h3>

            <div className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6 xs:gap-x-3">
              {userPlaylists}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default MyPlaylists;
