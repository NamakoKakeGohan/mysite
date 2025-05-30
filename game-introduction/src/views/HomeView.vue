<template>
  <div class="home">
    <!-- 検索バー -->
    <div class="search-bar">
      <img :src="searchIcon" alt="サーチアイコン" class="search-icon" />
      <input type="text" v-model="searchQuery" placeholder="Search..." class="search-input"/>
    </div>
    <!-- フィルタリングされたリストを PostItem に渡す -->
    <div v-if="filteredPostList.length > 0">
      <PostItem :posts="filteredPostList" />
    </div>
    <p v-else>一致する投稿がありません。</p>
  </div>
</template>

<script setup>
import { ref, computed }     from "vue";
import PostItem              from "../components/PostItem.vue";
import postData              from "../postData";
import searchIcon            from "../assets/search.svg";

// 検索クエリを管理
const searchQuery = ref("");

// 投稿データを格納する変数
const postList = ref(postData); // postData を直接代入

// 検索クエリに基づいてフィルタリングされた投稿データを計算
const filteredPostList = computed(() => {
  if (!searchQuery.value) {
    return postList.value;
  }
  return postList.value.filter((post) =>
    post.appName.toLowerCase().startsWith(searchQuery.value.toLowerCase())
  );
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
