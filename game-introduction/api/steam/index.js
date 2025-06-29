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
      const steamRes = await fetch("https://api.steampowered.com/ISteamApps/GetAppList/v2/");

      console.log("Steam API status:", steamRes.status);

      const text = await steamRes.text();
      console.log("Steam API raw response:", text.slice(0, 200)); // 一部だけログ

      if (!steamRes.ok) {
        throw new Error(`Steam API returned status ${steamRes.status}`);
      }

      const json = JSON.parse(text);
      res.status(200).json(json);
    } catch (error) {
      console.error("アプリ一覧取得中にエラー:", error);
      res.status(500).json({ error: error.message });
    }

  } else if (type === "appdetails" && appid) {
    // アプリ詳細取得
    try {
      const detailRes = await fetch(
        `https://store.steampowered.com/api/appdetails?appids=${appid}&cc=jp&l=japanese`
      );

      console.log("App details API status:", detailRes.status);

      const detailText = await detailRes.text();
      console.log("App details raw response:", detailText.slice(0, 200));

      if (!detailRes.ok) {
        throw new Error(`App details API returned status ${detailRes.status}`);
      }

      const detailJson = JSON.parse(detailText);
      res.status(200).json(detailJson);
    } catch (error) {
      console.error(`アプリ詳細(${appid})取得中にエラー:`, error);
      res.status(500).json({ error: error.message });
    }

  } else {
    res.status(400).json({
      error: "不正なリクエストです。type（appsまたはappdetails）とappid（必要に応じて）が必要です。",
    });
  }
}
