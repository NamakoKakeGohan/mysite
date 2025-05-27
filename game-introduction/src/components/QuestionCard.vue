<template>
  <div class="question-card">
    <h2 class="question-title">
      Q{{ questionNumber }}. {{ question.question }}
    </h2>
    <ul class="options">
      <li v-for="(option, index) in question.options" :key="index" @click="selectOption(option.genres)" class="option">
        {{ option.text }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

// 質問と選択イベントを受け取る
const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
  questionNumber: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(["select"]);

// 選択されたジャンルを親コンポーネントに通知
const selectOption = (genres) => {
  emit("select", genres);
};
</script>

<style scoped>
.question-card {
  margin: 5rem auto 3rem auto;
  padding: 1.5rem;
  max-width: 600px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background: #fff;
}

.question-title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  margin-bottom: 2.5rem;
}

.options {
  list-style: none;
  padding: 0;
}

.option {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem 0;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
  border: 1px solid transparent;
  background: #f0f0f0;
}

.option:hover {
  background:   #e0f7fa;
  border-color: #00acc1;
}

</style>
