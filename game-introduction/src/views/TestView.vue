<template>
  <div class="diagnosis-page">
    <!-- モーダル -->
    <ProjectTestStart :isVisible="showModal" @start="startTest"/>

    <!-- 質問カード -->
    <QuestionCard
      v-if="!showModal && currentQuestion"
      :question="currentQuestion"
      :questionNumber="currentIndex + 1"
      @select="handleSelect"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter }     from "vue-router";
import QuestionCard      from "../components/QuestionCard.vue";
import ProjectTestStart  from "../components/ProjectTestStart.vue";
import questionData      from "../data/questionData.js";

// スコア状態
const scores = ref({
  アクション: 0,
  カードゲーム: 0,
  格闘: 0,
  RPG: 0,
  シューティング: 0,
  アドベンチャー: 0,
  レース: 0,
  シュミレーション: 0,
});

const currentIndex = ref(0); // 現在の質問
const showModal    = ref(true); // モーダルの表示状態
const router       = useRouter();

// 現在の質問
const currentQuestion = computed(() => questionData[currentIndex.value]);

// モーダルのスタートボタンが押されたとき
const startTest = () => {
  showModal.value = false; // モーダルを非表示にする
};

// イベントハンドリングされたジャンルをスコアに加算し、次の質問へ進む
function handleSelect(selectedGenres) {
  selectedGenres.forEach((genre) => {
    if (scores.value[genre] !== undefined) { // ジャンルが存在するか確認
      scores.value[genre]++;
    }
  });

  if (currentIndex.value < questionData.length - 1) {
    currentIndex.value++;
  } else {
    // 最後の質問の場合、結果ページに遷移
    const topGenre = Object.entries(scores.value).sort((a, b) => b[1] - a[1])[0][0];
    router.push({ name: "TestResult", query: { genre: topGenre } });
  }
}
</script>
