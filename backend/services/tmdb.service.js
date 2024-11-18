import { ENV_VARS } from "../config/envVars.js";
import axios from 'axios'




//   fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

//why created another function , for this options because for any other like movie , popular , hit, latest etc the otpions arer  same only url changes so we keep options costant rather than for each f the fetching the same thing again and again

export const fetchFromTMDB = async (url) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + ENV_VARS.TMDB_API_KEY
        }
    };

    const response = await axios.get(url, options)
    if (response.status !== 200) {
        throw new Error('Failed to fetch data from TMDB , error : ' + response.statusText)
    }


    return response.data
}