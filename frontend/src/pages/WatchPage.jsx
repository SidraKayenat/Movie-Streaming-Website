// src/pages/WatchPage.jsx
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useContentStore } from "../store/content";
import { useAuthStore } from "../store/authUser";
import axios from "axios";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";
import { formatReleaseDate } from "../utils/dateFunction";
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const WatchPage = () => {
  const { id } = useParams();
  const [trailers, setTrailers] = useState([]);
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({});
  const { contentType } = useContentStore();
  const { subscriptionPlan } = useAuthStore();
  const movieScreenRef = useRef(null);

  const [showAd, setShowAd] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(true);
  const [adUrl, setAdUrl] = useState("");
  const { t } = useTranslation();
  const language = i18n.language;

  const adVideos = [
    "https://www.youtube.com/watch?v=IoO5O-VhZAQ",
    "https://www.youtube.com/watch?v=JbKVuQoe8BM",
    "https://www.youtube.com/watch?v=2zLnqlCu_4g",
    "https://www.youtube.com/watch?v=5UCVLFNQYys",
    "https://www.youtube.com/watch?v=PD9kAsziXJw",
    "https://www.youtube.com/watch?v=Xw6cNwjEthg",
    "https://www.youtube.com/watch?v=XnoUVviFOWw",
    "https://www.youtube.com/watch?v=VeFgKwdvjUE"
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
        setTrailers(res.data.trailers || []);
        setCurrentTrailerIdx(0);
      } catch (error) {
        console.error("Error fetching trailers:", error.message);
        setTrailers([]);
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

  useEffect(() => {
    if (subscriptionPlan === "Basic") {
      setAdUrl(getRandomAd());
      setShowAd(true);
      setLoadingVideo(true);
      setTimeout(() => {
        setLoadingVideo(false);
      }, 5000);
    } else {
      setShowAd(false);
      setLoadingVideo(false);
    }
  }, [subscriptionPlan]);

  const scrollToMovieScreen = () => {
    movieScreenRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-10">
        <WatchPageSkeleton />
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8 h-full">
        {showAd && (
          <div className="ad-container text-center mb-8">
            <ReactPlayer
              controls={false}
              width="100%"
              height="70vh"
              className="mx-auto rounded-lg"
              url={adUrl}
              onEnded={() => setShowAd(false)}
              playing={true}
            />
          </div>
        )}

        {!showAd && trailers.length > 0 && (
          <>
            <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
              <ReactPlayer
                controls={true}
                width="100%"
                height="70vh"
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

        {/* Movie Details */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto">
          <div className="mb-4 md:mb-0">
            <h2 className="text-5xl font-bold">{content?.title || content?.name}</h2>
            <p className="mt-2 text-lg">
              {formatReleaseDate(content?.release_date || content?.first_air_date)} |{" "}
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
            alt="Poster"
            className="max-h-[600px] rounded-md"
          />
        </div>

        {/* Movie Screen */}
        <div
          ref={movieScreenRef}
          className="bg-gray-800 rounded-lg shadow-md p-6 mt-10 max-w-6xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-center mb-6">Enjoy Your Movie!</h2>
          <div className="aspect-video bg-black rounded-lg border-4 border-gray-700 flex items-center justify-center">
            <p className="text-gray-400 text-lg">Your movie will play here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
