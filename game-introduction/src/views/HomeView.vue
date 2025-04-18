<template>
  <div class="home">
    <PostItem
      v-if="post"
      :post="post"
    />
    <p v-else>
      投稿を読み込んでいます...
    </p>
  </div>
  
</template>

<script setup>
import { ref, onMounted } from "vue";
import { firebaseDb } from "../firebase/firebaseInit";
import { doc, getDoc } from "firebase/firestore";
import PostItem from "../components/PostItem.vue";

const post = ref(null);

// Firestore から特定の投稿を取得
async function fetchPost() {
  const docRef = doc(firebaseDb, "post", "7zSlaxhvcS3PmcTlScmd"); // ドキュメントIDを指定
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    post.value = { id: docSnap.id, ...docSnap.data() }; // データを取得して格納
  } else {
    console.error("指定された投稿が見つかりませんでした");
  }
}

onMounted(fetchPost);
</script>

<style scoped>
.home {
  padding: 20px;
  background-color: #f5f8fa;
}
</style>
