import { useAppSelector } from "../app/hooks";
import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";

const Home: React.FC = () => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  return (
    <div className="flex overflow-hidden h-screen w-full">
      <Navbar />

      <main
        className={`${
          isDarkMode ? "bg-dark-background" : "bg-light-background"
        } h-screen w-full`}
      >
        <Topbar />
      </main>
    </div>
  );
};

export default Home;
