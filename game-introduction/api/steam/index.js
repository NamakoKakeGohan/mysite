export default async function handler(req, res) {
  console.log("Steam API handler invoked");

  const API_KEY  = process.env.API_KEY;
  const BASE_URL = "https://api.steampowered.com";

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const { appid, type } = req.query;

  try {
    if (type === "apps") {
      // API_KEY を使って Steam アプリ一覧取得
      const response = await fetch(`${BASE_URL}/ISteamApps/GetAppList/v2/?key=${API_KEY}`);
      const data = await response.json();
      res.status(200).json(data);
    } else if (type === "appdetails" && appid) {
      // アプリ詳細取得（こちらは key 不要）
      const response = await fetch(
        `https://store.steampowered.com/api/appdetails?appids=${appid}&cc=jp&l=japanese`
      );
      const data = await response.json();
      res.status(200).json(data);
    } else {
      res.status(400).json({
        error: "不正なリクエストです。type（appsまたはappdetails）とappid（必要に応じて）が必要です。",
      });
    }
  } catch (error) {
    console.error("API 呼び出し中にエラー:", error);
    res.status(500).json({ error: "サーバー内部でエラーが発生しました。" });
  }
}
