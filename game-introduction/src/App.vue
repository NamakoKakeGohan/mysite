<template>
  <div class="layout">
    <ProjectHeader class="header" />
    <HambergerMenu />
    <ProjectSidebar class="sidebar" />
    <main>
      <router-view />
    </main>
    <ProjectFooter />
  </div>
</template>

<script setup>
import { ref, watch, provide } from "vue";
import ProjectHeader  from "./components/ProjectHeader.vue";
import HambergerMenu  from "./components/HambergerMenu.vue";
import ProjectSidebar from "./components/ProjectSidebar.vue";
import ProjectFooter  from "./components/ProjectFooter.vue";

// グローバルなテーマ状態を管理
const theme = ref("light"); // 初期値は "light"

// テーマを切り替える関数
const toggleTheme = () => {
  theme.value = theme.value === "light" ? "dark" : "light";
  console.log(theme.value);
};

// <html> 要素にクラスを追加
watch(theme, (newTheme) => {
  const htmlElement = document.documentElement;
  if (newTheme === "dark") {
    htmlElement.classList.add("dark-theme");
    htmlElement.classList.remove("light-theme");
  } else {
    htmlElement.classList.add("light-theme");
    htmlElement.classList.remove("dark-theme");
  }
});

// provide テーマとトグル関数をOptionModalDialog.vueに渡す
provide("theme", theme);
provide("toggleTheme", toggleTheme);
</script>

<style scoped>
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
}

.header {
  grid-area: header;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0;
  z-index: 30;
}

.sidebar {
  grid-area: sidebar;
  position: fixed;
  top: 100px;
  left: 0;
  height: calc(100vh - 60px);
  z-index: 20;
}

main {
  grid-area: main;
  padding: 1rem;
  margin-top: 100px;
}

footer {
  grid-area: footer;
}
</style>

<style>
/* グローバル CSS */
:root.light-theme {
  --background-color: #ffffff;
  --text-color: #000000;
}

:root.dark-theme {
  --background-color: #121212;
  --text-color: #ffffff;
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>
