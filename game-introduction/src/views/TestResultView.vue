<template>
  <div class="result">
    <h1 class="title">{{ result.title }}</h1>
    <p class="description">{{ result.description }}</p>

    <div class="game-list">
      <div v-for="game in result.games" :key="game.name" class="game-card">
        <a :href="game.url" target="_blank" rel="noopener">
          <img :src="game.image" alt="ゲームイメージ" class="game-image" />
          <p class="game-name">{{ game.name }}</p>
        </a>
      </div>
    </div>

    <router-link to="/" class="back-link">トップに戻る</router-link>
  </div>
</template>

<script setup>
import { computed }   from "vue";
import { useRoute }   from "vue-router";
import testResultData from "../data/TestResultData.js";

// URLのジャンル取得
const route = useRoute();
const genreQuery = route.query.genre;

// 該当ジャンルの診断結果を探す
const result = computed(() =>
  testResultData.find((res) => res.genre === genreQuery)
);
</script>

<style scoped>
.result {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.title {
  font-size: 3rem;
  font-weight: bold;
  white-space: nowrap;
  margin-bottom: 10px;
}

.description {
  font-size: 1.3rem;
  margin-bottom: 30px;
}

.game-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.game-card {
  width: 600px;
  text-align: center;
}

.game-image {
  width: 100%;
  border-radius: 10px;
}

.game-name {
  margin-top: 10px;
  font-weight: bold;
  text-decoration: none;
  color: #333;
}

.back-link {
  display: inline-block;
  margin-top: 30px;
  color: #1da1f2;
  text-decoration: none;
}
</style>
