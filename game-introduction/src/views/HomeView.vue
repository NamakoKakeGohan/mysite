<template>
  <div class="home">
    <PostItem v-if="posts" />
    <p v-else>Recsを読み込み中...</p>
  </div>
  
</template>

<script setup>
import { ref } from "vue";
import PostItem from "../components/PostItem.vue";

const posts = ref(null);

// 投稿を取得

</script>

<style scoped>
.home {
  padding: 20px;
  background-color: #f5f8fa;
}
</style>
