// import { fetchFromTMDB } from "../services/tmdb.service.js";

// export async function getMoreInfo(req, res) {
//     const { type, id } = req.params; // 'type' will be either 'movie', 'tv', or 'person'

//     try {
//         let url = '';

//         if (type === 'movie') {
//             url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
//         } else if (type === 'tv') {
//             url = `https://api.themoviedb.org/3/tv/${id}?language=en-US`;
//         } else if (type === 'person') {
//             url = `https://api.themoviedb.org/3/person/${id}?language=en-US`;
//         }

//         const response = await fetchFromTMDB(url);

//         if (!response) {
//             return res.status(404).json({ success: false, message: "Data not found" });
//         }

//         res.status(200).json({ success: true, content: response });
//     } catch (error) {
//         console.error("Error in getMoreInfo controller:", error.message);
//         res.status(500).json({ success: false, message: "Internal server error" });
//     }
// }
import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getMoreInfo(req, res) {
  const { type, id } = req.params; // 'type' will be either 'movie', 'tv', or 'person'
  const language = req.query.language || "en-US";
  try {
    let url = "";

    if (type === "movie") {
      url = `https://api.themoviedb.org/3/movie/${id}?language=${language}`;
    } else if (type === "tv") {
      url = `https://api.themoviedb.org/3/tv/${id}?language=${language}`;
    } else if (type === "person") {
      url = `https://api.themoviedb.org/3/person/${id}?language=${language}`;
    }

    const response = await fetchFromTMDB(url);

    if (!response) {
      return res
        .status(404)
        .json({ success: false, message: "Data not found" });
    }

    // If type is 'movie', fetch reviews
    if (type === "movie") {
      const reviewsUrl = `https://api.themoviedb.org/3/movie/${id}/reviews?language=${language}`;
      const reviewsResponse = await fetchFromTMDB(reviewsUrl);
      response.reviews = reviewsResponse.results || []; // Add reviews to the response

      // Fetch cast (starring) for the movie
      const castUrl = `https://api.themoviedb.org/3/movie/${id}/credits?language=${language}`;
      const castResponse = await fetchFromTMDB(castUrl);
      response.cast = castResponse.cast || []; // Add cast to the response
    }

    // If type is 'tv', fetch reviews, cast (starring), and creators
    if (type === "tv") {
      const reviewsUrl = `https://api.themoviedb.org/3/tv/${id}/reviews?language=${language}`;
      const reviewsResponse = await fetchFromTMDB(reviewsUrl);
      response.reviews = reviewsResponse.results || []; // Add reviews to the response

      // Fetch cast (starring) for the TV show
      const castUrl = `https://api.themoviedb.org/3/tv/${id}/credits?language=${language}`;
      const castResponse = await fetchFromTMDB(castUrl);
      response.cast = castResponse.cast || []; // Add cast to the response

      // Fetch creators of the TV show
      const creatorsUrl = `https://api.themoviedb.org/3/tv/${id}/created_by?language=${language}`;
      const creatorsResponse = await fetchFromTMDB(creatorsUrl);
      response.created_by = creatorsResponse.results || []; // Add creators to the response
    }

    // If type is 'person', fetch person-related data
    if (type === "person") {
      const personDetailsUrl = `https://api.themoviedb.org/3/person/${id}/combined_credits?language=${language}`;
      const personDetailsResponse = await fetchFromTMDB(personDetailsUrl);
      response.known_for = personDetailsResponse.cast || []; // Add known work to the response
    }

    res.status(200).json({ success: true, content: response });
  } catch (error) {
    console.error("Error in getMoreInfo controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
