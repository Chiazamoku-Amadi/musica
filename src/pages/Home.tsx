import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";
import { getSpotifyAuthURL } from "../spotifyAuth";

const Home: React.FC = () => {
  const [authUrl, setAuthUrl] = useState<string | null>(null);
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const url = await getSpotifyAuthURL();
        setAuthUrl(url);
      } catch (error) {
        console.error("Failed to get Spotify auth URL", error);
      }
    };

    fetchUrl();
  }, []);

  return (
    <div className="flex overflow-hidden h-screen w-full">
      <Navbar />

      <main
        className={`${
          isDarkMode ? "bg-dark-background" : "bg-light-background"
        } h-screen w-full`}
      >
        <Topbar />

        {authUrl ? (
          <a href={authUrl} target="_blank" rel="noopener noreferrer">
            Login with Spotify
          </a>
        ) : (
          <div>Loading...</div>
        )}
      </main>
    </div>
  );
};

export default Home;
