<template>
  <div class="scaled-container">
    <div class="post-item" v-for="(post, index) in posts" :key="index" @click="openPostDetail(post)" >
      <!-- サムネイル画像 -->
      <img :src="post.appImages[0]" alt="App Thumbnail" class="app-thumbnail" />

      <!-- 投稿の内容 -->
      <div>
        <section class="post-header">
          <!-- アプリ名とユーザー名を表示 -->
          <div class="title">
            <h2 class="app-name">{{ post.appName }}</h2>
            <div class="post-user">
              <img :src="post.user.avatar" alt="User Avatar" class="user-avatar"/>
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
          <!-- イイねと3点リーダーのボタン -->
          <div class="post-buttons">
            <button class="like-button" @click.stop="toggleLike(post)">
              {{ post.isLiked ? "★" : "☆" }}
            </button>
            <button class="menu-button" @click.stop="toggleMenu(post)">
              ⋮
            </button>
            <div class="menu-dropdown" v-if="post.menuVisible">
              <a :href="post.steamAppURL" target="_blank" @click.stop>Steamで見る</a>
              <router-link :to="{ name: 'Account', params: { id: post.user.id } }" class="account-link" @click.stop>
                アカウント
              </router-link>
            </div>
          </div>
        </section>

        <!-- 投稿フッター -->
        <section class="post-footer">
          <!-- お気に入り数を表示 -->
          <div class="post-like-count">
            <span>{{ post.likeCount }}★</span>
          </div>
          <!-- 投稿日を表示 -->
          <div class="post-date">
            <p>{{ post.formattedDate }}</p>
          </div>
        </section>
      </div>
    </div>

    <!-- モーダルダイアログ -->
    <PostDetailModalDialog v-if="isModalOpen" :post="selectedPost" :openModal="isModalOpen" @close="closeModal" />
  </div>
</template>

<script setup>
import { defineProps, ref }  from "vue";
import PostDetailModalDialog from "./PostDetailModalDialog.vue";

// 親コンポーネントから `posts` を受け取る
defineProps({
  posts: {
    type    : Array,
    required: true,
    default : () => [],
  },
});

// お気に入りボタンの状態を切り替える関数
const toggleLike = (post) => {
  post.isLiked = !post.isLiked; // isLikedの状態を反転
  if (post.isLiked) {
    post.likeCount++; // いいねされた場合、likeCountを増加
  } else {
    post.likeCount--; // いいねが解除された場合、likeCountを減少
  }
};

// 3点リーダーの表示状態を管理
const toggleMenu     = (post) => {
  post.menuVisible   = !post.menuVisible;
};

// 選択された投稿とモーダルの表示状態を管理
const selectedPost   = ref(null); // 選択された投稿
const isModalOpen    = ref(false); // モーダルの表示状態

// 投稿を選択してモーダルを開く関数
const openPostDetail = (post) => {
  selectedPost.value = post; // 選択された投稿を設定
  isModalOpen.value  = true; // モーダルを表示
};

// モーダルを閉じる関数
const closeModal     = () => {
  isModalOpen.value  = false; // モーダルを非表示
  selectedPost.value = null; // 選択された投稿をリセット
};
</script>

<style scoped>
.post-item {
  display: flex;
  padding: 15px;
  margin: 0;
  margin-top: 100px;
  border: 1px solid #e1e8ed;
  border-radius: 10px;
  background-color: #fff;
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
.like-button {
  background-color: transparent;
  border: none;
  font-size: 30px;
  cursor: pointer;
  color: #ffdd00;
  transition: transform 0.2s ease, color 0.2s ease; /* サイズと色の変化をスムーズに */
}
.like-button:hover {
  transform: scale(1.2); /* ホバー時に少し拡大 */
  color: #ffaf47; /* ホバー時に色を変更 */
}
.like-button:active {
  transform: scale(1); /* クリック時に元のサイズに戻る */
  color: rgb(232, 79, 24); /* クリック時に色を変更 */
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
.post-like-count {
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
@media (max-width: 1500px) {
  .post-item {
    flex-direction: column;
    padding: 0;
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
.scaled-container {
  transform: scale(0.8); /* 80%に縮小 */
  transform-origin: top; /* 左上を基準に縮小 */
}
</style>
