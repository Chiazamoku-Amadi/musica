import { useState } from "react";
import { getSpotifyAuthURL } from "../spotifyAuth";
import { Icon } from "@iconify-icon/react";

const Login = () => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);
    setIsRedirecting(true);
    try {
      const url = await getSpotifyAuthURL();
      window.location.assign(url);
    } catch (err) {
      console.error("Failed to start Spotify login", err);
      setError("Couldn't start login. Please try again.");
      setIsRedirecting(false);
    }
  };

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

      <div className="flex flex-col justify-center items-center gap-4 h-full w-full">
        <button
          type="button"
          onClick={handleLogin}
          disabled={isRedirecting}
          aria-busy={isRedirecting}
          className="bg-dark-background text-primary-text rounded-full py-4 px-10 hover:opacity-90 disabled:opacity-60"
        >
          {isRedirecting ? "Redirecting to Spotify..." : "Login with Spotify"}
        </button>

        {error && (
          <p role="alert" className="text-sm">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
