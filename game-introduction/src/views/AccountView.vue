<template>
  <div class="account">
    <!-- ユーザー名とアイコン -->
    <div>
      <img src="#" alt="user icon"/>
      <h1>{{ userName }}</h1>
    </div>

    <!-- 切り替えボタン -->
    <button v-on:click="postList">posts</button>
    <button v-on:click="recsList">Recs</button>


    <!-- 投稿表示 -->
    <div>
      <div class="post-list">
        <h2>投稿一覧</h2>
        <div v-for="post in posts" :key="post.id">
          <PostItem :post="post" />
        </div>
      </div>
      <div class="recs-list">
        <h2>Recs一覧</h2>
        <div v-for="post in RecsPosts" :key="post.id">
          <PostItem :post="post" />
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
// import { ref } from "vue";

// ユーザー情報
// const userName = "ユーザー名";


// ユーザーがイイねした投稿

// ユーザーの投稿


// 現在のタブ
</script>

<style scoped>
.account {
  padding: 20px;
}

.account h1 {
  font-size: 2em;
  margin-bottom: 20px;
}

</style>

<template>
  <!-- <div class="account"> -->
    <!-- ユーザー名とアイコン -->
    <!-- <div class="user-info">
      <img :src="user.icon" alt="User Icon" class="user-icon" />
      <div>
        <h1 class="user-name">{{ user.name }}</h1>
        <p class="user-handle">@{{ user.handle }}</p>
      </div>
    </div> -->

    <!-- 切り替えボタン -->
    <!-- <div class="post-toggle">
      <button
        :class="{ active: activeTab === 'userPosts' }"
        @click="activeTab = 'userPosts'"
      >
        あなたの投稿
      </button>
      <button
        :class="{ active: activeTab === 'likedPosts' }"
        @click="activeTab = 'likedPosts'"
      >
        イイねした投稿
      </button>
    </div> -->

    <!-- 投稿表示 -->
    <!-- <div v-if="activeTab === 'userPosts'" class="user-posts">
      <h2>Your Posts</h2>
      <div class="post-card" v-for="post in userPosts" :key="post.id">
        <h3>{{ post.title }}</h3>
        <p>{{ post.content }}</p>
      </div>
    </div>

    <div v-if="activeTab === 'likedPosts'" class="liked-posts">
      <h2>Liked Posts</h2>
      <div class="post-card" v-for="post in likedPosts" :key="post.id">
        <h3>{{ post.title }}</h3>
        <p>{{ post.content }}</p>
      </div>
    </div>
  </div> -->
</template>

<script setup>
// import { ref } from "vue";

// ユーザー情報
// const user = ref({
//   name: "John Doe",
//   handle: "johndoe", // ユーザーのハンドルネーム
//   icon: "https://via.placeholder.com/50", // 仮のアイコン画像
// });

// ユーザーがイイねした投稿
// const likedPosts = ref([
//   {
//     id: 1,
//     title: "Liked Post 1",
//     content: "This is the content of liked post 1.",
//   },
//   {
//     id: 2,
//     title: "Liked Post 2",
//     content: "This is the content of liked post 2.",
//   },
// ]);

// ユーザーの投稿
// const userPosts = ref([
//   { id: 1, title: "My Post 1", content: "This is the content of my post 1." },
//   { id: 2, title: "My Post 2", content: "This is the content of my post 2." },
// ]);

// 現在のタブ
// const activeTab = ref("userPosts");
</script>

<style scoped>
/* // .account {
//   padding: 20px;
//   max-width: 600px;
//   margin: 0 auto;
//   font-family: Arial, sans-serif;
// }

// .user-info {
//   display: flex;
//   align-items: center;
//   gap: 15px;
//   margin-bottom: 20px;
// }

// .user-icon {
//   width: 60px;
//   height: 60px;
//   border-radius: 50%;
// }

// .user-name {
//   font-size: 1.5rem;
//   margin: 0;
// }

// .user-handle {
//   color: gray;
//   font-size: 0.9rem;
// }

// .post-toggle {
//   display: flex;
//   gap: 10px;
//   margin-bottom: 20px;
// }

// .post-toggle button {
//   padding: 10px 20px;
//   border: 1px solid #ddd;
//   background-color: #f9f9f9;
//   cursor: pointer;
//   border-radius: 5px;
//   font-size: 1rem;
// }

// .post-toggle button.active {
//   background-color: #007bff;
//   color: white;
//   border-color: #007bff;
// }

// .liked-posts,
// .user-posts {
//   margin-top: 20px;
// }

// .post-card {
//   border: 1px solid #ddd;
//   border-radius: 8px;
//   padding: 15px;
//   margin-bottom: 15px;
//   background-color: #f9f9f9;
// }

// .post-card h3 {
//   margin: 0 0 10px;
//   font-size: 1rem;
// }

// .post-card p {
//   margin: 0;
//   color: #555;
// } */
</style>