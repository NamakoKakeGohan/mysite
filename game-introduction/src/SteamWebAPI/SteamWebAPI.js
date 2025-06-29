/**
 * アプリ一覧を取得し、逆順に並べ替えます。
 * @returns {Promise<Array>} アプリ一覧（IDと名前）
 */
export async function getAppListReversed() {
  const url = "https://api.steampowered.com/ISteamApps/GetAppList/v2/";

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
 * @param   {number} appid アプリID
 * @returns {Promise<Object>} アプリの詳細情報
 */
export async function getAppDetails(appid) {
  const url = `https://store.steampowered.com/api/appdetails?appids=${appid}`;

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

    return {
      appid            : game.steam_appid,
      name             : game.name,
      header_image     : game.header_image,
      library_image    : `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/library_600x900.jpg`,
      genres           : game.genres ? game.genres.map((g) => g.description) : [],
      steamAppURL      : `https://store.steampowered.com/app/${appid}/`,
      short_description: game.short_description || "説明がありません",
    };
  } catch (error) {
    console.error(`アプリID ${appid} の詳細情報取得中にエラーが発生しました:`, error);
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
    const appList = await getAppListReversed();

    const excludeWord = /\b(Demo|体験版|DLC|Add[- ]?on|Expansion|Soundtrack|OST|Original Soundtrack|Prologue|Tool|Editor|SDK|Server|Visual Novel|Video|Movie|Bundle|Test|Benchmark|Mod|Manual)\b/i;

    const filteredApps = appList.filter((app) =>
      !excludeWord.test(app.name) &&
      app.name.toLowerCase().includes(query.toLowerCase())
    );

    return filteredApps;
  } catch (error) {
    console.error("アプリ名検索中にエラーが発生しました:", error);
    throw error;
  }
}

/**
 * アプリIDの配列から詳細情報を取得し、表示用データに変換
 * @param {Array<number>} appIds アプリIDの配列
 * @returns {Promise<Array>} 表示用データ配列
 */
export async function fetchPostDataReversed(appIds) {
  try {
    const postData = await Promise.all(
      appIds.map(async (appid) => {
        try {
          const game = await getAppDetails(appid);

          return {
            appId      : game.appid,
            appName    : game.name,
            appImages  : [game.header_image, game.library_image],
            tags       : game.genres,
            oneWard    : game.short_description,
            steamAppURL: game.steamAppURL,
          };
        } catch (error) {
          console.error(`アプリID ${appid} のデータ取得中にエラーが発生しました:`, error);
          return null;
        }
      })
    );

    return postData.filter((item) => item !== null);
  } catch (error) {
    console.error("postData形式への変換中にエラーが発生しました:", error);
    throw error;
  }
}
