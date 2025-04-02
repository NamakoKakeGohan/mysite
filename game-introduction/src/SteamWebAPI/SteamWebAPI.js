const API_KEY = import.meta.env.VITE_STEAM_API_KEY; // 環境変数からAPIキーを取得
const BASE_URL = "https://api.steampowered.com";

/**
 * Steam Web APIからサポートされているAPIメソッドの一覧を取得します。
 * @returns {Promise<Object>} サポートされているAPIメソッドの一覧
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
 * @param {number} appId アプリID
 * @returns {Promise<Object>} アプリの詳細情報
 */
export async function getAppDetails(appId) {
  const url = `https://store.steampowered.com/api/appdetails?appids=${appId}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTPエラー: ${response.status}`);
    }
    const data = await response.json();
    return data[appId].data; // アプリの詳細情報を返す
  } catch (error) {
    console.error(
      `アプリID ${appId} の詳細情報取得中にエラーが発生しました:`,
      error
    );
    throw error;
  }
}
