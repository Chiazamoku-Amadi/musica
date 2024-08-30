import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../features/modal/createNewPlaylistModalSlice";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { createPlaylist, fetchCurrentUserPlaylists } from "../../spotifyAPI";
import { NewPlaylistFormData } from "../../types/types";
import { setCurrentUserPlaylists } from "../../features/currentUserPlaylistsSlice";

const CreateNewPlaylistModal = () => {
  const [playlistData, setPlaylistData] = useState<NewPlaylistFormData>({
    title: "",
    description: "",
    isPublic: false,
  });
  const modalRef = useRef<HTMLFormElement>(null);
  const modalIsOpen = useAppSelector(
    (state) => state.createNewPlaylistModal.isOpen
  );
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const currentUserId = useAppSelector((state) => state.currentUser.id);

  const dispatch = useDispatch();
  console.log(modalIsOpen);

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

  // Handles changes in the create new playlist form fields
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = event.target;

    setPlaylistData((prevPlaylistData) => {
      return {
        ...prevPlaylistData,
        [name]:
          type === "checkbox" && event.target instanceof HTMLInputElement
            ? event.target.checked
            : value,
      };
    });
  };

  // Handles the creation of new playlist and the update of user's playlists
  const handleCreatePlaylist = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const { title, description, isPublic } = playlistData;

    if (!accessToken) {
      console.error("Missing access token");
      return;
    }

    try {
      // Make the post request to Spotify API to create a new playlist
      await createPlaylist(
        accessToken,
        currentUserId,
        title,
        description,
        isPublic
      );

      // Close the modal
      handleCloseModal();

      // Fetch the updated playlists after the new one is created
      const updatedPlaylists = await fetchCurrentUserPlaylists(accessToken);

      // Dispatch an action to update Redux with the updated playlists
      dispatch(setCurrentUserPlaylists(updatedPlaylists));

      // Reset the form data
      setPlaylistData({
        title: "",
        description: "",
        isPublic: false,
      });
    } catch (error) {
      console.error("Failed to create playlist:", error);
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
            onSubmit={handleCreatePlaylist}
            className="bg-light-topbar-bg flex flex-col justify-start items-start gap-6 p-6 md:p-8 rounded-2xl w-1/2 h-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <header className="flex flex-col justify-between items-center gap-2 w-full">
              <Icon
                icon="gg:close"
                className="cursor-pointer self-end"
                onClick={handleCloseModal}
              />

              <div className="flex justify-between items-center gap-6">
                <h2 className="text-lg md:text-xl font-medium">Add Playlist</h2>
              </div>
            </header>

            {/* Title Field */}
            <section className="flex flex-col justify-start items-start gap-2 w-full">
              <label
                htmlFor="title"
                className="text-sm md:text-base font-medium"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                value={playlistData.title}
                id="title"
                placeholder="Title"
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-transparent outline-none border border-secondary-text placeholder:text-secondary-text resize-none overflow-hidden text-xs md:text-sm"
              />
            </section>

            {/* Description Field */}
            <section className="flex flex-col justify-center items-start gap-2 w-full">
              <label
                htmlFor="decription"
                className="text-sm md:text-base font-medium"
              >
                Description
              </label>
              <textarea
                name="description"
                value={playlistData.description}
                id="description"
                placeholder="Description"
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-transparent outline-none border border-secondary-text placeholder:text-secondary-text resize-none overflow-hidden text-xs md:text-sm"
              />
            </section>

            {/* isPublic Field */}
            <section className="flex justify-start items-center gap-2 w-full">
              <label
                htmlFor="isPublic"
                className="text-sm md:text-base font-medium"
              >
                Public
              </label>
              <input
                type="checkbox"
                name="isPublic"
                id="isPublic"
                checked={playlistData.isPublic}
                onChange={handleChange}
                className="relative peer appearance-none w-4 h-4 bg-transparent checked:bg-black rounded border border-black"
              />
              <svg
                className="absolute left-[86px] w-4 h-4 hidden peer-checked:block pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#FFFFFF"
                  d="M18.71 7.21a1 1 0 0 0-1.42 0l-7.45 7.46l-3.13-3.14A1 1 0 1 0 5.29 13l3.84 3.84a1 1 0 0 0 1.42 0l8.16-8.16a1 1 0 0 0 0-1.47"
                />
              </svg>
            </section>

            <section className="flex justify-center items-center w-full">
              <button className="bg-black text-white hover:bg-opacity-90 py-2 px-8 rounded-lg">
                Create Playlist
              </button>
            </section>
          </form>
        </>
      ) : null}
    </>
  );
};

export default CreateNewPlaylistModal;
