<template>
  <div>
    <div class="post-item" v-for="(post, index) in posts" :key="index">
      <!-- サムネイル画像 -->
      <img :src="post.appImage[0]" alt="App Thumbnail" class="app-thumbnail" />

      <!-- 投稿ヘッダー -->
      <div class="post-header">
        <!-- アプリ名とユーザー名を表示 -->
        <div class="app-title">
          <h2 class="app-name">{{ post.appName }}</h2>
        </div>
        <div class="post-user">
          <img :src="post.user.avatar" alt="User Avatar" class="user-avatar" />
          <a class="user-name">{{ post.user.name }}</a>
        </div>
        <!-- タグを表示 -->
        <div class="post-tags">
          <span class="tag" v-for="(tag, index) in post.tags" :key="index">
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- 投稿内容 -->
      <div class="post-content">
        <!-- ひとことを表示 -->
        <div class="post-one-ward">
          <p>{{ post.oneWard }}</p>
        </div>
        <!-- お気に入りボタン -->
        <button class="favorite-button" v-on:click="toggleFavorite(post)">
          {{ favoriteButtonText }}
        </button>
        <!-- 3点リーダー -->
        <button class="menu-button" v-on:click="toggleMenu">⋮</button>
        <div class="menu-dropdown" v-if="menuVisible">
          <a :href="post.steamAppURL" target="_blank">Steamで見る</a>
          <a :href="userAccountURL">アカウント</a>
        </div>
      </div>

      <!-- 投稿フッター -->
      <div class="post-footer">
        <!-- お気に入り数を表示 -->
        <div class="post-favorite-count">
          <span>{{ post.favoriteCount }}★</span>
        </div>
        <!-- 投稿日を表示 -->
        <div class="post-date">
          <p>{{ post.formattedDate }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import postData from "../postData"; // 投稿データをインポート

// postDataをマップして、各投稿に isFavorited プロパティを追加
const posts = postData.map((post) => ({
  ...post, // postオブジェクトのすべてのプロパティを展開
  isFavorited: false, // 初期状態でお気に入りは解除
}));
// props を受け取る

// いいね状態を管理
const isFavorited = ref(false);
//いいねボタンのテキストを生成する計算プロパティ
const favoriteButtonText = computed(() => {
  return isFavorited.value ? "★" : "☆"; // お気に入り状態に応じてテキストを変更
});

// お気に入りボタンの状態を切り替える関数
function toggleFavorite(post) {
  if (post.isFavorited) {
    post.favoriteCount--; // お気に入り解除で減少
  } else {
    post.favoriteCount++; // お気に入り追加で増加
  }
  post.isFavorited = !post.isFavorited; // 状態を反転
}
// 3点リーダーの表示状態を管理
const menuVisible = ref(false);
// 3点リーダーの表示/非表示を切り替える関数
function toggleMenu() {
  menuVisible.value = !menuVisible.value;
}
</script>

<style scoped>
.post-item {
  padding: 15px;
  border: 1px solid #e1e8ed;
  border-radius: 10px;
  background-color: #fff;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}
.user-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
</style>
