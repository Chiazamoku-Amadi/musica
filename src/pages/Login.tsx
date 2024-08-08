import { useEffect, useState } from "react";
import { getSpotifyAuthURL } from "../spotifyAuth";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

const Login = () => {
  const [authUrl, setAuthUrl] = useState<string | null>(null);

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
    <div className="p-8 overflow-hidden h-screen w-full">
      <div className="flex justify-start items-start gap-2">
        <Icon
          icon="emojione-monotone:musical-score"
          className="
            text-primary
          text-3xl"
        />
        <h1 className="text-dark-background text-2xl">Musica</h1>
      </div>

      <div className="flex justify-center items-center h-full w-full">
        {authUrl ? (
          <a
            href={authUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-dark-background text-primary-text rounded-full py-4 px-10 hover:opacity-90"
          >
            Login with Spotify
          </a>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Login;
