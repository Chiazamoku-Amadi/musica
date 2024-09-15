import React from "react";
import { CurrentlyPlayingTrackResponse, TrackResponse } from "../types/types";
import { useAppDispatch } from "../app/hooks";
import {
  playTrack,
  setCurrentlyPlayingTrack,
} from "../features/player/playerSlice";

const Track: React.FC<TrackResponse> = ({
  id,
  name,
  album,
  artists,
  duration_ms,
  added_at,
  preview_url,
}) => {
  const artistsNames = artists.map((artist) => artist.name).join(", ");
  const dispatch = useAppDispatch();

  const handleTrackClick = async () => {
    const track: CurrentlyPlayingTrackResponse = {
      is_playing: true, // We want the track to start playing once clicked
      progress_ms: 0,
      item: {
        id,
        name,
        album,
        artists,
        duration_ms,
        added_at,
        preview_url,
      },
    };

    // Dispatch the action to set the currently playing track
    dispatch(setCurrentlyPlayingTrack(track));

    // Dispatch the action to play the track
    dispatch(playTrack());
  };

  return (
    <div
      key={id}
      className="space-y-2 cursor-pointer"
      onClick={handleTrackClick}
    >
      <img
        src={album.images[0].url}
        alt="track-image"
        className="rounded-xl shadow-2xl h-52 w-full"
      />

      <div>
        <p className="text-xs md:text-sm">
          {artistsNames.length >= 20
            ? `${artistsNames.slice(0, 20)}...`
            : artistsNames}
        </p>
        <p className="text-[10px] md:text-xs text-secondary-text">{name}</p>
      </div>
    </div>
  );
};

export default Track;
