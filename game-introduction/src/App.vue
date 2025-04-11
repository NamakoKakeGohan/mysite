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
import ProjectHeader from "./components/ProjectHeader.vue";
import HambergerMenu from "./components/HambergerMenu.vue";
import ProjectSidebar from "./components/ProjectSidebar.vue";
import ProjectFooter from "./components/ProjectFooter.vue";
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
