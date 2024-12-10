import { useState } from "react";
import Navbar from "../../components/Navbar";
// import { useAuthStore } from "../../store/authUser";
import { Link } from "react-router-dom";
import { Info, Play } from "lucide-react";
import useGetTrendingContent from "../../hooks/useGetTrendingContent";
import {
  MOVIE_CATEGORIES,
  ORIGINAL_IMG_BASE_URL,
  TV_CATEGORIES,
} from "../../utils/constants";
import { useContentStore } from "../../store/content";
import MovieSlider from "../../components/MovieSlider";
import { useTranslation } from "react-i18next";

const HomeScreen = () => {
  const { trendingContent } = useGetTrendingContent();
  const [imgLoading, setImgLoading] = useState(true);
  const { contentType } = useContentStore();
  console.log(trendingContent);
  const { t } = useTranslation();

  // const { logout } = useAuthStore();
  if (!trendingContent) {
    // Optionally display a loading state or error message
    return (
      <div className="h-screen text-white relative">
        <Navbar />
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer" />
      </div>
    );
  }
  return (
    <>
      <div className="relative h-screen text-white">
        <Navbar />
        {imgLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer" />
        )}

        <img
          src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path}
          alt="extraction"
          className="absolute top-0 left-0 w-full h-full object-cover -z-50"
          onLoad={() => {
            setImgLoading(false);
          }}
        />
        <div
          className="absolute top-0 left-0 w-full h-full bg-black/50 -z-50"
          aria-hidden="true"
        />

        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32">
          <div className="bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-10" />

          <div className="max-w-2xl ">
            {/* one for t=movie i.e title and one for tv i.e name */}
            <h1 className="mt-4 text-6xl  font-extrabold text-balance">
              {trendingContent?.title || trendingContent?.name}
            </h1>
            {/* we take 2024-07-1 split by - and take the forst one only as poori date is stored */}
            <p className="mt-2 text-lg">
              {trendingContent?.release_date
                ? trendingContent.release_date.split("-")[0]
                : trendingContent?.first_air_date
                ? trendingContent.first_air_date.split("-")[0]
                : "Unknown year"}{" "}
              | {trendingContent?.adult ? "18+" : "PG-13"}
            </p>
            <p className="mt-4 text-lg">
              {trendingContent.overview.length > 200
                ? `${trendingContent.overview.slice(0, 200)}...`
                : trendingContent.overview}
            </p>
          </div>

          <div className="flex mt-8">
            <Link
              to={`/moreinfo`}
              className="bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex items-center"
            >
              <Play className="size-6  mr-2 fill-black" />
              {t("play")}
            </Link>

            {/* more info */}
            <Link
              to={`/movie/${trendingContent?.id}`}
              className="bg-gray/70 hover:bg-gray-500 text-white py-2 px-4 rounded mr-4 flex items-center"
            >
              <Info className="size-6  mr-2" />
              {t("moreinfo")}
            </Link>
          </div>
        </div>
      </div>

      {/* 2nd portion */}
      <div className="flex flex-col gap-10 bg-black py-10">
        {contentType === "movie"
          ? MOVIE_CATEGORIES.map((category) => (
              <MovieSlider key={category} category={category} />
            ))
          : TV_CATEGORIES.map((category) => (
              <MovieSlider key={category} category={category} />
            ))}
      </div>
    </>
  );
};

export default HomeScreen;
