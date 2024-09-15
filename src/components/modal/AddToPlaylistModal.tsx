import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addTracksToPlaylist,
  fetchPlaylist,
  fetchTracks,
} from "../../spotifyAPI";
import { PlaylistResponse, TrackResponse } from "../../types/types";
import { toggleModal } from "../../features/modal/addTracksToPlaylistModalSlice";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { setCurrentPlaylist } from "../../features/playlist/currentPlaylistSlice";

interface AddToPlaylistModalProps {
  currentPlaylist: PlaylistResponse;
  playlistId: string;
}

const AddToPlaylistModal: React.FC<AddToPlaylistModalProps> = ({
  currentPlaylist,
  playlistId,
}) => {
  const [recommendedTracks, setRecommendedTracks] = useState<TrackResponse[]>(
    []
  );
  const [selectedTracks, setSelectedTracks] = useState<TrackResponse[]>([]);
  const modalRef = useRef<HTMLFormElement>(null);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const modalIsOpen = useAppSelector(
    (state) => state.addTracksToPlaylistModal.isOpen
  );
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  const dispatch = useAppDispatch();

  // Fetching tracks
  useEffect(() => {
    if (accessToken) {
      fetchTracks(accessToken)
        .then((data) => setRecommendedTracks(data))
        .catch(console.error);
    }
  }, [accessToken]);

  // Effect for handling clicking outside the create new playlist modal to close the modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        dispatch(toggleModal());
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  const filteredTracks = recommendedTracks.filter((recommendedTrack) => {
    const currentPlaylistTracks = currentPlaylist.tracks.items; // Tracks in the current playlist

    // Returns all recommended tracks that are in the current playlist
    const isAlreadyInPlaylist = currentPlaylistTracks.some(
      (currentPlaylistTrack) =>
        currentPlaylistTrack.track.id === recommendedTrack.id
    );

    // Negates "isAlreadyInPlaylist", thus, returning all recommended tracks that are NOT in the current playlist
    return !isAlreadyInPlaylist;
  });

  const suggestedTracks = filteredTracks.map((track, index) => {
    const minutes = Math.floor(track.duration_ms / 60000);
    const seconds = track.duration_ms % 60;

    return (
      <tr key={track.id} className="border-b border-dark-topbar-bg w-full">
        <td scope="row" className="px-6 py-3 w-[5%] font-medium">
          {index + 1}
        </td>
        <td className="px-6 py-3 w-[30%]">
          {track.name.length >= 25
            ? `${track.name.slice(0, 25)}...`
            : track.name}
        </td>
        <td className="px-6 py-3 w-[30%]">
          {track.album.name.length >= 25
            ? `${track.album.name.slice(0, 25)}...`
            : track.album.name}
        </td>
        <td className="px-6 py-3 w-[20%]">
          {track.artists.map((artist) => artist.name)}
        </td>
        <td className="px-6 py-3 w-[10%]">{`${minutes}:${seconds}`}</td>
        <td className="px-6 py-3 w-[5%]">
          <input
            type="checkbox"
            name="add"
            onChange={() => handleIsSelected(track)}
            checked={selectedTracks.includes(track)}
            id="add"
            className="w-4 h-4"
          />
        </td>
      </tr>
    );
  });

  const handleIsSelected = (track: TrackResponse) => {
    const isSelected = selectedTracks.some(
      (selectedTrack) => selectedTrack.id === track.id
    );

    setSelectedTracks(
      // If the track is already selected, deselect it. Else, select it.
      isSelected
        ? selectedTracks.filter(
            (selectedTrack) => selectedTrack.id !== track.id
          )
        : [...selectedTracks, track]
    );
  };

  const trackUris: string[] = [];

  selectedTracks.forEach((selectedTrack) => {
    const trackUri = `spotify:track:${selectedTrack.id}`;
    trackUris.push(trackUri);
  });

  const handleAddTracks = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!accessToken || !playlistId) {
      console.error("Missing access token and playlist ID");
      return;
    }

    try {
      await addTracksToPlaylist(accessToken, playlistId, trackUris);

      handleCloseModal();

      // Fetch the updated playlists after the new one is created
      const updatedPlaylists = await fetchPlaylist(accessToken, playlistId);

      // Dispatch an action to update Redux with the updated playlists
      dispatch(setCurrentPlaylist(updatedPlaylists));

      currentPlaylist = updatedPlaylists;

      setSelectedTracks([]);
    } catch (error) {
      console.error;
    }
  };

  // Handles closing the create new playlist modal
  const handleCloseModal = () => {
    dispatch(toggleModal());
  };

  return (
    <>
      {modalIsOpen ? (
        <>
          <div className="p-8 w-full h-full fixed top-0 left-0 bg-neutral-700 opacity-50 z-50" />
          <form
            ref={modalRef}
            onSubmit={handleAddTracks}
            className="bg-light-topbar-bg flex flex-col justify-start items-start gap-6 p-6 md:p-8 rounded-2xl w-4/5 h-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div className="flex flex-col justify-between items-start gap-4 w-full">
              <Icon
                icon="gg:close"
                className="cursor-pointer self-end"
                onClick={handleCloseModal}
              />

              <table className="text-sm text-left rtl:text-right text-gray-500 w-full">
                <thead
                  className={`text-xs text-white bg-dark-topbar-bg uppercase ${
                    isDarkMode ? "bg-opacity-100" : "bg-opacity-50"
                  } w-full`}
                >
                  <tr>
                    <th scope="col" className="px-6 py-3 w-[5%]">
                      #
                    </th>
                    <th scope="col" className="px-6 py-3 w-[30%]">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 w-[30%]">
                      Album
                    </th>
                    <th scope="col" className="px-6 py-3 w-[20%]">
                      Artist
                    </th>
                    <th scope="col" className="px-6 py-3 w-[10%]">
                      <Icon icon="fluent:clock-20-filled" className="text-xl" />
                    </th>
                    <th scope="col" className="px-6 py-3 w-[5%]"></th>
                  </tr>
                </thead>
                <tbody>{suggestedTracks}</tbody>
              </table>
              <button
                className={`bg-dark-topbar-bg self-end ${
                  isDarkMode
                    ? "hover:bg-opacity-90"
                    : "bg-opacity-50 hover:bg-opacity-60"
                } text-white py-2 px-8 rounded-lg`}
              >
                Add
              </button>
            </div>
          </form>
        </>
      ) : null}
    </>
  );
};

export default AddToPlaylistModal;
