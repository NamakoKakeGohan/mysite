<template>
  <div class="modal-overlay" v-if="isVisible">
    <div class="modal-content">
      <h2>　どんなゲームが向いているか診断！（全4問）</h2>
      <button class="start-button" @click="startTest">スタート</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["start"]);

const startTest = () => {
  emit("start");
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {

  width: 800px;
  height: 200px;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  background-color: #f5fbff35;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

h2 {
  font-size: 2rem;
  margin-bottom: 30px;
}

.start-button {
  background: #00acc1;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background 0.3s;
}

.start-button:hover {
  background: #007c91;
}
</style>