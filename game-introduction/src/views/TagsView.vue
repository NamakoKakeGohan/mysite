<template>
  <div class="tags">
    <div class="tags-header">
      <h1>ゲームタグで検索</h1>
      <p class="tags-desc">
        このページでは、ゲームに関連する投稿をタグで絞り込むことができます<br />
        タグを選択することで特定のジャンルや興味に関連する投稿を閲覧できます
      </p>
    </div>

    <form class="tag-form">
      <h2 class="selected-tag" v-if="selectedTag">選択中: {{ selectedTag }}</h2>
      <div class="tag-radio-list">
        <label v-for="tag in uniqueTags" :key="tag" class="tag-radio">
          <input type="radio" name="tag" :value="tag" v-model="selectedTag" :aria-label="`タグ: ${tag}`"/>
          <span>{{ tag }}</span>
        </label>
      </div>
    </form>

    <div class="tag-results">
      <div v-if="filteredPosts.length === 0" class="no-posts">
        該当する投稿がありません。
      </div>
      <PostItem v-if="filteredPosts.length" :posts="filteredPosts" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import postData          from "../postData";
import PostItem          from "../components/PostItem.vue";

const posts       = ref(postData);
const selectedTag = ref("");

// 全タグを抽出しユニーク化
const uniqueTags = computed(() => {
  const tags = posts.value.flatMap((post) => post.tags || []);
  return [...new Set(tags)];
});

// 選択したタグで投稿をフィルタ
const filteredPosts = computed(() => {
  if (!selectedTag.value) return posts.value;
  return posts.value.filter(
    (post) => post.tags && post.tags.includes(selectedTag.value)
  );
});
</script>

<style scoped>
.tags {
  padding: 32px 8vw;
  background: #f7fafd;
  min-height: 100vh;
}
.tags-header {
  text-align: center;
  margin-bottom: 32px;
}
.tags-header h1 {
  font-size: 2.6rem;
  font-weight: bold;
  color: #265e9e;
  margin-bottom: 12px;
  letter-spacing: 2px;
}
.tags-desc {
  font-size: 1.1rem;
  color: #444;
  line-height: 1.7;
  margin: 0 auto;
  max-width: 600px;
  background: #eaf3fa;
  border-radius: 8px;
  padding: 16px 20px;
  box-shadow: 0 2px 8px rgba(38, 94, 158, 0.05);
}
.selected-tag {
  font-size: 3rem;
  color: #265e9e;
  margin-bottom: 10px;
  text-align: center;
}
.tag-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
}
.tag-radio-list {
  display: flex;
  flex-wrap: wrap;
  gap: 18px 28px;
  justify-content: center;
  margin-top: 10px;
}
.tag-radio {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.15rem;
  background: #fff;
  border: 2px solid #dbeafe;
  border-radius: 24px;
  padding: 10px 22px;
  cursor: pointer;
  transition: border 0.2s, box-shadow 0.2s;
  box-shadow: 0 1px 4px rgba(38, 94, 158, 0.04);
  user-select: none;
}
.tag-radio input[type="radio"] {
  width: 22px;
  height: 22px;
  accent-color: #265e9e;
  margin-right: 6px;
  cursor: pointer;
}
.tag-radio:hover,
.tag-radio input[type="radio"]:checked + span {
  border-color: #265e9e;
}
.tag-radio span {
  font-weight: 500;
  color: #265e9e;
}
.tag-results {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.no-posts {
  text-align: center;
  color: #888;
  font-size: 1.1rem;
  margin-top: 32px;
}
@media (max-width: 1500px) {
  .tags {
    padding: 18px 2vw;
  }
  .tags-header h1 {
    font-size: 1.4rem;
  }
  .tag-radio-list {
    gap: 10px 10px;
  }
  .tag-radio {
    padding: 7px 12px;
    font-size: 1rem;
  }
}
</style>
