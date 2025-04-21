<template>
  <div class="post-item">
    <!-- steam APIから取得したAPPのサムネイル画像を表示 -->
    <div class="app-thumbnail">
      <img :src="post.appThumbnail" alt="#" />
    </div>

    <div class="post-header">
      <!-- SteamAPIから取得したAPPのタイトルを表示 -->
      <div class="app-title">
        <h3 class="app-name">{{ post.appName }}</h3>
      </div>
      <!-- 投稿者の名前を表示 -->
      <div class="post-user">
        <a class="user-name">{{ post.user.name }}</a>
      </div>
      <!-- 投稿のAPPタグを表示 -->
      <div class="post-tags">
        <span class="tag" v-for="(tag, index) in post.tags" :key="index">
          {{ tag }}
        </span>
      </div>
    </div>

    <!-- 投稿の内容を表示 -->
    <div class="post-content">
      <!-- 投稿のコメントを表示 -->
      <div class="post-comment">
        <p>{{ post.comment }}</p>
      </div>
      <!-- 投稿のお気に入りボタン -->
      <button class="favorite-button" @click="toggleFavorite">
        {{ favoriteButtonText }}
      </button>
      <!-- 3点リーダー -->
      <button class="menu-button" @click="toggleMenu">⋮</button>
      <div v-if="menuVisible" class="menu-dropdown">
        <a :href="post.steamAppURL" target="_blank">URL</a>
        <a :href="userAccountURL">アカウント</a>
      </div>
    </div>

    <div class="post-footer">
      <!-- 投稿の投稿日を表示 -->
      <div class="post-date">
        <p>{{ formattedDate }}</p>
      </div>
      <!-- 投稿のいいね数を表示 -->
      <div class="post-favorite-count">
        <span>{{ post.favoriteCount }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
 import { ref } from "vue";

// Props: 親コンポーネントから投稿データを受け取る

// メニューの表示状態を管理

// いいね状態とカウントを管理

//メニューの表示/非表示を切り替える関数

//いいねボタンの状態を切り替える関数

//投稿者のアカウントURLを生成する計算プロパティ

//タグをフォーマットする計算プロパティ

//タイムスタンプをフォーマットする計算プロパティ

//いいねボタンのテキストを生成する計算プロパティ
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
</style>
