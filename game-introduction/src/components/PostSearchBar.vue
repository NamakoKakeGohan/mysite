<!-- filepath: /Users/namako-mac/mysite/game-introduction/src/components/PostSearchBar.vue -->
<template>
  <div class="search-bar-container">
    <div class="search-bar">
      <img :src="searchIcon" alt="サーチアイコン" class="search-icon" />
      <input type="text" :value="searchQuery" @input="onInput" placeholder="投稿を検索..." class="search-input"/>
    </div>
    <ul v-if="searchResults.length > 0" class="search-results">
      <li v-for="(result, index) in searchResults" :key="index" class="search-result-item" @click="selectResult(result)">
        {{ result.appName }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import searchIcon     from "../assets/search.svg";

const props = defineProps({
  searchQuery: String,
  postList: Array,
});
const emit = defineEmits(["update:searchQuery", "searchResults"]);

const searchResults = ref([]);

watch(
  () => props.searchQuery,
  (newQuery) => {
    handleSearch(newQuery);
  }
);

function handleSearch(query) {
  if (!query) {
    searchResults.value = [];
    emit("searchResults", []);
    return;
  }
  let results = props.postList.filter(
    (post) =>
      post.appName &&
      post.appName.toLowerCase().startsWith(query.toLowerCase())
  );
  // 重複除去
  const uniqueMap = new Map();
  results.forEach((post) => {
    if (!uniqueMap.has(post.appName)) {
      uniqueMap.set(post.appName, post);
    }
  });
  results = Array.from(uniqueMap.values()).slice(0, 10);

  searchResults.value = results;
  emit("searchResults", results);
}

function onInput(e) {
  emit("update:searchQuery", e.target.value);
}

function selectResult(result) {
  emit("update:searchQuery", result.appName);
  searchResults.value = [];
  emit("searchResults", [result]);
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