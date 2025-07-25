<template>
  <div class="home">
    <!-- 検索バーコンポーネント -->
    <PostSearchBar :searchQuery="searchQuery" :postList="postList" @update:searchQuery="(val) => (searchQuery = val)" @searchResults="updateSearchResults"/>
    <!-- 検索結果が1件以上ある場合のみPostItemを表示 -->
    <div v-if="filteredPostList.length > 0">
      <PostItem :posts="filteredPostList" />
    </div>
    <!-- 検索クエリがあり、かつfilteredPostListが0件のときだけ表示 -->
    <p v-else-if=" searchQuery && searchQuery.length > 0 && filteredPostList.length === 0">
      一致する投稿がありません。
    </p>
    <!-- 投稿機能 -->
    <img :src="plusIcon" alt="投稿ボタン" class="plus-icon" @click="toggleModal"/>
    <PostFunctionModalDialog v-if="showModal" :openModal="showModal" @close="toggleModal" @submitPost="addPost"/>
  </div>
</template>

<script setup>
import { ref, computed }       from "vue";
import PostSearchBar           from "../components/PostSearchBar.vue";
import PostItem                from "../components/PostItem.vue";
import PostFunctionModalDialog from "../components/PostFunctionModalDialog.vue";
import postData                from "../postData";
import plusIcon                from "../assets/plus.svg";

const postList      = ref(postData); // 初期投稿データを管理
const showModal     = ref(false); // モーダルの表示状態を管理
const searchQuery   = ref("");
const searchResults = ref([]); // 検索結果を管理

// 検索結果を更新する関数
function updateSearchResults(results) {
  searchResults.value = results || [];
}

// 検索クエリに基づいてフィルタリングされた投稿データを計算
const filteredPostList = computed(() => {
  // 検索クエリが空なら全件表示
  if (!searchQuery.value) return postList.value || [];
  // 検索クエリがあり、検索結果が0件なら空配列
  if (searchResults.value && searchResults.value.length === 0) return [];
  // 検索結果があればそれを表示
  return searchResults.value;
});

// モーダルの表示/非表示を切り替える関数
function toggleModal() {
  showModal.value = !showModal.value;
}

// 新しい投稿データを追加する関数
function addPost(newPost) {
  // 新しい投稿データにユニークなIDを付与
  const newPostId =
    postList.value.length > 0
      ? Math.max(...postList.value.map((post) => post.postId)) + 1
      : 1;

  const formattedPost = {
    ...newPost,
    postId: newPostId, // ユニークなIDを設定
    likeCount: 0, // 初期の「いいね」数
    isLiked: false, // 初期の「いいね」状態
    formattedDate: new Date().toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };

  // postListをリアクティブに更新
  postList.value.unshift(formattedPost);

  // 検索結果が表示されている場合も即時反映
  searchResults.value = [];
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  padding: 20px;
}

.plus-icon {
  width: 130px;
  height: 130px;
  cursor: pointer;
  position: fixed;
  bottom: 100px;
  right: 100px;
  border-radius: 50%;
  background-color: #3776a7;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 100;
  transition: transform 0.2s ease;
}

.plus-icon:hover {
  transform: scale(1.2);
}
</style>
