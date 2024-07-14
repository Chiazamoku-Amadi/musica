import user from "../assets/user.png";

const User = () => {
  return (
    <div>
      <img
        src={user}
        alt="UserProfile"
        className="bg-cover bg-center w-10 h-10 rounded-full"
      />
    </div>
  );
};

export default User;
