import Navbar from "../components/Navbar";

const Home: React.FC = () => {
  return (
    <div className="flex h-screen w-full">
      <Navbar />

      <main className="bg-dark-background h-screen w-full"></main>
    </div>
  );
};

export default Home;
