const API_KEY = "70EEBD1F7268C22952B9C6F9080E8B5D"; // Steam Web APIキー
const BASE_URL = "/api/steam"; // プロキシ経由のURL

/**
 * Steam Web APIからサポートされているAPIメソッドの一覧を取得します。
 * @returns {Promise<Array>} サポートされているAPIメソッドの一覧
 */
export async function getSupportedAPIMethods() {
  const url = `${BASE_URL}/ISteamWebAPIUtil/GetSupportedAPIList/v1?key=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTPエラー: ${response.status}`);
    }
    const data = await response.json();
    return data.apilist.interfaces; // APIメソッドの一覧を返す
  } catch (error) {
    console.error("Steam Web APIの取得中にエラーが発生しました:", error);
    throw error;
  }
}

/**
 * Steam Web APIからすべてのアプリ一覧を取得します。
 * @returns {Promise<Array>} アプリ一覧（IDと名前）
 */
export async function getAppList() {
  const url = `${BASE_URL}/ISteamApps/GetAppList/v2/`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTPエラー: ${response.status}`);
    }
    const data = await response.json();
    return data.applist.apps; // アプリ一覧を返す
  } catch (error) {
    console.error("アプリ一覧の取得中にエラーが発生しました:", error);
    throw error;
  }
}

/**
 * 特定のアプリの詳細情報を取得します。
 * @param {number} appid アプリID
 * @returns {Promise<Object>} アプリの詳細情報
 */
export async function getAppDetails(appid) {
  const url = `https://store.steampowered.com/api/appdetails?appids=${appid}&cc=jp&l=japanese`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTPエラー: ${response.status}`);
    }
    const data = await response.json();
    const game = data[appid].data;

    // 必要なデータを整形して返す
    return {
      appid: game.steam_appid,
      name: game.name,
      header_image: game.header_image,
      capsule_image: `https://cdn.akamai.steamstatic.com/steam/apps/${appid}/capsule_231x87.jpg`,
      genres: game.genres.map((g) => g.description),
      short_description: game.short_description,
      steamAppURL: `https://store.steampowered.com/app/${appid}/`,
    };
  } catch (error) {
    console.error(
      `アプリID ${appid} の詳細情報取得中にエラーが発生しました:`,
      error
    );
    throw error;
  }
}

/**
 * 複数のアプリの詳細情報を取得し、postData形式に変換します。
 * @param {Array<number>} appIds アプリIDの配列
 * @returns {Promise<Array>} postData形式のデータ
 */
export async function fetchPostData(appIds) {
  try {
    const postData = await Promise.all(
      appIds.map(async (appid) => {
        const game = await getAppDetails(appid);

        return {
          appId: game.appid,
          appName: game.name,
          appImages: [game.header_image, game.capsule_image],
          tags: game.genres, // ジャンルをタグとして使用
          oneWard: game.short_description, // 短い説明を使用
          steamAppURL: game.steamAppURL,
        };
      })
    );

    return postData;
  } catch (error) {
    console.error("postData形式への変換中にエラーが発生しました:", error);
    throw error;
  }
}

import { fetchPostData } from "./SteamWebAPI/SteamWebAPI";

async function fetchAndLogPostData() {
  const appIds = [10, 730, 570]; // 取得したいアプリIDの配列
  try {
    const postData = await fetchPostData(appIds);
    console.log("postData:", postData);
  } catch (error) {
    console.error("データ取得中にエラーが発生しました:", error);
  }
}

fetchAndLogPostData();
