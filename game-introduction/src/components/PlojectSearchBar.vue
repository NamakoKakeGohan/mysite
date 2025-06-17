<template>
  <div class="search-bar-container">
    <div class="search-bar">
      <img :src="searchIcon" alt="サーチアイコン" class="search-icon" />
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search..."
        class="search-input"
        @input="handleSearch"
      />
    </div>

    <!-- 検索候補を表示 -->
    <ul v-if="searchResults.length > 0" class="search-results">
      <li
        v-for="(result, index) in searchResults"
        :key="index"
        class="search-result-item"
        @click="selectResult(result)"
      >
        {{ result.appName }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref }              from "vue";
import { searchAndLogApps } from "../SteamWebAPI/SearchApps";
import searchIcon           from "../assets/search.svg";

const searchQuery = ref(""); // 検索クエリを管理
const searchResults = ref([]); // 検索結果を管理
const emit = defineEmits(["searchResults", "selectResult"]); // 親コンポーネントに検索結果を送信

async function handleSearch() {
  if (!searchQuery.value) {
    searchResults.value = []; // 検索クエリが空の場合は空の結果を表示
    emit("searchResults", []);
    return;
  }

  try {
    const results = await searchAndLogApps(searchQuery.value); // 検索処理を実行
    searchResults.value = results || []; // 検索結果を更新
    emit("searchResults", searchResults.value); // 検索結果を親コンポーネントに送信
  } catch (error) {
    console.error("検索中にエラーが発生しました:", error);
    searchResults.value = []; // エラー時は空の結果を表示
    emit("searchResults", []);
  }
}

function selectResult(result) {
  console.log("選択されたアプリ:", result); //
  searchQuery.value = result.appName; // 検索クエリに選択されたアプリ名を代入
  searchResults.value = []; // 検索候補を閉じる（リストを空にする）
  emit("selectResult", result); // 選択された結果を親コンポーネントに送信}
}
</script>

<style scoped>
.search-bar-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  position: relative; /* 追加: .search-resultsの基準にする */
}
.search-bar {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 0 0;
}
.search-icon {
  width: 35px;
  height: 35px;
  margin-right: 10px;
}
.search-input {
  max-width: 100%;
  width: 600px;
  padding: 10px;
  font-size: 24px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.search-results {
  max-width: 100%;
  width: 450px;
  margin-top: 0px;
  margin-left: 45px;
  list-style: none;
  padding: 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1500;
  position: absolute; /* 追加: 絶対配置で重ならないように */
  top: 60px; /* 検索バーの下に表示（必要に応じて調整） */
  z-index: 2000; /* 他の要素より前面に表示 */
}

.search-result-item {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  position: static; /* 修正: 一覧表示のためstaticに */
  background: #fff;
}
.search-result-item:last-child {
  border-bottom: none;
}
.search-result-item:hover {
  background-color: #f0f0f0;
}
</style>
