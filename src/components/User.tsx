import { useEffect } from "react";
import { fetchCurrentUserData } from "../spotifyAPI";
import user from "../assets/user.png";
import { useAppSelector } from "../app/hooks";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../features/currentUserSlice";

const User = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const currentUser = useAppSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (accessToken) {
      fetchCurrentUserData(accessToken)
        .then((data) => {
          dispatch(
            setCurrentUser({
              id: data.id,
              name: data.display_name,
              email: data.email,
              avatarUrl: data.images[0].url,
            })
          );
        })
        .catch(console.error);
    }
  }, [accessToken, dispatch]);

  return (
    <div>
      <img
        src={currentUser?.avatarUrl || user}
        alt="UserProfile"
        className="object-cover w-10 h-10 rounded-full"
      />
    </div>
  );
};

export default User;
