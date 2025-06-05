const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// CORSを有効化
app.use(cors());

// Steam Web APIキー
const API_KEY = "93CD3A6B2A1D13A0E49D0008D0ADE0F0";

// Steam Web APIのベースURL
const BASE_URL = "https://api.steampowered.com";

// アプリ一覧を取得するエンドポイント
app.get("/api/steam/apps", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/ISteamApps/GetAppList/v2/`, {
      params: { key: API_KEY },
    });
    res.json(response.data);
  } catch (error) {
    console.error(
      "Steam Web APIへのリクエスト中にエラーが発生しました:",
      error.message
    );
    res.status(500).json({ error: error.message });
  }
});

// サーバーを起動
app.listen(PORT, () => {
  console.log(`サーバーがポート ${PORT} で起動しました`);
});
