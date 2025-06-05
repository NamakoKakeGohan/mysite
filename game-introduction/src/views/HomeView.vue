<template>
  <div class="home">
    <!-- 検索バーコンポーネント -->
    <PlojectSearchBar @searchResults="updateSearchResults" />
    <!-- フィルタリングされたリストを PostItem に渡す -->
    <div v-if="filteredPostList.length > 0">
      <PostItem :posts="filteredPostList" />
    </div>
    <p v-else>一致する投稿がありません。</p>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PlojectSearchBar  from "../components/PlojectSearchBar.vue";
import PostItem          from "../components/PostItem.vue";
import postData          from "../postData";

// 投稿データを格納する変数
const postList = ref(postData); // postData を直接代入

// 検索結果を格納する変数
const searchResults = ref([]);

// 検索結果を更新する関数
function updateSearchResults(results) {
  searchResults.value = results || []; // 検索結果を更新
}

// 検索クエリに基づいてフィルタリングされた投稿データを計算
const filteredPostList = computed(() => {
  if (searchResults.value && searchResults.value.length > 0) {
    return searchResults.value; // 検索結果がある場合は検索結果を表示
  }
  return postList.value; // 検索結果がない場合はpostDataを表示
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
</style>
