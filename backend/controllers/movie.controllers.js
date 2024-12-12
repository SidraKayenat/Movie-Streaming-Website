// import { fetchFromTMDB } from "../services/tmdb.service.js";

// export async function getTrendingMovie(req, res) {
//   const language = req.query.language || "en-US";
//   try {
//     const data = await fetchFromTMDB(
//       `https://api.themoviedb.org/3/trending/movie/day?language=${language}`
//     );
//     const randomMovie =
//       data.results[Math.floor(Math.random() * data.results?.length)];
//     res.json({ success: true, content: randomMovie }); //used content not movie or tv show because depends on what we choose
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// }

// export async function getMovieTrailers(req, res) {
//   const { id } = req.params;
//   const language = req.query.language || "en-US";
//   try {
//     const data = await fetchFromTMDB(
//       `https://api.themoviedb.org/3/movie/${id}/videos?language=${language}`
//     );

//     // Filter for official trailers
//     const officialTrailers = data.results.filter(
//       (video) => video.type === "Trailer" && video.official === true
//     );

//     // Fallback to any trailers if no official ones are found
//     const fallbackTrailers = data.results.filter(
//       (video) => video.type === "Trailer"
//     );

//     // Merge official trailers (prioritized first) and fallback trailers
//     const trailers = [
//       ...officialTrailers,
//       ...fallbackTrailers.filter((video) => !officialTrailers.includes(video)),
//     ];

//     res.json({ success: true, trailers: trailers }); // Return prioritized trailers
//   } catch (error) {
//     console.error("Error fetching movie trailers:", error.message);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// }

// // export async function getMovieDetails(req, res) {
// //   const { id } = req.params;
// //   const language = req.query.language || "en-US";
// //   try {
// //     const data = await fetchFromTMDB(
// //       `https://api.themoviedb.org/3/movie/${id}?language=${language}`
// //     );
// //     res.json({ success: true, content: data });
// //   } catch (error) {
// //     if (error.msg.include("404")) {
// //       return res.status(404).send(null);
// //     }

// //     res.status(500).json({ success: false, message: "Internal Server Error" });
// //   }
// // }

// // import { fetchFromTMDB } from "../services/tmdb.service.js";

// export async function getMovieDetails(req, res) {
//   const { id } = req.params;
//   const language = req.query.language || "en-US"; // Default to 'en-US', but can be changed to 'it-IT' for Italian

//   try {
//     // Fetch movie details with the specified language
//     const data = await fetchFromTMDB(
//       `https://api.themoviedb.org/3/movie/${id}?language=${language}&api_key=your_api_key`
//     );

//     // Check if the movie title is translated
//     const titleInLanguage = data.title || data.name || "No title available";

//     console.log(`Title in ${language}: ${titleInLanguage}`); // Log the movie title in the requested language

//     res.json({ success: true, content: data }); // Return the movie details
//   } catch (error) {
//     if (error.message.includes("404")) {
//       return res.status(404).send(null);
//     }

//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// }


// export async function getSimiliarMovies(req, res) {
//   const { id } = req.params;
//   const language = req.query.language || "en-US";
//   try {
//     const data = await fetchFromTMDB(
//       `https://api.themoviedb.org/3/movie/${id}/similar?language=${language}&page=1`
//     );
//     res.status(200).json({ success: true, content: data.results });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// }

// //
// //this is for all the categories which are popular , now playing etc
// export async function getMoviesByCategory(req, res) {
//   const { category } = req.params;
//   const language = req.query.language || "en-US";
//   try {
//     const data = await fetchFromTMDB(
//       `https://api.themoviedb.org/3/movie/${category}?language=${language}&page=1`
//     );
//     res.status(200).json({ success: true, content: data.results });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// }










// import { fetchFromTMDB } from "../services/tmdb.service.js";

// export async function getTrendingMovie(req, res) {
//   const language = req.query.language || "en-US";
//   try {
//     const data = await fetchFromTMDB(
//       `https://api.themoviedb.org/3/trending/movie/day?language=${language}`
//     );

//     // Filter movies based on the selected language
//     const filteredMovies = data.results.filter(movie => {
//       // Check if the title or overview is available in the selected language
//       const hasTitleInLanguage = movie.title && movie.original_language === language;
//       const hasOverviewInLanguage = movie.overview && movie.original_language === language;

//       if (!hasTitleInLanguage && !hasOverviewInLanguage) {
//         return false; // Exclude movie if no relevant data in the selected language
//       }

//       return true;
//     });

//     if (filteredMovies.length === 0) {
//       return res.status(404).json({ success: false, message: "No movies available in this language." });
//     }

//     const randomMovie = filteredMovies[Math.floor(Math.random() * filteredMovies.length)];
//     res.json({ success: true, content: randomMovie });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// }


// export async function getMovieTrailers(req, res) {
//   const { id } = req.params;
//   const language = req.query.language || "en-US";
//   try {
//     const data = await fetchFromTMDB(
//       `https://api.themoviedb.org/3/movie/${id}/videos?language=${language}`
//     );

//     const officialTrailers = data.results.filter(
//       (video) => video.type === "Trailer" && video.official === true
//     );
//     const fallbackTrailers = data.results.filter(
//       (video) => video.type === "Trailer"
//     );

//     const trailers = [
//       ...officialTrailers,
//       ...fallbackTrailers.filter((video) => !officialTrailers.includes(video)),
//     ];

//     res.json({ success: true, trailers: trailers });
//   } catch (error) {
//     console.error("Error fetching movie trailers:", error.message);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// }

// export async function getMovieDetails(req, res) {
//   const { id } = req.params;
//   const language = req.query.language || "en-US"; // Default to 'en-US'

//   try {
//     const data = await fetchFromTMDB(
//       `https://api.themoviedb.org/3/movie/${id}?language=${language}&api_key=your_api_key`
//     );

//     // Ensure the movie title or name exists in the requested language
//     if (!data.title && !data.name) {
//       return res.status(404).json({ success: false, message: "Movie not available in this language." });
//     }

//     res.json({ success: true, content: data });
//   } catch (error) {
//     if (error.message.includes("404")) {
//       return res.status(404).send(null);
//     }

//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// }

// export async function getSimiliarMovies(req, res) {
//   const { id } = req.params;
//   const language = req.query.language || "en-US";
//   try {
//     const data = await fetchFromTMDB(
//       `https://api.themoviedb.org/3/movie/${id}/similar?language=${language}&page=1`
//     );

//     // Filter movies based on the selected language
//     const filteredMovies = data.results.filter(movie => {
//       if (language !== "en-US") {
//         // Exclude movies that have an English title if the selected language is not English
//         if (movie.title && movie.original_language === "en") {
//           return false; // Exclude movie with English title
//         }
//       }
//       return movie.title || movie.original_language === language;
//     });

//     res.status(200).json({ success: true, content: filteredMovies });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// }export async function getMoviesByCategory(req, res) {
//   const { category } = req.params;
//   const language = req.query.language || "en-US";
//   const totalPages = 3;  // Fetch multiple pages to get more movies (You can adjust this number)
//   let allMovies = [];

//   try {
//     // Loop through multiple pages to get more results
//     for (let page = 1; page <= totalPages; page++) {
//       const data = await fetchFromTMDB(
//         `https://api.themoviedb.org/3/movie/${category}?language=${language}&page=${page}`
//       );

//       // Filter movies based on the selected language
//       const filteredMovies = data.results.filter(movie => {
//         if (language !== "en-US") {
//           // Exclude movies that have an English title if the selected language is not English
//           if (movie.title && movie.original_language === "en") {
//             return false; // Exclude movie with English title
//           }
//         }
//         return movie.title || movie.original_language === language;
//       });

//       // Add the filtered movies to the overall list
//       allMovies = [...allMovies, ...filteredMovies];
//     }

//     if (allMovies.length === 0) {
//       return res.status(404).json({ success: false, message: "No movies available in this language." });
//     }

//     res.status(200).json({ success: true, content: allMovies });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// }



import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingMovie(req, res) {
  const language = req.query.language || "en-US";
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/trending/movie/day?language=${language}`
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];
    res.json({ success: true, content: randomMovie }); //used content not movie or tv show because depends on what we choose
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getMovieTrailers(req, res) {
  const { id } = req.params;
  const language = req.query.language || "en-US";
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=${language}`
    );

    // Filter for official trailers
    const officialTrailers = data.results.filter(
      (video) => video.type === "Trailer" && video.official === true
    );

    // Fallback to any trailers if no official ones are found
    const fallbackTrailers = data.results.filter(
      (video) => video.type === "Trailer"
    );

    // Merge official trailers (prioritized first) and fallback trailers
    const trailers = [
      ...officialTrailers,
      ...fallbackTrailers.filter((video) => !officialTrailers.includes(video)),
    ];

    res.json({ success: true, trailers: trailers }); // Return prioritized trailers
  } catch (error) {
    console.error("Error fetching movie trailers:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getMovieDetails(req, res) {
  const { id } = req.params;
  const language = req.query.language || "en-US";
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=${language}`
    );
    res.json({ success: true, content: data });
  } catch (error) {
    if (error.msg.include("404")) {
      return res.status(404).send(null);
    }

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getSimiliarMovies(req, res) {
  const { id } = req.params;
  const language = req.query.language || "en-US";
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=${language}&page=1`
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

//
//this is for all the categories which are popular , now playing etc
export async function getMoviesByCategory(req, res) {
  const { category } = req.params;
  const language = req.query.language || "en-US";
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${category}?language=${language}&page=1`
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}