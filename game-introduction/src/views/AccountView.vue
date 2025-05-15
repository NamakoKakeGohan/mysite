<template>
  <div class="account">
    <!-- ユーザー情報 -->
    <div class="user-info">
      <img :src="user.icon" alt="User Icon" class="user-icon" />
      <div>
        <h1 class="user-name">{{ user.name }}</h1>
        <p class="user-id">@{{ user.id }}</p>
      </div>
    </div>
    <!-- タブ切り替え -->
    <div class="tab-toggle">
      <button :class="{ active: activeTab === 'accountPosts' }" @click="activeTab = 'accountPosts'">
        投稿
      </button>
      <button :class="{ active: activeTab === 'likes' }" @click="activeTab = 'likes'">
        いいね
      </button>
    </div>
    <!-- 投稿表示 -->
    <div v-if="activeTab === 'accountPosts'" class="post-list">
      <PostItem :posts="userPosts" />
    </div>
    <div v-else class="post-list">
      <PostItem :posts="likedPosts" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PostItem          from "../components/PostItem.vue";
import postData          from "../postData";

// タブ切り替え状態
const activeTab = ref("accountPosts");

// ユーザー情報を指定
const user = ref({
  id: 123456,
  name: "じょん・すみす",
  icon: require("../assets/userAvatar.png"), // ユーザーアイコン
});

// ユーザーの投稿をフィルタリング
const userPosts = computed(() =>
  postData.filter((post) => post.user.id === user.value.id)
);

// ユーザーが「いいね」した投稿（仮のデータ）
const likedPosts = ref([
  {
    postId: 102,
    appId: 1234567,
    appName: "Liked Game",
    appImage: ["https://via.placeholder.com/150"],
    user: {
      id: 123456,
      name: "じょん・すみす",
      avatar: require("../assets/userAvatar.png"),
    },
    tags: ["タグ1", "タグ2"],
    oneWard: "お気に入りのゲーム",
    comment: "このゲームは本当に素晴らしいです！",
    steamAppURL: "https://store.steampowered.com/app/1234567/",
    favoriteCount: 100,
    formattedDate: "2025年5月15日",
  },
]);
</script>

<style scoped>

.account {
  display: flex;
  flex-direction: column;
  margin-right: 228px;
  padding: 20px;
}

.user-info {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.user-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}

.user-name {
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
}

.user-id {
  color: #657786;
  font-size: 0.9rem;
  margin: 2px 0 0;
}

.tab-toggle {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 15px;
  border-bottom: 1px solid #ccc;
}

.tab-toggle button {
  background: none;
  border: none;
  padding: 10px 20px;
  font-size: 1.5rem;
  cursor: pointer;
  color: #657786;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
}

.tab-toggle button.active {
  color: #1da1f2;
  border-color: #1da1f2;
  font-weight: bold;
}

.post-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  gap: 15px;
}
</style>
