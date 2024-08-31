import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { fetchCurrentlyPlayingTrack } from "../spotifyAPI";
import { TrackResponse } from "../types/types";

const Player = () => {
  const [currentlyPlayingTrack, setCurrentlyPlayingTrack] =
    useState<TrackResponse>();
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (accessToken) {
      fetchCurrentlyPlayingTrack(accessToken)
        .then((data) => setCurrentlyPlayingTrack(data))
        .catch(console.error);
    }
  }, [accessToken]);

  console.log(currentlyPlayingTrack);

  return <div></div>;
};

export default Player;
