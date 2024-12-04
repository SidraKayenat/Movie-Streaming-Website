import { User } from "../model/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";



export async function searchPerson(req, res) {
    const { query } = req.params;
    try {
        //fo to website and search "search"
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);

        if (response.results.length === 0) {
            return res.status(404).send(null);
        }

    
        //we hhave req.user=user  in our protectionRoute thats why we use req.body here 
        //updating the search History of the person 

        //this is jo searh hsitory me jao to we get spearate boxes of  what we search what it  is and the date below it  and also the profile img 
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].profile_path,
                    title: response.results[0].name,
                    searchType: "person",
                    createdAt: new Date(),

                }   }  } )
        res.status(200).json({ success: true, content: response.results })
    } catch (error) {
        console.log("Error in searchPerson controller : " + error.message)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

export async function searchMovie(req, res) {
    const { query } = req.params;
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);
        if (response.results.length === 0) {
            return res.status(404).send(null);
        }


        //thjis i found from api website, i search a movie and from all the many thhing si got i decided to choose these poster_path etc 
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].title,
                    searchType: "movie",
                    createdAt: new Date(),

                }
            }
        })
        res.status(200).json({ success: true, content: response.results })
    } catch (error) {
        console.log("Error in searchMovie controller : " + error.message)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}









export async function searchTV(req, res) {
    const { query } = req.params;
    try {
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);
        if (response.results.length === 0) {
            return res.status(404).send(null);
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id,
                    image: response.results[0].poster_path,
                    title: response.results[0].name,
                    searchType: "tv",
                    createdAt: new Date(),

                }
            }
        }
        )


        res.status(200).json({ success: true, content: response.results })
    } catch (error) {
        console.log("Error in searchPerson controller : " + error.message)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}






export async function getSearchHistory(req, res) {
try {
    res.status(200).json({ success: true, content: req.user.searchHistory });
} catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
}
}



export async function removeItemFromSearchHistory(req, res) {
    try {
        const id = parseInt(req.params.id); // Parse the ID as an integer

        // Ensure the ID is a valid number
        if (isNaN(id)) {
            return res.status(400).json({ success: false, message: "Invalid ID format" });
        }

        // Use $pull to remove the item with the matching ID
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory: { id }, // Match the exact structure of your searchHistory items
            },
        });

        res.status(200).json({ success: true, message: "Item removed from search history" });
    } catch (error) {
        console.error("Error in removeItemFromSearchHistory controller:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

    

