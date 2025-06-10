<template>
  <teleport to="body">
    <div v-if="openModal" class="modal-overlay">
      <div class="post-detail-modal">
        <!-- キャンセルボタン -->
        <button class="close-button" @click="$emit('close')">×</button>

        <div class="modal-body">
          <!-- 検索バー -->
          <PlojectSearchBar
            @searchResults="updateSearchResults"
            @selectResult="selectApp"
          />

          <!-- 投稿データのプレビュー -->
          <div v-if="selectedApp" class="post-preview">
            <img
              :src="selectedApp.appImages[0]"
              alt="App thumbnail"
              class="app-thumbnail"
            />
          </div>

          <div v-if="selectedApp">
            <section class="post-header">
              <div class="title">
                <h2 class="app-name">{{ selectedApp.appName }}</h2>
                <span class="app-id">{{ selectedApp.appId }}</span>
              </div>
            </section>

            <!-- ユーザー名入力 -->
            <section class="post-user">
              <img :src="userAvatar" alt="User Avatar" class="user-avatar" />
              <input
                type="text"
                v-model="userName"
                placeholder="Enter your name"
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
                placeholder="Enter your comment"
                class="comment-input"
              ></textarea>
            </section>

            <button @click="submitPost">投稿する</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref } from "vue";
import { fetchPostDataReversed } from "../SteamWebAPI/SteamWebAPI";
import PlojectSearchBar from "./PlojectSearchBar.vue";
import userAvatar from "../assets/userAvatar.png";

const props = defineProps({
  openModal: Boolean,
});

const emit = defineEmits(["close", "submitPost"]);

const searchResults = ref([]); // 検索結果を管理
const selectedApp = ref(null); // 選択されたアプリ情報
const userName = ref(""); // ユーザー名を管理
const comment = ref(""); // コメントを管理

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
    comment: comment.value,
    postId: Math.floor(Math.random() * 1000000), // ランダムなpostIdを生成
    user: {
      id: Date.now(), // ユーザーIDを生成
      name: userName.value,
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
  max-width: 100%;
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

/* -----レスポンシブデザイン----- */
@media (max-width: 1800px) {
  .post-detail-modal {
    width: 90%; /* モーダルの幅を調整 */
    max-width: 100%; /* 最大幅を設定 */
  }
  .app-thumbnail {
    max-width: 50%;
    height: auto;
  }
  .app-name {
    font-size: 40px;
    white-space: normal; /* テキストを折り返す */
  }
  .post-one-ward {
    padding: 0 10px;
    font-size: 18px;
  }

  .post-review,
  .post-footer {
    position: static; /* 親の flex の影響を受けない */
    flex-grow: 0; /* flex アイテムとしての拡張を無効化 */
    width: 100%; /* 横幅を親要素に合わせる */
    margin-top: 20px; /* 上部に余白を追加 */
  }
}
@media (max-width: 800px) {
  .modal-body {
    flex-direction: column; /* 子要素を縦方向に並べる */
    align-items: center; /* 子要素を中央揃え */
  }

  .post-one-ward {
    padding: 0 10px;
    font-size: 16px;
    margin-bottom: 20px; /* 下に余白を追加 */
  }

  .post-review {
    width: 100%; /* 横幅を親要素に合わせる */
    margin-bottom: 20px; /* 下に余白を追加 */
    order: 1; /* 表示順を指定 */
  }

  .post-footer {
    width: 100%; /* 横幅を親要素に合わせる */
    margin-top: 20px; /* 上に余白を追加 */
    order: 2; /* 表示順を指定 */
    text-align: center; /* 中央揃え */
  }
}

.search-results {
  margin-top: 20px;
}

.search-result-item {
  cursor: pointer;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.search-result-item:hover {
  background-color: #e6e6e6;
}

.post-preview {
  margin-top: 20px;
  text-align: center;
}

.post-preview img {
  max-width: 100%;
  border-radius: 10px;
}

.user-name-input {
  margin-left: 10px;
  font-size: 16px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.comment-input {
  width: 100%;
  height: 100px;
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none; /* サイズ変更を無効化 */
}
</style>
