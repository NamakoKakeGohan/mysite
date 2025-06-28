<template>
  <div>
    <nav>
      <ul>
        <li v-for="menu in menuList" :key="menu.id">
          <!-- Option の場合はクリックでモーダルを開く -->
          <a v-if="menu.path === 'option'" @click.prevent="toggleOptionModal" class="menu-link" >
            <img :src="menu.src" :alt="menu.alt" />
          </a>
          <!-- その他のメニューは通常のルート遷移 -->
          <router-link v-else :to="menu.path" class="menu-link">
            <img :src="menu.src" :alt="menu.alt" />
          </router-link>
        </li>
      </ul>
    </nav>
    <!-- OptionModalDialog -->
    <OptionModalDialog v-if="isOptionModalOpen" :openOpsionModal="isOptionModalOpen" @close="toggleOptionModal" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import menuList from "../menuList";
import OptionModalDialog from "./OptionModalDialog.vue";

const isOptionModalOpen = ref(false);
// OptionModalDialog の開閉をトグル
const toggleOptionModal = () => {
  isOptionModalOpen.value = !isOptionModalOpen.value;
};
</script>

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 90px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #265e9e;
  color: white;
}
img {
  width: 64px;
  height: 64px;
  margin-right: 10px;
}
img:hover {
  opacity: 0.7;
}
ul {
  padding: 0;
  margin: 100px 0 0 0;
}
li {
  padding-top: 35px;
  list-style: none;
  line-height: 1;
}
a {
  font-size: 30px;
  margin: 2px;
  color: rgb(66, 66, 66);
  text-decoration: none;
}
a:hover {
  color: rgba(0, 0, 0, 0.416);
}
</style>
