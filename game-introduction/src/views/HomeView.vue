<template>
  <div class="home">
    <!-- 検索バー -->
    <div class="search-bar">
      <img :src="searchIcon" alt="サーチアイコン" class="search-icon" />
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search..."
        class="search-input"
      />
    </div>
    <!-- フィルタリングされたリストを PostItem に渡す -->
    <PostItem v-if="filteredRecsList" :posts="filteredRecsList" />
    <p v-else>Recsを読み込み中...</p>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PostItem from "../components/PostItem.vue";
import postData from "../postData"; // 投稿データをインポート
import searchIcon from "../assets/search.svg";

// 検索クエリを管理
const searchQuery = ref("");

// 投稿データを格納する変数
const recsList = ref(postData); // postData を直接代入

// 検索クエリに基づいてフィルタリングされた投稿データを計算
const filteredRecsList = computed(() => {
  if (!searchQuery.value) {
    console.log("検索クエリが空です。すべての投稿を表示");
    return recsList.value;
  }
  console.log("検索クエリ:", searchQuery.value);

  // フィルタリング処理
  const filtered = recsList.value.filter((post) =>
    post.appName.toLowerCase().startsWith(searchQuery.value.toLowerCase())
  );
  console.log("フィルタリングした投稿:", filtered);
  return filtered;
});
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 90px;
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
