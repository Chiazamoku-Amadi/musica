import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";
import { fetchPopularArtists, fetchTrendingAlbums } from "../spotifyAPI";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
interface Album {
  id: string;
  name: string;
  images: { url: string }[];
  artists: { name: string }[];
}

interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
}

const Home: React.FC = () => {
  const [trendingAlbums, setTrendingAlbums] = useState<Album[]>([]);
  const [popularArtists, setPopularArtists] = useState<Artist[]>([]);
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  // Fetching Trending Albums
  useEffect(() => {
    if (accessToken) {
      fetchTrendingAlbums(accessToken)
        .then((data) => setTrendingAlbums(data))
        .catch(console.error);
    }
  }, [accessToken]);

  // Fetching Popular Artists
  useEffect(() => {
    if (accessToken) {
      fetchPopularArtists(accessToken)
        .then((data) => setPopularArtists(data))
        .catch(console.error);
    }
  }, [accessToken]);

  const albums = trendingAlbums.map((album) => (
    <SwiperSlide key={album.id} className="col-span-1">
      <div className="relative w-full h-[70vh]">
        <img
          src={album.images[0].url}
          alt={album.name}
          className="w-full h-full object-top object-cover"
        />

        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
          <p className="text-base md:text-2xl font-semibold">
            {album.artists.map((artist) => artist.name).join(", ")}
          </p>
          <h3 className="text-sm md:text-base">{album.name}</h3>
        </div>
      </div>
    </SwiperSlide>
  ));

  const artists = popularArtists.map((artist) => (
    <div key={artist.id} className="space-y-2">
      <img
        src={artist.images[0].url}
        alt="album-image"
        className="rounded-xl shadow-2xl h-52 w-full"
      />
      <p className="text-xs md:text-sm">
        {artist.name.length >= 20
          ? `${artist.name.slice(0, 20)}...`
          : artist.name}
      </p>
    </div>
  ));

  return (
    <div className="flex justify-end overflow-hidden h-screen w-full">
      <Navbar />

      <main
        className={`${
          isDarkMode ? "bg-dark-background" : "bg-light-background"
        } overflow-y-auto h-screen w-full`}
      >
        <Topbar />

        <div className="space-y-6 md:space-y-10 p-4 md:p-8 w-full">
          <section
            className={`${
              isDarkMode ? "text-primary-text" : "text-dark-background"
            } w-full`}
          >
            <h3 className="text-2xl md:text-3xl font-medium mb-4">
              Trending Albums
            </h3>

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              className="mySwiper rounded-2xl"
              style={{ height: "70vh" }}
            >
              {albums}
            </Swiper>
          </section>

          <section
            className={`${
              isDarkMode ? "text-primary-text" : "text-dark-background"
            } w-full`}
          >
            <h3 className="text-2xl md:text-3xl font-medium mb-4">
              Popular Artists
            </h3>
            <div className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6 xs:gap-x-3">
              {artists}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
