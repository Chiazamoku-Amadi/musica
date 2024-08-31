import React from "react";
import { TrackProps } from "../types/types";

const Track: React.FC<TrackProps> = ({ id, name, album, artists }) => {
  const artistsArray = artists.map((artist) => artist.name).join(", ");

  return (
    <div key={id} className="space-y-2">
      <img
        src={album.images[0].url}
        alt="track-image"
        className="rounded-xl shadow-2xl h-52 w-full"
      />

      <div>
        <p className="text-xs md:text-sm">
          {artistsArray.length >= 20
            ? `${artistsArray.slice(0, 20)}...`
            : artistsArray}
        </p>
        <p className="text-[10px] md:text-xs text-secondary-text">{name}</p>
      </div>
    </div>
  );
};

export default Track;
