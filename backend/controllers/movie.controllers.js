import { fetchFromTMDB } from "../services/tmdb.service.js";




export async function getTrendingMovie(req, res) {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];
        res.json({ success: true, content: randomMovie })  //used content not movie or tv show because depends on what we choose 
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}


export async function getMovieTrailers(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);

        // Filter for official trailers
        const officialTrailers = data.results.filter(
            (video) => video.type === "Trailer" && video.official === true
        );

        // Fallback to any trailers if no official ones are found
        const fallbackTrailers = data.results.filter((video) => video.type === "Trailer");

        // Merge official trailers (prioritized first) and fallback trailers
        const trailers = [...officialTrailers, ...fallbackTrailers.filter((video) => !officialTrailers.includes(video))];

        res.json({ success: true, trailers: trailers }); // Return prioritized trailers
    } catch (error) {
        console.error("Error fetching movie trailers:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}



export async function getMovieDetails(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        res.json({ success: true, content: data })

    } catch (error) {
        if (error.msg.include("404")) {
            return res.status(404).send(null)
        }

        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export async function getSimiliarMovies(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
        res.status(200).json({ success: true, content: data.results })

    } catch (error) {
      

        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

// 
//this is for all the categories which are popular , now playing etc 
export async function getMoviesByCategory(req, res) {
    const { category } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
        res.status(200).json({ success: true, content: data.results })

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" })

       
    }
}