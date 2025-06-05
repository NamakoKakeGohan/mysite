<template>
  <div class="home">
    <!-- 検索バー -->
    <div class="search-bar">
      <img :src="searchIcon" alt="サーチアイコン" class="search-icon" />
      <input type="text" v-model="searchQuery" placeholder="Search..." class="search-input" @input="handleSearch"/>
    </div>
    <!-- フィルタリングされたリストを PostItem に渡す -->
    <div v-if="filteredPostList.length > 0">
      <PostItem :posts="filteredPostList" />
    </div>
    <p v-else>一致する投稿がありません。</p>
  </div>
</template>

<script setup>
import { ref, computed }    from "vue";
import { searchAndLogApps } from "../SteamWebAPI/SearchApps";
import PostItem             from "../components/PostItem.vue";
import postData             from "../postData";
import searchIcon           from "../assets/search.svg";

// 検索クエリを管理
const searchQuery = ref("");

// 投稿データを格納する変数
const postList = ref(postData); // postData を直接代入

// 検索結果を格納する変数
const searchResults = ref([]);

// 検索処理
async function handleSearch() {
  if (!searchQuery.value) {
    searchResults.value = []; // 検索クエリが空の場合は検索結果をクリア
    return;
  }

  try {
    const results = await searchAndLogApps(searchQuery.value);
    searchResults.value = results || []; // 検索結果が空の場合は空配列を設定
  } catch (error) {
    console.error("検索中にエラーが発生しました:", error);
    searchResults.value = []; // エラー時も空配列を設定
  }
}

// 検索クエリに基づいてフィルタリングされた投稿データを計算
const filteredPostList = computed(() => {
  if (!searchQuery.value) {
    return postList.value; // 検索クエリが空の場合はpostDataを表示
  }
  if (searchResults.value && searchResults.value.length > 0) {
    return searchResults.value; // 検索結果がある場合は検索結果を表示
  }
  return postList.value.filter((post) =>
    post.appName.toLowerCase().startsWith(searchQuery.value.toLowerCase())
  ); // 検索クエリに基づいてpostDataをフィルタリング
});
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  padding: 20px;
}
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
