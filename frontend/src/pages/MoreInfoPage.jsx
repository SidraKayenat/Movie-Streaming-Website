
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Loader } from "lucide-react";
// import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";
// import i18n from "../i18n";
// import { useTranslation } from "react-i18next";
// import Navbar from "../components/Navbar";

// const MoreInfoPage = () => {
//   const { type, id } = useParams(); // Get type (movie, tv, person) and id from the URL params
//   const navigate = useNavigate();
//   const [content, setContent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { t } = useTranslation();
//   const language = i18n.language;

//   useEffect(() => {
//     const fetchMoreInfo = async () => {
//       try {
//         const response = await axios.get(
//           `/api/v1/moreinfo/${type}/${id}?language=${language}`
//         );
//         setContent(response.data.content);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error.message);
//         navigate("/"); // Redirect to home page in case of error
//       }
//     };

//     fetchMoreInfo();
//   }, [type, id, navigate, language]);

//   if (loading) {
//     return (
//       <div className="h-screen flex justify-center items-center bg-black">
//         <Loader className="animate-spin text-red-600 size-10" />
//       </div>
//     );
//   }

//   return (
//     <div className="bg-black min-h-screen text-white">
//       <Navbar />
//       <div className="container mx-auto px-4 py-8">
//         {type === "movie" && content && (
//           <div className="movie-details space-y-6">
//             <h2 className="text-4xl font-bold mb-4">{content.title}</h2>
//             <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
//               <img
//                 src={`${ORIGINAL_IMG_BASE_URL}${content.poster_path}`}
//                 alt={content.title}
//                 className="w-64 h-auto shadow-lg rounded-lg"
//               />
//               <div className="text-base md:text-lg space-y-4">
//                 <p>{content.overview}</p>
//                 <p>
//                   <strong>{t("Release Date:")}</strong> {content.release_date}
//                 </p>
//                 <p>
//                   <strong>{t("Genres:")}</strong>{" "}
//                   {content.genres.map((genre) => genre.name).join(", ")}
//                 </p>
//                 <p>
//                   <strong>{t("Rating:")}</strong> {content.vote_average}
//                 </p>
//               </div>
//             </div>

//             <div className="mb-4">
//               <strong>{t("Starring:")}</strong>
//               <div className="flex gap-2 mt-2">
//                 {content.cast &&
//                   content.cast.slice(0, 5).map((actor) => (
//                     <div key={actor.id} className="actor">
//                       <img
//                         src={`${ORIGINAL_IMG_BASE_URL}${actor.profile_path}`}
//                         alt={actor.name}
//                         className="w-16 h-16 rounded-full"
//                       />
//                       <p className="text-sm">{actor.name}</p>
//                     </div>
//                   ))}
//               </div>
//             </div>

//             {/* Reviews */}
//             {content.reviews && content.reviews.length > 0 && (
//               <div className="reviews mt-8">
//                 <h3 className="text-2xl font-semibold">Reviews</h3>
//                 <div className="review-cards space-y-6 mt-4">
//                   {content.reviews.map((review, index) => (
//                     <div
//                       key={index}
//                       className="review-card p-6 bg-gray-800 rounded-lg shadow-md"
//                     >
//                       <p className="font-semibold">{review.author}</p>
//                       <p className="text-sm text-gray-400">
//                         {review.created_at}
//                       </p>
//                       <p className="mt-2">{review.content}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Created By (TV shows) */}
//             {type === "tv" &&
//               content.created_by &&
//               content.created_by.length > 0 && (
//                 <div className="created-by mt-8">
//                   <h3 className="text-2xl font-semibold">Created By</h3>
//                   <div className="flex space-x-6 mt-4">
//                     {content.created_by.map((creator) => (
//                       <div
//                         key={creator.id}
//                         className="creator-card text-center"
//                       >
//                         <img
//                           src={`${ORIGINAL_IMG_BASE_URL}${creator.profile_path}`}
//                           alt={creator.name}
//                           className="w-24 h-24 mx-auto rounded-full shadow-md"
//                         />
//                         <p className="mt-2">{creator.name}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//           </div>
//         )}

//         {type === "tv" && content && (
//           <div className="tv-details space-y-6">
//             <h2 className="text-4xl font-bold mb-4">{content.name}</h2>
//             <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
//               <img
//                 src={`${ORIGINAL_IMG_BASE_URL}${content.poster_path}`}
//                 alt={content.name}
//                 className="w-64 h-auto shadow-lg rounded-lg"
//               />
//               <div className="text-base md:text-lg space-y-4">
//                 <p>{content.overview}</p>
//                 <p>
//                   <strong>First Air Date:</strong> {content.first_air_date}
//                 </p>
//                 <p>
//                   <strong>Genres:</strong>{" "}
//                   {content.genres.map((genre) => genre.name).join(", ")}
//                 </p>
//                 <p>
//                   <strong>Rating:</strong> {content.vote_average}
//                 </p>
//               </div>
//             </div>

//             {/* Reviews */}
//             {content.reviews && content.reviews.length > 0 && (
//               <div className="reviews mt-8">
//                 <h3 className="text-2xl font-semibold">Reviews</h3>
//                 <div className="review-cards space-y-6 mt-4">
//                   {content.reviews.map((review, index) => (
//                     <div
//                       key={index}
//                       className="review-card p-6 bg-gray-800 rounded-lg shadow-md"
//                     >
//                       <p className="font-semibold">{review.author}</p>
//                       <p className="text-sm text-gray-400">
//                         {review.created_at}
//                       </p>
//                       <p className="mt-2">{review.content}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {type === "person" && content && (
//           <div className="person-details space-y-6">
//             <h2 className="text-4xl font-bold mb-4">{content.name}</h2>
//             <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
//               <img
//                 src={`${ORIGINAL_IMG_BASE_URL}${content.profile_path}`}
//                 alt={content.name}
//                 className="w-64 h-64 rounded-full shadow-lg"
//               />
//               <div className="text-base md:text-lg space-y-4">
//                 <p>{content.biography}</p>
//                 <p>
//                   <strong>Birthday:</strong> {content.birthday}
//                 </p>
//                 <p>
//                   <strong>Known for:</strong> {content.known_for_department}
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MoreInfoPage;









import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader } from "lucide-react";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";

const MoreInfoPage = () => {
  const { type, id } = useParams(); // Get type (movie, tv, person) and id from the URL params
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const language = i18n.language;
  const [expandedReviews, setExpandedReviews] = useState([]);

  useEffect(() => {
    const fetchMoreInfo = async () => {
      try {
        const response = await axios.get(
          `/api/v1/moreinfo/${type}/${id}?language=${language}`
        );
        setContent(response.data.content);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        navigate("/"); // Redirect to home page in case of error
      }
    };

    fetchMoreInfo();
  }, [type, id, navigate, language]);

  const truncateReview = (content, wordLimit) => {
    const words = content.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return content;
  };

  const toggleReview = (index) => {
    setExpandedReviews((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-black">
        <Loader className="animate-spin text-red-600 size-10" />
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {type === "movie" && content && (
          <div className="movie-details space-y-6">
            <h2 className="text-4xl font-bold mb-4">{content.title}</h2>
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
              <img
                src={`${ORIGINAL_IMG_BASE_URL}${content.poster_path}`}
                alt={content.title}
                className="w-64 h-auto shadow-lg rounded-lg"
              />
              <div className="text-base md:text-lg space-y-4">
                <p>{content.overview}</p>
                <p>
                  <strong>{t("Release Date:")}</strong> {content.release_date}
                </p>
                <p>
                  <strong>{t("Genres:")}</strong>{" "}
                  {content.genres.map((genre) => genre.name).join(", ")}
                </p>
                <p>
                  <strong>{t("Rating:")}</strong> {content.vote_average}
                </p>
              </div>
            </div>
               {/* cast */}
           {/* Cast */}
<div className="mb-4">
  <div className="flex flex-col">
    {/* Cast Heading */}
    <h3 className="text-2xl font-semibold mb-4">{t("Cast")}</h3>
    <div className="flex gap-4 mt-2">
      {content.cast &&
        content.cast.slice(0, 5).map((actor) => (
          <div
            key={actor.id}
            className="actor text-center bg-gray-800 p-4 rounded-lg shadow-lg"
          >
            <div
              className="w-24 h-24 bg-gray-200 flex items-center justify-center overflow-hidden mx-auto"
              style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
            >
              <img
                src={`${ORIGINAL_IMG_BASE_URL}${actor.profile_path}`}
                alt={actor.name}
                className="w-20 h-20 rounded-full object-cover"
              />
            </div>
            <p className="text-sm mt-2">{actor.name}</p>
          </div>
        ))}
    </div>
  </div>
</div>





            {/* Reviews */}
            {content.reviews && content.reviews.length > 0 && (
              <div className="reviews mt-8">
                <h3 className="text-2xl font-semibold">Reviews</h3>
                <div className="review-cards space-y-6 mt-4">
                  {content.reviews.map((review, index) => {
                    const isExpanded = expandedReviews.includes(index);
                    const truncatedContent = truncateReview(review.content, 70);
                    return (
                      <div
                        key={index}
                        className="review-card p-6 bg-black border-2 border-red-600 rounded-lg shadow-md"
                      >
                        <p className="font-semibold">{review.author}</p>
                        <p className="text-sm text-gray-400">
                          {review.created_at}
                        </p>
                        <p className="mt-2">
                          {isExpanded ? review.content : truncatedContent}
                        </p>
                        {truncatedContent !== review.content && (
                          <button
                            className="text-blue-500 mt-2"
                            onClick={() => toggleReview(index)}
                          >
                            {isExpanded ? "See Less" : "See More"}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {type === "tv" && content && (
          <div className="tv-details space-y-6">
            <h2 className="text-4xl font-bold mb-4">{content.name}</h2>
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
              <img
                src={`${ORIGINAL_IMG_BASE_URL}${content.poster_path}`}
                alt={content.name}
                className="w-64 h-auto shadow-lg rounded-lg"
              />
              <div className="text-base md:text-lg space-y-4">
                <p>{content.overview}</p>
                <p>
                  <strong>First Air Date:</strong> {content.first_air_date}
                </p>
                <p>
                  <strong>Genres:</strong>{" "}
                  {content.genres.map((genre) => genre.name).join(", ")}
                </p>
                <p>
                  <strong>Rating:</strong> {content.vote_average}
                </p>
              </div>
            </div>

            {/* Reviews */}
            {content.reviews && content.reviews.length > 0 && (
              <div className="reviews mt-8">
                <h3 className="text-2xl font-semibold">Reviews</h3>
                <div className="review-cards space-y-6 mt-4">
                  {content.reviews.map((review, index) => {
                    const isExpanded = expandedReviews.includes(index);
                    const truncatedContent = truncateReview(review.content, 70);
                    return (
                      <div
                        key={index}
                        className="review-card p-6 bg-gray-800 rounded-lg shadow-md"
                      >
                        <p className="font-semibold">{review.author}</p>
                        <p className="text-sm text-gray-400">
                          {review.created_at}
                        </p>
                        <p className="mt-2">
                          {isExpanded ? review.content : truncatedContent}
                        </p>
                        {truncatedContent !== review.content && (
                          <button
                            className="text-blue-500 mt-2"
                            onClick={() => toggleReview(index)}
                          >
                            {isExpanded ? "See Less" : "See More"}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoreInfoPage;
