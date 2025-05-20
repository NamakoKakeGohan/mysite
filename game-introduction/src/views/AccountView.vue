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
import { ref, reactive, computed } from "vue";
import { useRoute }                from "vue-router";
import PostItem                    from "../components/PostItem.vue";
import postData                    from "../postData";
import defaultIcon                 from "../assets/userAvatar.png";

// タブ切り替え状態
const activeTab = ref("accountPosts");

// ルートパラメータから id を取得
const route = useRoute();
// ユーザーIDを取得（なければnull）
const userId = route.params.id ? Number(route.params.id) : null;
// 投稿データをリアクティブに管理
const posts = reactive(postData);

// 該当ユーザーの投稿をフィルタリング
const userPosts = computed(() =>
  posts.filter((post) => post.user.id === userId)
);
// 「いいね」した投稿をフィルタリング
const likedPosts = computed(() =>
  posts.filter((post) => post.isLiked)
);

// 最初の投稿からユーザー情報を取得（なければデフォルト）
const user = computed(() => {
  const firstPost = userPosts.value[0];
  if (firstPost) {
    return {
      id: firstPost.user.id,
      name: firstPost.user.name,
      icon: firstPost.user.avatar,
    };
  } else {
    return {
      id: userId,
      name: "不明なユーザー",
      icon: defaultIcon,
    };
  }
});
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
  gap: 15px;
}
</style>
