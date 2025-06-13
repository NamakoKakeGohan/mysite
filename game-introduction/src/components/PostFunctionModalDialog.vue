<template>
  <teleport to="body">
    <div v-if="openModal" class="modal-overlay">
      <div class="post-detail-modal">
        <button class="close-button" @click="$emit('close')">×</button>

        <div class="modal-body">
          <!-- 検索バーを常に上部に配置 -->
          <div class="search-bar-wrapper">
            <PlojectSearchBar
              @searchResults="updateSearchResults"
              @selectResult="selectApp"
            />
          </div>

          <div v-if="selectedApp" class="modal-content-split">
            <!-- 左側: サムネイル -->
            <div class="modal-left">
              <img
                :src="
                  selectedApp && selectedApp.appId && selectedApp.appImages && selectedApp.appImages[1]
                  ? selectedApp.appImages[1] : Steam_top"
                alt="App thumbnail"
                class="app-thumbnail"
              />
            </div>

            <!-- 右側: 詳細 -->
            <div class="modal-right">
              <section class="post-header">
                <div class="title">
                  <h3 class="app-name">{{ selectedApp.appName }}</h3>
                </div>
              </section>
              <section class="post-user">
                <img :src="userAvatar" alt="User Avatar" class="user-avatar" />
                <input
                  type="text"
                  v-model="userName"
                  placeholder="ユーザー名を入力 . . . "
                  class="user-name-input"
                />
              </section>
              <section class="post-tags">
                <span
                  class="tag"
                  v-for="(tag, index) in selectedApp.tags"
                  :key="index"
                >
                  {{ tag }}
                </span>
              </section>
              <section class="post-content">
                <div class="post-one-ward">
                  <p>{{ selectedApp.oneWard }}</p>
                </div>
              </section>
              <section class="post-comment">
                <textarea
                  v-model="comment"
                  placeholder="このゲームについて一言コメントを入力 . . . "
                  class="comment-input"
                ></textarea>
              </section>
              <button @click="submitPost" class="submit-btn">投稿する</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref }                   from "vue";
import { fetchPostDataReversed } from "../SteamWebAPI/SteamWebAPI";
import PlojectSearchBar          from "./PlojectSearchBar.vue";
import userAvatar                from "../assets/userAvatar.png";
import Steam_top                 from "../assets/thumbnail/Steam_top.png"; // デフォルトのサムネイル画像

const props = defineProps({
  openModal: Boolean,
});

const emit = defineEmits(["close", "submitPost"]);

const searchResults = ref([]); // 検索結果を管理
const selectedApp   = ref(null); // 選択されたアプリ情報
const userName      = ref(""); // ユーザー名を管理
const comment       = ref(""); // コメントを管理

// 検索結果を更新する関数
function updateSearchResults(results) {
  searchResults.value = results || [];
}

// アプリを選択する関数
async function selectApp(app) {
  try {
    const appData = await fetchPostDataReversed([app.appId]);
    selectedApp.value = appData[0];
  } catch (error) {
    console.error("投稿データの取得中にエラーが発生しました:", error);
  }
}

// 投稿する関数
function submitPost() {
  if (!selectedApp.value || !userName.value || !comment.value) {
    alert("すべてのフィールドを入力してください！");
    return;
  }

  // 新しい投稿データを親コンポーネントに送信
  emit("submitPost", {
    ...selectedApp.value,
    comment : comment.value,
    postId  : Math.floor(Math.random() * 1000000), // ランダムなpostIdを生成
    user: {
      id    : Date.now(), // ユーザーIDを生成
      name  : userName.value,
      avatar: userAvatar,
    },
  });

  // モーダルを閉じる
  emit("close");
}
</script>

<style scoped>
/* モーダルの背景オーバーレイ */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* モーダル本体 */
.post-detail-modal {
  position: relative;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.18);
  width: 90vw;
  max-width: 900px;
  padding: 0;
  z-index: 1000;
}

/* 右上のキャンセルボタン */
.close-button {
  position: absolute;
  top: 18px;
  right: 18px;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: #ff6b6b;
  color: #fff;
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
  z-index: 10;
  transition: background 0.2s, transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.close-button:hover {
  background: #ff4c4c;
  transform: scale(1.1);
}

/* モーダル内レイアウト */
.modal-body {
  display: flex;
  flex-direction: column;
  padding: 40px 32px 32px 32px;
  gap: 24px;
  max-width: 100%;
  max-height: 100%;
}

/* 検索バーを上部に */
.search-bar-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
}
.search-bar-wrapper > * {
  width: 100%;
  max-width: 500px;
}

/* 二分割レイアウト */
.modal-content-split {
  display: flex;
  flex-direction: row;
  gap: 32px;
  width: 100%;
}

.modal-left {
  flex: 1 1 40%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
.modal-right {
  flex: 1 1 60%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* サムネイル画像 */
.app-thumbnail {
  width: 100%;
  max-width: 320px;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* タイトル・ID */
.post-header .title {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.app-name {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin: 0;
}
.app-id {
  font-size: 0.9rem;
  color: #888;
}

/* ユーザー名入力 */
.post-user {
  display: flex;
  align-items: center;
  gap: 10px;
}
.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
.user-name-input {
  font-size: 1rem;
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

/* タグ */
.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.tag {
  background: #e1e8ed;
  border-radius: 5px;
  padding: 4px 10px;
  font-size: 0.95rem;
}

/* 一言説明 */
.post-content {
  margin: 0;
}
.post-one-ward {
  background: #f5fbff;
  border: #265e9e 2px solid;
  border-radius: 5px;
  padding: 10px 16px;
  font-size: 1.1rem;
  text-align: center;
}

/* コメント欄 */
.post-comment {
  margin: 0;
}
.comment-input {
  width: 96.5%;
  min-height: 80px;
  font-size: 1rem;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  resize: none;
}

/* 投稿ボタン */
.submit-btn {
  margin-top: 12px;
  padding: 10px 24px;
  background: #265e9e;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.submit-btn:hover {
  background: #183e6e;
}

/* レスポンシブ対応 */
@media (max-width: 800px) {
  .post-detail-modal {
    padding: 0;
    width: 98vw;
    max-width: 100vw;
  }
  .modal-body {
    padding: 24px 8px 16px 8px;
    gap: 16px;
  }
  .modal-content-split {
    flex-direction: column;
    gap: 16px;
  }
  .modal-left,
  .modal-right {
    width: 100%;
    max-width: 100%;
  }
  .app-thumbnail {
    max-width: 100%;
  }
}
</style>
