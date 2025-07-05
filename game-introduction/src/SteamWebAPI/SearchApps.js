import { searchAppByName, fetchPostDataReversed } from "./SteamWebAPI";

/**
 * 検索機能を呼び出して結果を出力します。
 * @param {string} query 検索クエリ（アプリ名）
 */
export async function searchAndLogApps(query) {
  try {
    const results         = await searchAppByName(query);
    const filteredResults = results.filter((app) =>
      app.name.toLowerCase().startsWith(query.toLowerCase())
    );
    const topResults      = filteredResults.slice(0, 10);
    const appIds          = topResults.map((app) => app.appid);
    const postData        = await fetchPostDataReversed(appIds);

    return postData;
  } catch (error) {
    console.error("アプリ検索中にエラーが発生しました:", error);
    return [];
  }
}
