<template>
  <div class="ranking">
    <h1>RANKING</h1>
    <ul class="ranking-list">
      <li v-for="(post, index) in top10Posts" :key="post.postId" class="ranking-item">
        <div class="ranking-frame">
          <!-- 順位を表示 -->
          <div class="ranking-number">
            <p>{{ index + 1 }}</p>
            </div>
          <div class="post-item">
            <PostItem :posts="[post]"/>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";
import PostItem               from "../components/PostItem.vue";
import postData               from "../postData";

// 投稿データをリアクティブに管理
const posts = reactive(postData);

// ランキング上位10件を計算
const top10Posts = computed(() => {
  return posts
    .slice() // 配列をコピーしてソートを安全に実行
    .sort((a, b) => b.likeCount - a.likeCount) // likeCountで降順ソート
    .slice(0, 10); // 上位10件を取得
});
</script>

<style scoped>
.ranking {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 90px;
  padding: 20px;
}

h1 {
  font-size: 3rem;
  font-family: "Arial, sans-serif";
  margin-bottom: 20px;
  color: #333;
}

.ranking-list {
  font-size: 3rem;
  margin-bottom: 20px;
  list-style: none;
  padding: 0;
  color: #333;
}

.ranking-frame {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-inline: 10px;
  padding: 10px;
}

.ranking-number {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-right: 20px;
  width: 40px;
  text-align: center;
}

/* PostItemのスタイルを統一 */
.post-item {
  flex: 1;
  display: flex;
  align-items: center;
}
</style>