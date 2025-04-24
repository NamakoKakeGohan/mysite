<template>
  <div class="home">
    <!-- recsList を PostItem に渡す -->
    <PostItem v-if="recsList" />
    <p v-else>Recsを読み込み中...</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import PostItem from "../components/PostItem.vue";
import postData from "../postData"; // 投稿データをインポート

// 投稿データを格納する変数
const recsList = ref(null);

// 投稿を取得
recsList.value = postData; // postData を直接代入
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 90px;
  padding: 20px;
}

</style>
