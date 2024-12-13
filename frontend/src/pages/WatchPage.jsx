import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useContentStore } from "../store/content";
import { useAuthStore } from "../store/authUser";
import axios from "axios";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player";
// import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";
import { formatReleaseDate } from "../utils/dateFunction";
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const WatchPage = () => {
  const { id } = useParams();
  const [trailers, setTrailers] = useState([]); // Holds trailers
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0); // Index of the trailer to display
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({});
  // const [similarContent, setSimilarContent] = useState([]);
  const { contentType } = useContentStore();
  const { subscriptionPlan } = useAuthStore();
  const movieScreenRef = useRef(null); // Ref for the movie screen section

  const [showAd, setShowAd] = useState(false); // Track if ad should be shown
  const [loadingVideo, setLoadingVideo] = useState(true); // Track if the video is loading
  const [adUrl, setAdUrl] = useState("");
  const { t } = useTranslation();
  const language = i18n.language;
  const adVideos = [
    "https://www.youtube.com/watch?v=IoO5O-VhZAQ", // Ad 1
    "https://www.youtube.com/watch?v=JbKVuQoe8BM", // Ad 2
    "https://www.youtube.com/watch?v=2zLnqlCu_4g",
    "https://www.youtube.com/watch?v=5UCVLFNQYys",

    "https://www.youtube.com/watch?v=PD9kAsziXJw", //new,
    "https://www.youtube.com/watch?v=Xw6cNwjEthg", //ufone 1
    "https://www.youtube.com/watch?v=XnoUVviFOWw", //bata ad
    "https://www.youtube.com/watch?v=VeFgKwdvjUE",
  ];

  const getRandomAd = () => {
    const randomIndex = Math.floor(Math.random() * adVideos.length);
    return adVideos[randomIndex];
  };
  useEffect(() => {
    const getTrailers = async () => {
      try {
        const res = await axios.get(
          `/api/v1/${contentType}/${id}/trailers?language=${language}`
        );
        setTrailers(res.data.trailers || []); // Set trailers from the response
        setCurrentTrailerIdx(0); // Always show the first trailer by default
      } catch (error) {
        console.error("Error fetching trailers:", error.message);
        setTrailers([]); // Empty array if error occurs
      }
    };

    getTrailers();
  }, [contentType, id, language]);

  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const res = await axios.get(
          `/api/v1/${contentType}/${id}/details?language=${language}`
        );
        setContent(res.data.content || {});
      } catch (error) {
        console.error("Error fetching content details:", error.message);
        setContent(null);
      } finally {
        setLoading(false);
      }
    };

    getContentDetails();
  }, [contentType, id, language]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleNext = () => {
    if (currentTrailerIdx < trailers.length - 1)
      setCurrentTrailerIdx(currentTrailerIdx + 1);
  };

  const handlePrev = () => {
    if (currentTrailerIdx > 0) setCurrentTrailerIdx(currentTrailerIdx - 1);
  };

  const handleAdEnd = () => {
    setShowAd(false); // Hide the ad once it ends
    setLoadingVideo(false); // Allow trailer to load
  };

  const scrollToMovieScreen = () => {
    movieScreenRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (subscriptionPlan === "Basic") {
      // Show ad and slow down video loading
      setAdUrl(getRandomAd()); // Get and set a random ad URL
      setShowAd(true);
      setLoadingVideo(true);
      setTimeout(() => {
        setLoadingVideo(false); // Simulate slow loading after a delay (for basic plan)
      }, 5000); // 5 seconds delay before showing the trailer
    } else {
      // Premium plan - no ad, faster loading
      setShowAd(false);
      setLoadingVideo(false);
    }
  }, [subscriptionPlan]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-10">
        <WatchPageSkeleton />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="bg-black text-white h-screen">
        <div className="max-w-6xl mx-auto">
          <Navbar />
          <div className="text-center mx-auto px-4 py-8 h-full mt-40">
            <h2 className="text-2xl sm:text-5xl font-bold text-balance">
              {t("Content not found 😥")}
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    // <div className="bg-black min-h-screen text-white">
    <div className=" bg-black relative  h-screen text-white">
      <div className="mx-auto container px-4 h-full">
        <Navbar />

        {showAd && (
          <div className="ad-container text-center mb-8">
            {/* <h2 className="text-xl text-white mb-4"></h2> */}
            <ReactPlayer
              controls={false} // Disable controls to prevent fast-forwarding
              width="100%"
              height="70vh"
              className="mx-auto rounded-lg"
              url={adUrl} // Use the current ad URL
              onEnded={handleAdEnd} // Hide ad and show video after ad ends
              playing={true} // Ensure video plays automatically
            />
          </div>
        )}

        {/* Show Trailers */}
        {!showAd && trailers.length > 0 && (
          <>
            {/* <div className="flex justify-between items-center mb-4">
              <button
                className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                  currentTrailerIdx === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={currentTrailerIdx === 0}
                onClick={handlePrev}
              >
                <ChevronLeft size={24} />
              </button>

              <button
                className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                  currentTrailerIdx === trailers.length - 1
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={currentTrailerIdx === trailers.length - 1}
                onClick={handleNext}
              >
                <ChevronRight size={24} />
              </button>
            </div> */}

            <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
              <ReactPlayer
                controls={true}
                width={"100%"}
                height={"70vh"}
                className="mx-auto overflow-hidden rounded-lg"
                url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx]?.key}`}
              />
            </div>

            {/* Watch Now Button */}
            <div className="text-center mb-8">
              <button
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg"
                onClick={scrollToMovieScreen}
              >
                Watch Now
              </button>
            </div>
          </>
        )}

        {/* Show if No Trailers */}
        {trailers.length === 0 && !showAd && (
          <h2 className="text-xl text-center mt-5">
            {t("No official trailers available for")}
            <span className="font-bold text-red-600 mx-2">
              {content?.title || content?.name}
            </span>
            😥
          </h2>
        )}

        {/* Movie Details */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto">
          <div className="mb-4 md:mb-0">
            <h2 className="text-5xl font-bold text-balance">
              {content?.title || content?.name}
            </h2>
            <p className="mt-2 text-lg">
              {formatReleaseDate(
                content?.release_date || content?.first_air_date
              )}{" "}
              |{" "}
              {content?.adult ? (
                <span className="text-red-600">18+</span>
              ) : (
                <span className="text-green-600">PG-13</span>
              )}
            </p>
            <p className="mt-4 text-lg">{content?.overview}</p>
          </div>
          <img
            src={ORIGINAL_IMG_BASE_URL + content?.poster_path}
            alt="Poster image"
            className="max-h-[600px] rounded-md"
          />
        </div>
        {/* Movie Screen */}
        <div
          ref={movieScreenRef}
          className="bg-gray-800 rounded-lg shadow-md p-6 mt-10 max-w-6xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-center mb-6">
            Enjoy Your Movie!
          </h2>
          <div className="aspect-video bg-black rounded-lg border-4 border-gray-700 flex items-center justify-center">
            <p className="text-gray-400 text-lg">Your movie will play here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
