<template>
  <div class="search-bar-container">
    <div class="search-bar">
      <img :src="searchIcon" alt="サーチアイコン" class="search-icon" />
      <input type="text" v-model="searchQuery" placeholder="アプリを検索..." class="search-input" @input="handleSearch"/>
    </div>
    <ul v-if="searchResults.length > 0" class="search-results">
      <li v-for="(result, index) in searchResults" :key="index" class="search-result-item" @click="selectResult(result)">
        {{ result.appName }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref }              from "vue";
import { searchAndLogApps } from "../SteamWebAPI/SearchApps";
import searchIcon           from "../assets/search.svg";

const emit = defineEmits(["searchResults", "selectResult"]);

const searchQuery   = ref("");
const searchResults = ref([]);

async function handleSearch() {
  if (!searchQuery.value) {
    searchResults.value = [];
    emit("searchResults", []);
    return;
  }
  const results = await searchAndLogApps(searchQuery.value);
  searchResults.value = results || [];
  emit("searchResults", searchResults.value);
}

function selectResult(result) {
  searchQuery.value   = result.appName;
  searchResults.value = [];
  emit("selectResult", result);
}
</script>

<style scoped>
.search-bar-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  position: relative;
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
  position: absolute;
  top: 60px;
  z-index: 2000;
}

.search-result-item {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  position: static;
  background: #fff;
}
.search-result-item:last-child {
  border-bottom: none;
}
.search-result-item:hover {
  background-color: #f0f0f0;
}
</style>