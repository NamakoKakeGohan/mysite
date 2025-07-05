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
  post.isLiked   = !post.isLiked;
  if (post.isLiked) {
    post.likeCount++;
  } else if (post.likeCount > 0) {
    post.likeCount--;
  }
};

// 3点リーダーの表示状態を管理
const toggleMenu     = (post) => {
  post.menuVisible   = !post.menuVisible;
};

// 選択された投稿とモーダルの表示状態を管理
const selectedPost   = ref(null);
const isModalOpen    = ref(false);

// 投稿を選択してモーダルを開く関数
const openPostDetail = (post) => {
  selectedPost.value = post;
  isModalOpen.value  = true;
};

// モーダルを閉じる関数
const closeModal     = () => {
  isModalOpen.value  = false;
  selectedPost.value = null;
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
  background-color: rgba(120, 120, 120, 0.4);
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
  flex-shrink: 0;
}

.post-item > div {
  flex-grow: 1;
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
  font-size: 16px;
  padding: 5px 10px;
  background-color: #f5fbff35;
  border-radius: 5px;
}

/* -----post-content----- */
.post-content {
  display: flex;
  flex-grow: 1;
}
.post-one-ward {
  flex-grow: 1;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  border: black 2px solid;
  background-color: #f5fbff35;
  border-radius: 5px;
  text-align: center;
}
.post-buttons {
  position: relative;
  display: flex;
  align-items: center;
  margin-left: auto;
}
.like-button {
  background-color: transparent;
  border: none;
  font-size: 30px;
  cursor: pointer;
  color: #ffdd00;
  transition: transform 0.2s ease, color 0.2s ease;
}
.like-button:hover {
  transform: scale(1.2);
  color: #ffaf47;
}
.like-button:active {
  transform: scale(1);
  color: rgb(232, 79, 24);
}
.menu-button {
  background-color: transparent;
  border: none;
  width: 30px;
  font-size: 30px;
  cursor: pointer;
}
.menu-dropdown {
  position: absolute;
  top: 80%;
  left: 0;
  background-color: #f3f9ff;
  border: 1px solid #e1e8ed;
  border-radius: 5px;
  padding: 10px;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 150px;
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
}
.post-date {
  font-size: 20px;
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
  transform: scale(0.8);
  transform-origin: top;
}
</style>
