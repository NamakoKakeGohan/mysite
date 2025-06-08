const BASE_URL = "https://namakokakegohan.vercel.app/api"; // デプロイ済みAPI

/**
 * Steam Web APIからすべてのアプリ一覧を取得し、逆順に並べ替えます。
 * @returns {Promise<Array>} アプリ一覧（IDと名前）
 */
export async function getAppListReversed() {
  const url = `${BASE_URL}/steam?type=apps`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTPエラー: ${response.status}`);
    }
    const data = await response.json();

    // アプリ一覧を逆順に並べ替え
    return data.applist.apps.reverse();
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
  const url = `${BASE_URL}/steam?type=appdetails&appid=${appid}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTPエラー: ${response.status}`);
    }
    const data = await response.json();

    // レスポンスが空の場合の処理
    if (!data || !data[appid] || !data[appid].data) {
      throw new Error(`アプリID ${appid} のデータが存在しません`);
    }

    const game = data[appid].data;

    // 必要なデータを整形して返す
    return {
      appid: game.steam_appid,
      name: game.name,
      header_image: game.header_image,
      library_image: `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/library_600x900.jpg`,
      genres: game.genres ? game.genres.map((g) => g.description) : [], // genresがundefinedの場合は空配列を返す
      short_description: game.short_description || "説明がありません",
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
 * アプリ名で検索をかけ、候補を出力します。
 * @param {string} query 検索クエリ（アプリ名）
 * @returns {Promise<Array>} 検索結果（候補のアプリ一覧）
 */
export async function searchAppByName(query) {
  try {
    const appList = await getAppListReversed(); // 逆順のアプリ一覧を取得
    const filteredApps = appList.filter((app) =>
      app.name.toLowerCase().includes(query.toLowerCase())
    ); // 名前でフィルタリング
    return filteredApps; // 検索結果を返す
  } catch (error) {
    console.error("アプリ名検索中にエラーが発生しました:", error);
    throw error;
  }
}

/**
 * 逆順のアプリ一覧から情報を取得し、postData形式に変換します。
 * @param {Array<number>} appIds アプリIDの配列
 * @returns {Promise<Array>} postData形式のデータ
 */
export async function fetchPostDataReversed(appIds) {
  try {
    const postData = await Promise.all(
      appIds.map(async (appid) => {
        try {
          const game = await getAppDetails(appid);

          return {
            appId: game.appid,
            appName: game.name,
            appImages: [game.header_image, game.library_image, ],
            tags: game.genres, // ジャンルをタグとして使用
            oneWard: game.short_description, // 短い説明を使用
            steamAppURL: game.steamAppURL,
          };
        } catch (error) {
          console.error(
            `アプリID ${appid} のデータ取得中にエラーが発生しました:`,
            error
          );
          return null; // エラー時はnullを返す
        }
      })
    );

    return postData.filter((item) => item !== null); // nullを除外して返す
  } catch (error) {
    console.error("postData形式への変換中にエラーが発生しました:", error);
    throw error;
  }
}
