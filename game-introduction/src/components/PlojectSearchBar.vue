<template>
  <div class="search-bar">
    <img :src="searchIcon" alt="サーチアイコン" class="search-icon" />
    <input type="text"
      v-model="searchQuery"
      placeholder="Search..."
      class="search-input"
      @input="handleSearch"
    />
  </div>
</template>

<script setup>
import { ref }              from "vue";
import { searchAndLogApps } from "../SteamWebAPI/SearchApps";
import searchIcon           from "../assets/search.svg";

const searchQuery = ref(""); // 検索クエリを管理
const emit = defineEmits(["searchResults"]); // 親コンポーネントに検索結果を送信

async function handleSearch() {
  if (!searchQuery.value) {
    emit("searchResults", []); // 検索クエリが空の場合は空の結果を送信
    return;
  }

  try {
    const results = await searchAndLogApps(searchQuery.value); // 検索処理を実行
    emit("searchResults", results || []); // 検索結果を親コンポーネントに送信
  } catch (error) {
    console.error("検索中にエラーが発生しました:", error);
    emit("searchResults", []); // エラー時は空の結果を送信
  }
}
</script>

<style scoped>
.search-bar {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
}
.search-icon {
  width: 35px;
  height: 35px;
  margin-right: 10px;
}
.search-input {
  width: 50%;
  padding: 10px;
  font-size: 24px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
