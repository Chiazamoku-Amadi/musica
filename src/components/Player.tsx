import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { pauseTrack, playTrack } from "../features/player/playerSlice";

const Player = () => {
  const currentlyPlayingTrack = useAppSelector(
    (state) => state.player.currentlyPlayingTrack
  );
  const isPlaying = useAppSelector((state) => state.player.isPlaying);
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const promptRef = useRef<HTMLDivElement>(null);
  const [showNavigateToSpotifyPrompt, setShowNavigateToSpotifyPrompt] =
    useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  const dispatch = useAppDispatch();

  // Handle the audio preview playback
  useEffect(() => {
    if (currentlyPlayingTrack?.item.preview_url && audioRef.current) {
      audioRef.current.src = currentlyPlayingTrack.item.preview_url;
      if (isPlaying) audioRef.current.play();
      setShowNavigateToSpotifyPrompt(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentlyPlayingTrack]); // Only runs when the currentlyPlayingTrack changes

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      const handleTimeUpdate = () => {
        if (!isSeeking) {
          setCurrentTime(audio.currentTime);
        }
      };

      audio.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  });

  // Effect for handling clicking outside the create new playlist modal to close the modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        promptRef.current &&
        !promptRef.current.contains(event.target as Node)
      ) {
        setShowNavigateToSpotifyPrompt(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  // Handles what happens when the song preview ends
  const handleAudioEnd = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      dispatch(pauseTrack());
    }

    setShowNavigateToSpotifyPrompt(true);
  };

  // Play/Pause functionality
  const handlePlayPauseClick = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        dispatch(pauseTrack());
      } else {
        audioRef.current.play();
        dispatch(playTrack());
      }
    }
  };

  // Handle seeking (when the user interacts with the progress bar)
  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = Number(event.target.value);
    setCurrentTime(seekTime);

    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };

  // Format time in minutes:seconds format
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Handle volume change
  const handleVolumeChange = (step: number) => {
    if (audioRef.current) {
      const newVolume = Math.min(
        1,
        Math.max(0, audioRef.current.volume + step)
      );

      audioRef.current.volume = newVolume;
    }
  };

  const artistsNames = currentlyPlayingTrack?.item?.artists
    .map((artist) => artist.name)
    .join(", ");

  return (
    <>
      {accessToken && currentlyPlayingTrack ? (
        <div
          className={`fixed bottom-0 z-100 backdrop-filter backdrop-blur-lg bg-opacity-80 flex md:flex-row flex-col justify-between items-center gap-4 md:gap-16 ${
            isDarkMode ? "bg-dark-topbar-bg" : "bg-light-topbar-bg"
          } ${!currentlyPlayingTrack && "hidden"} px-4 md:px-8 py-4 w-full`}
        >
          {/* Track Information Section */}
          <div className="flex justify-start items-end gap-4 md:w-1/4 w-full">
            <img
              src={currentlyPlayingTrack.item.album.images[0].url}
              alt="track-image"
              className="rounded shadow-2xl h-12"
            />

            <div>
              <p className="text-xs md:text-sm">
                {artistsNames!.length >= 25
                  ? `${artistsNames!.slice(0, 25)}...`
                  : artistsNames}
              </p>
              <p className="text-[10px] md:text-xs text-secondary-text">
                {currentlyPlayingTrack.item.name.length >= 32
                  ? `${currentlyPlayingTrack.item.name.slice(0, 32)}`
                  : currentlyPlayingTrack.item.name}
              </p>
            </div>
          </div>

          {/* Player Controls Section */}
          <div className="flex flex-col justify-center items-center gap-2 md:gap-4 md:w-1/2 w-full">
            <div className="flex justify-between items-center gap-2 text-xs w-full">
              <p>{formatTime(currentTime + 0.5)}</p>
              <input
                type="range"
                className="h-1 w-full"
                min="0"
                max="30"
                value={currentTime}
                onChange={handleSeek}
                onMouseDown={() => setIsSeeking(true)}
                onMouseUp={() => setIsSeeking(false)}
              />
              <p>{formatTime(30)}</p>
            </div>

            <div className="flex justify-center items-center gap-6 w-full">
              <Icon
                icon="ph:shuffle-light"
                className="text-base md:text-xl text-secondary-text"
              />
              <Icon
                icon="ph:skip-back-light"
                className="text-base md:text-xl text-secondary-text"
              />

              <Icon
                icon={`${
                  isPlaying ? "ph:pause-circle-light" : "ph:play-circle-light"
                }`}
                className="text-2xl md:text-3xl cursor-pointer"
                onClick={handlePlayPauseClick}
              />

              <Icon
                icon="ph:skip-forward-light"
                className="text-base md:text-xl text-secondary-text"
              />
              <Icon
                icon="ph:repeat-light"
                className="text-base md:text-xl text-secondary-text"
              />
            </div>
          </div>

          <audio
            src={currentlyPlayingTrack.item.preview_url}
            ref={audioRef}
            onEnded={handleAudioEnd}
          ></audio>

          {/* Volume Control Section */}
          <div className="flex justify-start items-center gap-0 md:gap-4 md:w-1/4 w-full">
            <label
              htmlFor="volume"
              className="flex justify-between items-center gap-2 w-full"
            >
              <Icon
                icon="ph:speaker-low-light"
                className="text-base md:text-xl cursor-pointer"
                onClick={() => handleVolumeChange(-0.1)}
              />

              <input
                type="range"
                name="volume"
                id="volume"
                min="0"
                max="100"
                step="10"
                value={Math.round(
                  audioRef.current?.volume ? audioRef.current?.volume * 100 : 0
                )}
                onChange={(e) => {
                  if (audioRef.current) {
                    audioRef.current.volume = Number(e.target.value) / 100;
                  }
                }}
                className="h-1 w-full"
              />

              <Icon
                icon="ph:speaker-high-light"
                className="text-base md:text-xl cursor-pointer"
                onClick={() => handleVolumeChange(0.1)}
              />
            </label>
          </div>

          {/* Subscribe Prompt */}
          {showNavigateToSpotifyPrompt && (
            <div
              className="fixed bottom-10 z-50 backdrop-filter backdrop-blur-lg bg-opacity-80 flex flex-col bg-primary-text text-xs text-black rounded space-y-1"
              ref={promptRef}
            >
              <Icon
                icon="majesticons:close"
                className="text-base md:text-xl cursor-pointer self-end p-1"
                onClick={() => setShowNavigateToSpotifyPrompt(false)}
              />

              <div className="space-y-1 px-4 pb-4">
                <p>
                  Want to listen to the full track? Listen on{" "}
                  <span>
                    <a
                      href={`spotify://track/${currentlyPlayingTrack?.item.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-medium"
                    >
                      SPOTIFY APP
                    </a>{" "}
                    or{" "}
                    <a
                      href={`https://open.spotify.com/track/${currentlyPlayingTrack?.item.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-medium"
                    >
                      SPOTIFY WEB
                    </a>
                  </span>
                </p>
                <p>
                  Don't have Spotify?{" "}
                  <span>
                    <a
                      href="https://www.spotify.com/download/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-medium"
                    >
                      GET SPOTIFY FREE
                    </a>
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default Player;
