<template>
  <teleport to="body">
    <div v-if="openModal" class="modal-overlay">
      <div class="post-detail-modal">
        <!-- キャンセルボタン -->
        <button class="close-button" @click="$emit('close')">×</button>

        <div class="modal-body">
          <!-- メインビジュアル -->
          <img :src="post.appImages[1]" alt="App main-visual" class="app-thumbnail" />
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
                <button class="like-button" @click="toggleLike(post)">
                  {{ post.isLiked ? "★" : "☆" }}
                </button>
                <button class="menu-button" v-on:click="toggleMenu(post)">
                  ⋮
                </button>
                <div class="menu-dropdown" v-if="post.menuVisible">
                  <a :href="post.steamAppURL" target="_blank">Steamで見る</a>
                  <router-link :to="{ name: 'Account', params: { id: post.user.id } }" class="account-link" @click.stop>
                    アカウント
                  </router-link>
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
const toggleLike = (post) => {
  post.isLiked   = !post.isLiked;
  if (post.isLiked) {
    post.likeCount++;
  } else if (post.likeCount > 0) {
    post.likeCount--;
  }
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
  background: var(--background-color);
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
  background-color: rgba(120, 120, 120, 0.4);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 80vw;
  max-width: 65vw;
  max-height: 90vh;
  overflow-y: auto;
  box-sizing: border-box;
}

/* 丸型のキャンセルボタンを右上に配置 */
.close-button {
  position: absolute;
  top: 35px;
  right: 35px;
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  background-color: #ff6b6b;
  color: white;
  font-size: 45px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, background-color 0.2s ease;
}
.close-button:hover {
  transform: scale(1.4);
  background-color: #ff4c4c;
}
.close-button:active {
  transform: scale(1);
  background-color: #e63939;
}

.modal-body {
  display: flex;
  justify-content: space-around;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  max-width: 100%;
  box-sizing: border-box;

}

.app-thumbnail {
  object-fit: cover;
  width: 420px;
  max-width: 100%;
  height: auto;
  margin: 0 auto 15px auto;
  display: block;
}

/* 画面幅が狭い場合の調整 */
@media (max-width: 800px) {
  .post-detail-modal {
    width: 98vw;
    max-width: 98vw;
    padding: 10px;
  }
  .app-name {
    font-size: 2em;
  }
  .app-thumbnail {
    max-width: 90vw;
  }
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
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
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
  margin: 0 0 30px 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.tag {
  margin: 5px;
  font-size: 18px;
  padding: 5px 10px;
  background-color: #f5fbff35;
  border-radius: 5px;
}

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
.post-comment {
  margin: 30px 0;
  height: 300px;
  font-size: 24px;
  border: black 2px solid;
  background-color: #f5fbff35;
  border-radius: 5px;
  padding: 20px; 
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
  padding-left: 20px;
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
    padding-left: 20px;
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
  margin-top: 20px;
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
@media (max-width: 1800px) {
  .post-detail-modal {
    width: 90%; 
    max-width: 100%;
  }
  .app-thumbnail {
    max-width: 50%;
    height: auto;
  }
  .app-name {
    font-size: 5em;
    white-space: normal;
  }
  .post-one-ward {
    padding: 0 10px;
    font-size: 18px;
  }

  .post-review, .post-footer {
    position: static;
    flex-grow: 0;
    width: 100%;
    margin-top: 20px;
  }

}
@media (max-width: 800px) {
  .modal-body {
    flex-direction: column;
    align-items: center;
  }

  .post-one-ward {
    padding: 0 10px;
    font-size: 16px;
    margin-bottom: 20px;
  }

  .post-review {
    width: 100%;
    margin-bottom: 20px;
    order: 1;
  }

  .post-footer {
    width: 100%;
    margin-top: 20px;
    order: 2;
    text-align: center;
  }
}
</style>