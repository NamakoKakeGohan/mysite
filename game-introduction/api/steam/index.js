const API_KEY  = process.env.API_KEY;
const BASE_URL = "https://api.steampowered.com";

export default async function handler(req, res) {
  console.log("Steam API handler (fetch) invoked");

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const { type, appid } = req.query;

  try {
    if (type === "apps") {
      // Steamアプリ一覧の取得
      const response = await fetch(`${BASE_URL}/ISteamApps/GetAppList/v2/`);
      if (!response.ok) throw new Error(`Fetch error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(data);
    }

    if (type === "appdetails" && appid) {
      // アプリ詳細の取得
      const response = await fetch(
        `https://store.steampowered.com/api/appdetails?appids=${appid}&cc=jp&l=japanese`
      );
      if (!response.ok) throw new Error(`Fetch error: ${response.status}`);
      const data = await response.json();
      return res.status(200).json(data);
    }

    // 不正なパラメータ
    return res.status(400).json({
      error: "不正なリクエストです。type（appsまたはappdetails）とappid（必要に応じて）が必要です。",
    });
  } catch (err) {
    console.error("Steam API fetch error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
