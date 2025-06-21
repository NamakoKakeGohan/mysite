const axios   = require("axios");

const API_KEY  = process.env.API_KEY;
const BASE_URL = "https://api.steampowered.com";

module.exports = async (req, res) => {
  try {
    const { type, appid } = req.query;

    if (type === "apps") {
      const r = await axios.get(`${BASE_URL}/ISteamApps/GetAppList/v2/`, {
        params: { key: API_KEY }
      });
      return res.status(200).json(r.data);
    }

    if (type === "appdetails" && appid) {
      const r = await axios.get(
        `https://store.steampowered.com/api/appdetails?appids=${appid}&cc=jp&l=japanese`
      );
      return res.status(200).json(r.data);
    }

    return res.status(400).json({ error: "Invalid query" });
  } catch (err) {
    console.error("Steam proxy error:", err);
    return res.status(500).json({ error: err.message });
  }
};
