<!-- PostDetailModal.vue -->
<template>
  <teleport to="body">
    <div v-if="openModal" class="modal-overlay">
      <article class="modal">
        <button class="modal__close" @click="$emit('close')">×</button>

        <main class="modal__body">
          <!-- 検索バー -->
          <header class="modal__search">
            <PlojectSearchBar @searchResults="updateSearchResults" @selectResult="selectApp"/>
          </header>

          <section v-if="selectedApp" class="modal__content">
            <!-- 左側: サムネイル -->
            <aside class="modal__thumbnail">
              <img
                :src="selectedApp?.appImages?.[1] || Steam_top"
                alt="App thumbnail"
                class="thumbnail-image"
              />
            </aside>

            <!-- 右側: 詳細 -->
            <section class="modal__details">
              <header class="details__header">
                <h3 class="details__app-name">{{ selectedApp.appName }}</h3>
              </header>

              <section class="details__user">
                <img :src="userAvatar" alt="User Avatar" class="user-avatar" />
                <input
                  type="text"
                  v-model="userName"
                  placeholder="ユーザー名を入力 . . . "
                  class="user-name-input"
                />
              </section>

              <section class="details__tags">
                <span v-for="(tag, index) in selectedApp.tags" :key="index" class="tag">
                  {{ tag }}
                </span>
              </section>

              <section class="details__summary">
                <p class="summary-text">{{ selectedApp.oneWard }}</p>
              </section>

              <section class="details__comment">
                <textarea
                  v-model="comment"
                  placeholder="このゲームについて一言コメントを入力 . . . "
                  class="comment-input"
                ></textarea>
              </section>

              <footer class="details__actions">
                <button @click="submitPost" class="submit-post-btn">投稿する</button>
              </footer>
              
            </section>
          </section>
        </main>
      </article>
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
/* ===== 共通レイアウト ===== */
.modal-overlay {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(0 0 0 / 0.5);
  z-index: 999;
}

/* ===== モーダル本体 ===== */
.modal {
  position: relative;
  width: 90vw;
  max-width: 900px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0 0 0 / 0.18);
}

/* 閉じるボタン */
.modal__close {
  position: absolute;
  top: 18px;
  right: 18px;
  width: 36px;
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  border: none;
  border-radius: 50%;
  background: #ff6b6b;
  color: #fff;
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}
.modal__close:hover {
  background: #ff4c4c;
  transform: scale(1.1);
}

/* モーダル内部 */
.modal__body {
  display: flex;
  flex-direction: column;
  padding: 40px 32px 32px;
  gap: 24px;
}

/* ===== 検索バー ===== */
.modal__search {
  display: flex;
  justify-content: center;
}
.modal__search > * {
  width: 100%;
  max-width: 500px;
}

/* ===== コンテンツレイアウト ===== */
.modal__content {
  display: flex;
  gap: 32px;
}

.modal__thumbnail {
  flex: 1 1 40%;
  display: flex;
  justify-content: center;
}
.thumbnail-image {
  width: 100%;
  max-width: 320px;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0 0 0 / 0.08);
}

.modal__details {
  flex: 1 1 60%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* ===== 詳細セクション ===== */
.details__app-name {
  margin: 0;
  font-size: 2rem;
  font-weight: bold;
  color: #333;
}

/* ユーザー情報 */
.details__user {
  display: flex;
  align-items: center;
  gap: 10px;
}
.user-avatar {
  width: 32px;
  aspect-ratio: 1;
  border-radius: 50%;
}
.user-name-input {
  flex: 1;
  padding: 6px 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

/* タグ */
.details__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.tag {
  padding: 4px 10px;
  background: #e1e8ed;
  border-radius: 5px;
  font-size: 0.95rem;
}

/* サマリー */
.details__summary .summary-text {
  margin: 0;
  padding: 10px 16px;
  text-align: center;
  font-size: 1.1rem;
  border: 2px solid #265e9e;
  border-radius: 5px;
  background: #f5fbff;
}

/* コメント */
.details__comment .comment-input {
  width: 100%;
  min-height: 80px;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  resize: none;
}

/* アクション */
.details__actions {
  display: flex;
  justify-content: flex-end;
}
.submit-post-btn {
  margin-top: 12px;
  padding: 10px 24px;
  font-size: 1.1rem;
  border: none;
  border-radius: 6px;
  background: #265e9e;
  color: #fff;
  cursor: pointer;
  transition: background 0.2s;
}
.submit-post-btn:hover {
  background: #183e6e;
}

/* ===== レスポンシブ ===== */
@media (max-width: 800px) {
  .modal__body {
    padding: 24px 8px 16px;
    gap: 16px;
  }
  .modal__content {
    flex-direction: column;
    gap: 16px;
  }
  .thumbnail-image {
    max-width: 100%;
  }
}
</style>