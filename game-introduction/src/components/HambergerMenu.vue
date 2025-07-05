<template>
  <div>
    <!--ハンバーガーメニューのボタン-->
    <div class="hamburger-btn" @click="toggleMenu" role="button" :aria-expanded="active.toString()" aria-label="メニューを切り替え" tabindex="0">
      <span class="line line-top"    :class="{ 'rotate-top'   : active }"></span>
      <span class="line line-middle" :class="{ 'rotate-middle': active }"></span>
      <span class="line line-bottom" :class="{ 'rotate-bottom': active }"></span>
    </div>

    <!--ハンバーガーメニューの中身-->
    <transition name="hamburger-menu">
      <div class="hamburger-menu" v-if="show">
        <ul>
          <li v-for="menu in menuList" :key="menu.id">
            <a v-if="menu.path === 'option'" @click.prevent="toggleOptionModal" class="menu-link">
              <img :src="menu.src" :alt="menu.alt" />
              {{ menu.name }}
            </a>
            <router-link
              v-else
              :to="menu.path"
              class="menu-link"
              @click="closeMenu"
            >
              <img :src="menu.src" :alt="menu.alt" />
              {{ menu.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </transition>

    <OptionModalDialog v-if="isOptionModalOpen" :openOpsionModal="isOptionModalOpen" @close="toggleOptionModal" />
  </div>
</template>

<script setup>
import { ref }           from "vue";
import menuList          from "../menuList";
import OptionModalDialog from "./OptionModalDialog.vue";

const active            = ref(false); // ハンバーガーメニューのボタンのアニメーション
const show              = ref(false); // ハンバーガーメニューの表示非表示
const isOptionModalOpen = ref(false); // OptionModalDialog の表示状態

// ハンバーガーメニューの開閉
const toggleMenu = () => {
  active.value = !active.value;
  show.value   = !show.value;
};

// OptionModalDialog の開閉をトグル
const toggleOptionModal = () => {
  isOptionModalOpen.value = !isOptionModalOpen.value;
};

const closeMenu = () => {
  show.value    = false;
  active.value  = false;
};
</script>

<style scoped>
/* ハンバーガーメニューのボタンのCSS */
.hamburger-btn {
  position: fixed;
  top: 21px;
  left: 11px;
  width: 60px;
  height: 60px;
  cursor: pointer;
  border: solid 2px #383e45;
  border-radius: 10%;
  background-color: rgb(240, 248, 255);
  z-index: 50;
}
.line {
  position: absolute;
  top: 0;
  left: 7.1px;
  width: 45px;
  height: 2px;
  background: #333333;
  text-align: center;
}
.line-top {
  top: 20px;
  transition: 0.4s ease;
}
.line-middle {
  top: 30px;
  transition: 0.4s ease;
}
.line-bottom {
  top: 40px;
  transition: 0.4s ease;
}
.rotate-top {
  transform: translateY(10px) rotate(-45deg);
  transition: 0.4s ease;
}
.rotate-middle {
  transition: 0.4s ease;
  opacity: 0;
}
.rotate-bottom {
  transform: translateY(-10px) rotate(45deg);
  transition: 0.4s ease;
}

/* ハンバーガーメニューの中身のCSS */
.hamburger-menu-enter-active,
.hamburger-menu-leave-active {
  transition: all 0.3s ease;
}
.hamburger-menu-enter-from,
.hamburger-menu-leave-to {
  transform: translateX(-100%);
}
.hamburger-menu-enter-to,
.hamburger-menu-leave-from {
  transform: translateX(0);
}
.hamburger-menu {
  top: 0;
  left: 0;
  width: 160px;
  height: 100vh;
  padding: 2rem 1rem;
  position: fixed;
  background-color: rgb(8, 8, 30);
  z-index: 30;
}
img {
  width: 32px;
  height: 32px;
  margin-right: 10px;
  color: rgb(180, 180, 180);
}
img:hover {
  opacity: 0.7;
}
ul {
  padding: 0;
  padding-top: 40px;
}
li {
  padding: 10px 0;
  list-style: none;
  display: flex;
  align-items: center;
}
a {
  font-size: 18px;
  color: rgb(180, 180, 180);
  text-decoration: none;
  display: flex;
  align-items: center;
}
a:hover {
  color: rgba(255, 255, 255, 0.8);
}
</style>
