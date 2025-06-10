import axios from "axios";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const { appid, type } = req.query;

  if (type === "apps") {
    // アプリ一覧取得
    try {
      const response = await axios.get(`${BASE_URL}/ISteamApps/GetAppList/v2/`, {
        params: { key: API_KEY },
      });
      res.status(200).json(response.data);
    } catch (error) {
      console.error("アプリ一覧取得中にエラー:", error.message);
      res.status(500).json({ error: error.message });
    }
  } else if (type === "appdetails" && appid) {
    // アプリ詳細取得
    try {
      const response = await axios.get(
        `https://store.steampowered.com/api/appdetails?appids=${appid}&cc=jp&l=japanese`
      );
      res.status(200).json(response.data);
    } catch (error) {
      console.error(`アプリ詳細(${appid})取得中にエラー:`, error.message);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({
      error: "不正なリクエストです。type（appsまたはappdetails）とappid（必要に応じて）が必要です。",
    });
  }
}
