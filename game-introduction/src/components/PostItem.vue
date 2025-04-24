<template>
  <div>
    <div class="post-item" v-for="(post, index) in posts" :key="index">
      <!-- サムネイル画像 -->
      <img :src="post.appImage[0]" alt="App Thumbnail" class="app-thumbnail" />

      <div>
        <!-- 投稿ヘッダー -->
        <section class="post-header">
          <!-- アプリ名とユーザー名を表示 -->
          <div class="title">
            <h2 class="app-name">{{ post.appName }}</h2>
            <div class="post-user">
              <img
                :src="post.user.avatar"
                alt="User Avatar"
                class="user-avatar"
              />
              <a class="user-name">{{ post.user.name }}</a>
            </div>
          </div>

          <!-- タグを表示 -->
          <div class="post-tags">
            <span class="tag" v-for="(tag, index) in post.tags" :key="index">
              {{ tag }}
            </span>
          </div>
        </section>

        <!-- 投稿内容 -->
        <section class="post-content">
          <!-- ひとことを表示 -->
          <div class="post-one-ward">
            <p>{{ post.oneWard }}</p>
          </div>
          <!-- お気に入りと3点リーダーのボタン -->
          <div class="post-buttons">
            <button class="favorite-button" @click="toggleFavorite(post)">
              {{ post.isFavorited ? "★" : "☆" }}
            </button>
            <button class="menu-button" v-on:click="toggleMenu">⋮</button>
            <div class="menu-dropdown" v-if="menuVisible">
              <a :href="post.steamAppURL" target="_blank">Steamで見る</a>
              <a :href="userAccountURL">アカウント</a>
            </div>
          </div>
        </section>

        <!-- 投稿フッター -->
        <section class="post-footer">
          <!-- お気に入り数を表示 -->
          <div class="post-favorite-count">
            <span>{{ post.favoriteCount }}★</span>
          </div>
          <!-- 投稿日を表示 -->
          <div class="post-date">
            <p>{{ post.formattedDate }}</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import postData from "../postData"; // 投稿データをインポート

// postDataをマップして、各投稿に isFavorited プロパティを追加
const posts = postData.map((post) => ({
  ...post, // postオブジェクトのすべてのプロパティを展開
  isFavorited: false, // 初期状態でお気に入りは解除
  menuVisible: false, // 初期状態でメニューは非表示
}));

// お気に入りボタンの状態を切り替える関数
const toggleFavorite = (post) => {
  if (post.isFavorited) {
    post.favoriteCount--; // お気に入り解除で減少
  } else {
    post.favoriteCount++; // お気に入り追加で増加
  }
  post.isFavorited = !post.isFavorited; // 状態を反転
};

// 3点リーダーの表示状態を管理
const menuVisible = ref(false);
// 3点リーダーの表示/非表示を切り替える関数
const toggleMenu = () => {
  menuVisible.value = !menuVisible.value;
};
</script>

<style scoped>
.post-item {
  display: flex;
  padding: 15px;
  margin: 0 100px;
  border: 1px solid #e1e8ed;
  border-radius: 10px;
  background-color: #fff;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  font-family: Arial, sans-serif;
}
.post-item:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
}
.app-thumbnail {
  object-fit: cover;
  width: 600px;
  height: auto;
  border-radius: 10px;
  margin-right: 15px;
  flex-shrink: 0; /* imgのサイズを固定 */
}

.post-item > div {
  flex-grow: 1; /* img横のdivタグが残りのスペースを埋める */
  display: flex;
  flex-direction: column;
}
/* -----post-header----- */
.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 10px;
}
.title {
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-grow: 1;
}
.app-name {
  margin: 0;
  font-size: 45px;
  font-weight: bold;
  color: #333;
}
.post-user {
  display: flex;
  align-items: center;
}
.user-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.user-name {
  margin-left: 10px;
  font-size: 16px;
  color: #555;
}
.post-tags {
  margin: 0 0 30px 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}
.tag {
  margin: 5px;
  font-size: 12px;
  padding: 5px 10px;
  background-color: #e1e8ed;
  border-radius: 5px;
}

/* -----post-content----- */
.post-content {
  display: flex;
  flex-grow: 1; /* 子要素が親要素内でスペースを埋める */
}
.post-one-ward {
  flex-grow: 1; /* 余ったスペースを埋める */
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  border: #265e9e 2px solid;
  background-color: #f5fbff;
  border-radius: 5px;
  text-align: center;
}
.post-buttons {
  position: relative; /* 子要素の絶対位置を基準にする */
  display: flex;
  align-items: center;
  margin-left: auto; /* 右寄せ */
}
.favorite-button {
  background-color: transparent;
  border: none;
  font-size: 30px;
  cursor: pointer;
}
.menu-button {
  background-color: transparent;
  border: none;
  width: 30px;
  font-size: 30px;
  cursor: pointer;
}
.menu-dropdown {
  position: absolute; /* 親要素から独立して配置 */
  top: 80%; /* ボタンの下に表示 */
  left: 0; /* ボタンの左端に揃える */
  background-color: #f3f9ff;
  border: 1px solid #e1e8ed;
  border-radius: 5px;
  padding: 10px;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 150px; /* メニューの幅を固定 */
}
.menu-dropdown a {
  display: block;
  padding: 5px 10px;
  text-decoration: none;
  color: #333;
}
.menu-dropdown a:hover {
  background-color: #d6d6d6;
}
.menu-dropdown a:active {
  background-color: #e1e8ed;
}
.menu-dropdown a:focus {
  outline: none;
  box-shadow: 0 0 0 2px #265e9e;
}
/* -----post-footer----- */
.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.post-favorite-count {
  font-size: 20px;
  color: #555;
}
.post-date {
  font-size: 20px;
  color: #999;
}
.post-date p {
  margin: 0;
}
/* -----レスポンシブデザイン----- */
@media (max-width: 768px) {
  .post-item {
    flex-direction: column;
  }
  .app-thumbnail {
    width: 100%;
    height: auto;
  }
  .app-name {
    font-size: 30px;
  }
  .post-one-ward {
    padding: 0 20px;
    font-size: 18px;
  }
  .post-tags {
    justify-content: center;
  }
}
</style>
