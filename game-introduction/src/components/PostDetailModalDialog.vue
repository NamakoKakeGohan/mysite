<template>
  <teleport to="body">
    <div v-if="openModal" class="modal-overlay">
      <div class="post-detail-modal">
        <!-- キャンセルボタン -->
        <button class="close-button" @click="$emit('close')">×</button>

        <div class="modal-body">
          <!-- メインビジュアル -->
          <img :src="post.appImage[1]" alt="App main-visual" class="app-thumbnail" />
          <!-- 投稿の内容 -->
          <div>
            <section class="post-header">
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
            </section>
            
            <section class="post-tags">
              <span class="tag" v-for="(tag, index) in post.tags" :key="index">
                {{ tag }}
              </span>
            </section>

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
                <button class="menu-button" v-on:click="toggleMenu(post)">
                  ⋮
                </button>
                <div class="menu-dropdown" v-if="post.menuVisible">
                  <a :href="post.steamAppURL" target="_blank">Steamで見る</a>
                  <a :href="post.user.id">アカウント</a>
                </div>
              </div>
            </section>

            <section class="post-review">
              <div class="post-comment">
                <p>{{ post.comment }}</p>
              </div>
            </section>

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
    </div>
  </teleport>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  post: {
    type: Object,
    required: true,
  },
  openModal: {
    type: Boolean,
    required: true,
  },
});

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
const toggleMenu = (post) => {
  post.menuVisible = !post.menuVisible;
};
</script>

<style scoped>
/* モーダルの背景オーバーレイ */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明の黒背景 */
  z-index: 999; /* モーダルよりも下に配置 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.post-detail-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 80%; /* モーダルの幅を調整 */
  max-width: 65%; /* 最大幅を設定 */
  height: auto;
}

/* 丸型のキャンセルボタンを右上に配置 */
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  background-color: #ff6b6b;
  color: white;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, background-color 0.2s ease;
}
.close-button:hover {
  transform: scale(1.4); /* ホバー時に少し拡大 */
  background-color: #ff4c4c; /* ホバー時に色を変更 */
}
.close-button:active {
  transform: scale(1); /* クリック時に元のサイズに戻る */
  background-color: #e63939; /* クリック時に色を変更 */
}

.modal-body {
  display: flex;
  justify-content: space-around;
  align-items: center; /* 子要素を中央揃え */
  justify-content: center; /* 縦方向の中央揃え */
  gap: 20px; /* 子要素間のスペースを均等に */
  padding: 20px; /* 内側の余白を追加 */
  max-width: 100%; /* 横幅を親要素に収める */
  box-sizing: border-box; /* パディングを含めたサイズ計算 */

}

.app-thumbnail {
  object-fit: cover;
  width: 500px;
  height: auto;
  border-radius: 10px;
  margin-right: 15px;
  flex-shrink: 0; /* imgのサイズを固定 */
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0px;
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
  font-size: 75px;
  font-weight: bold;
  color: #333;
  white-space: nowrap; /* テキストを1行に収める */
  overflow: hidden; /* はみ出した部分を隠す */
  text-overflow: ellipsis; /* はみ出した部分を省略記号にする */
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
  margin: 0 0 30px 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.tag {
  margin: 5px;
  font-size: 18px;
  padding: 5px 10px;
  background-color: #e1e8ed;
  border-radius: 5px;
}

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
.post-comment {
  margin: 30px 0;
  height: 300px;
  font-size: 24px;
  border: #265e9e 2px solid;
  background-color: #f5fbff;
  border-radius: 5px;
  padding: 20px; /* 内側の余白を追加 */  
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
  padding-left: 20px;
  font-size: 30px;
  cursor: pointer;
  color: #ffdd00;
  transition: transform 0.2s ease, color 0.2s ease; /* サイズと色の変化をスムーズに */
}
.favorite-button:hover {
  transform: scale(1.2); /* ホバー時に少し拡大 */
  color: #ffaf47; /* ホバー時に色を変更 */
}
.favorite-button:active {
  transform: scale(1); /* クリック時に元のサイズに戻る */
  color: rgb(232, 79, 24); /* クリック時に色を変更 */
}
.menu-button {
  background-color: transparent;
  border: none;
  width: 30px;
    padding-left: 20px;
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
  margin-top: 20px;
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
</style>
