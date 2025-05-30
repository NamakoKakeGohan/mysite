import { searchAppByName, fetchPostData } from "./SteamWebAPI";

/**
 * 検索機能を呼び出して結果を出力します。
 * @param {string} query 検索クエリ（アプリ名）
 */
export async function searchAndLogApps(query) {
  try {
    // アプリ名で検索
    const results = await searchAppByName(query);
    console.log("検索結果:", results);

    // 検索結果からアプリIDを抽出
    const appIds = results.map((app) => app.appid);

    // アプリIDを基にpostData形式に変換
    const postData = await fetchPostData(appIds);
    console.log("postData形式のデータ:", postData);
  } catch (error) {
    console.error("検索中にエラーが発生しました:", error);
  }
}