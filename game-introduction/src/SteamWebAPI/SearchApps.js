import { searchAppByName, fetchPostDataReversed } from "./SteamWebAPI";

/**
 * 検索機能を呼び出して結果を出力します。
 * @param {string} query 検索クエリ（アプリ名）
 */
export async function searchAndLogApps(query) {
  try {
    // アプリ名で検索
    const results = await searchAppByName(query);

    // 検索結果を頭文字で絞り込み
    const filteredResults = results.filter((app) =>
      app.name.toLowerCase().startsWith(query.toLowerCase())
    );

    // 検索結果を上位10件に制限
    const topResults = filteredResults.slice(0, 10);
    console.log("検索結果（上位10件）:", topResults);

    // アプリIDを基にpostData形式に変換
    const appIds = topResults.map((app) => app.appid);
    const postData = await fetchPostDataReversed(appIds);
    console.log("postData形式のデータ（上位10件）:", postData);
    return postData; // postData形式のデータを返す
  } catch (error) {
    console.error("postData形式への変換中にエラーが発生しました:", error);
    return [];
  }
}
