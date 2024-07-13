import { useAppSelector } from "../app/hooks";
import Navbar from "../components/Navbar";

const Home: React.FC = () => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  return (
    <div className="flex h-screen w-full">
      <Navbar />

      <main
        className={`${
          isDarkMode ? "bg-dark-background" : "bg-light-background"
        } h-screen w-full`}
      ></main>
    </div>
  );
};

export default Home;
