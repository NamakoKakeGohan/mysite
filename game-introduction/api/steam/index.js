export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const { type, appid } = req.query;

  if (type === 'apps') {
    const apiUrl = "https://api.steampowered.com/ISteamApps/GetAppList/v2/";
    const response = await fetch(apiUrl);
    const data = await response.json();
    return res.status(200).json(data);
  }

  if (type === 'appdetails' && appid) {
    const apiUrl = `https://store.steampowered.com/api/appdetails?appids=${appid}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return res.status(200).json(data);
  }

  return res.status(400).json({ error: "Invalid query" });
}
