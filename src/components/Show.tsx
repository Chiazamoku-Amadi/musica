import React from "react";
import { ShowResponse } from "../types/types";
import { Skeleton } from "@mui/material";
import { useAppSelector } from "../app/hooks";

const Show: React.FC<ShowResponse> = ({
  id,
  name,
  publisher,
  images,
  isLoading,
}) => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  return (
    <div key={id} className="space-y-2">
      {isLoading ? (
        <Skeleton
          variant="rounded"
          animation="wave"
          height="13rem"
          sx={{
            bgcolor: isDarkMode ? `grey.800` : `grey.400`,
          }}
        />
      ) : (
        <img
          src={images[0].url}
          alt="show-image"
          className="rounded-xl shadow-2xl h-52 w-full"
        />
      )}

      <div>
        {isLoading ? (
          <Skeleton
            variant="text"
            animation="wave"
            sx={{
              fontSize: "1rem",
              bgcolor: isDarkMode ? `grey.800` : `grey.400`,
            }}
          />
        ) : (
          <p className="text-xs md:text-sm">
            {name.length >= 20 ? `${name.slice(0, 20)}...` : name}
          </p>
        )}

        {isLoading ? (
          <Skeleton
            variant="text"
            animation="wave"
            sx={{
              fontSize: "1rem",
              bgcolor: isDarkMode ? `grey.800` : `grey.400`,
            }}
          />
        ) : (
          <p className="text-[10px] md:text-xs text-secondary-text">
            {publisher.length >= 20
              ? `${publisher.slice(0, 20)}...`
              : publisher}
          </p>
        )}
      </div>
    </div>
  );
};

export default Show;
