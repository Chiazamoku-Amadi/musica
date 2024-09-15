import React from "react";
import { ShowResponse } from "../types/types";

const Show: React.FC<ShowResponse> = ({ id, name, publisher, images }) => {
  return (
    <div key={id} className="space-y-2">
      <img
        src={images[0].url}
        alt="show-image"
        className="rounded-xl shadow-2xl h-52 w-full"
      />

      <div>
        <p className="text-xs md:text-sm">
          {name.length >= 20 ? `${name.slice(0, 20)}...` : name}
        </p>
        <p className="text-[10px] md:text-xs text-secondary-text">
          {publisher.length >= 20 ? `${publisher.slice(0, 20)}...` : publisher}
        </p>
      </div>
    </div>
  );
};

export default Show;
