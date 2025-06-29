<template>
  <teleport to="body">
    <div v-if="openOpsionModal" class="modal-overlay">
      <div class="option-detail-modal">
        <!-- キャンセルボタン -->
        <button class="close-button" @click="$emit('close')">×</button>

        <div class="modal-body">
          <h1>Option</h1>
          <!-- テーマ切り替えボタン -->
          <button @click="toggleTheme" class="theme-toggle-button">
            {{ theme === "light" ? "ダークモード" : "ライトモード" }}
          </button>
          <!-- クレジット -->
          <div class="credit">
            <h3>クレジット</h3>
            <p>このアプリは、Vue.jsを使用して開発されています。</p>
            <p>開発者: 阿美律希</p>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { inject } from "vue";
import { defineProps } from "vue";

defineProps({
  openOpsionModal: {
    type: Boolean,
    required: true,
  },
});

// App.vueからグローバルなテーマ状態と切り替え関数を取得
const theme = inject("theme");
const toggleTheme = inject("toggleTheme");
</script>

<style scoped>
p {
  color: #dedede;
  font-size: 16px;
  line-height: 1.5;
}
h1 {
  color: #dedede;
  font-size: 48px;
  margin-bottom: 20px;
}
h3 {
  color: #dedede;
  font-size: 24px;
  margin-bottom: 10px;
}
/* モーダルの背景オーバーレイ */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.option-detail-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 1000px;
  max-width: 65%;
  height: auto;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background: white;
  padding: 20px;
  border-radius: 10px;
}

/* 丸型のキャンセルボタンを右上に配置 */
.close-button {
  position: absolute;
  top: 35px;
  right: 35px;
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
  transform: scale(1.4);
  background-color: #ff4c4c;
}
.close-button:active {
  transform: scale(1);
  background-color: #e63939;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  widows: 600px;
  max-width: 100%;
  height: 550px;
  background-color: #3b3e3f;
  border-radius: 10px;
  box-sizing: border-box;
}

/* テーマ切り替えボタン */
.theme-toggle-button {
  padding: 10px 20px;
  width: 150px;
  height: 50px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #0061ca;
  color: white;
  transition: background-color 0.3s ease;
}

.theme-toggle-button:hover {
  background-color: #0056b3;
}

/* ダークテーマのスタイル */
:root.dark-theme {
  --background-color: #121212;
  --text-color: #ffffff;
}

/* ライトテーマのスタイル */
:root.light-theme {
  --background-color: #ffffff;
  --text-color: #000000;
}

/* モーダルのスタイルにテーマを適用 */
.option-detail-modal {
  background-color: var(--background-color);
  color: var(--text-color);
}
</style>
