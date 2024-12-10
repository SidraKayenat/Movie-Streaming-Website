import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingtv(req, res) {
  const language = req.query.language || "en-US";
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/trending/tv/day?language=${language}`
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];
    res.json({ success: true, content: randomMovie }); //used content not movie or tv show because depends on what we choose
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function gettvTrailers(req, res) {
  const { id } = req.params;
  const language = req.query.language || "en-US";
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=${language}`
    );
    res.json({ success: true, trailers: data.results });
  } catch (error) {
    if (error.msg.include("404")) {
      return res.status(404).send(null);
    }

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function gettvDetails(req, res) {
  const language = req.query.language || "en-US";
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=${language}`
    );
    res.json({ success: true, content: data });
  } catch (error) {
    if (error.msg.include("404")) {
      return res.status(404).send(null);
    }

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getSimiliartv(req, res) {
  const language = req.query.language || "en-US";
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=${language}&page=1`
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

//
//this is for all the categories which are popular , now playing etc
export async function gettvByCategory(req, res) {
  const language = req.query.language || "en-US";
  const { category } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${category}?language=${language}&page=1`
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
