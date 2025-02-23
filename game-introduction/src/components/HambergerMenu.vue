<template>
  <div>
    <!--ハンバーガーメニューのボタン-->
    <div class="hamburger-btn" @click="active = !active">
      <span class="line line-top" :class="{ 'rotate-top': active }"></span>
      <span
        class="line line-middle"
        :class="{ 'rotate-middle': active }"
      ></span>
      <span
        class="line line-bottom"
        :class="{ 'rotate-bottom': active }"
      ></span>
    </div>

    <!--ハンバーガーメニューの中身-->
    <transition name="hamburger-menu">
      <div class="hamburger-menu" v-show="active">
        <ul>
          <li>
            <router-link to="/"
              ><img
                src="../assets/home.svg"
                alt="ホームアイコン"
              />Home</router-link
            >
          </li>
          <li>
            <router-link to="/ranking"
              ><img
                src="../assets/ranking.svg"
                alt="ランキングアイコン"
              />Ranking</router-link
            >
          </li>
          <li>
            <router-link to="/tags"
              ><img
                src="../assets/tags.svg"
                alt="タグアイコン"
              />Tags</router-link
            >
          </li>
          <li>
            <router-link to="/test"
              ><img
                src="../assets/test.svg"
                alt="テストアイコン"
              />Test</router-link
            >
          </li>
          <li>
            <router-link to="/account"
              ><img
                src="../assets/account.svg"
                alt="アカウントアイコン"
              />Account</router-link
            >
          </li>
          <li>
            <a href="#"
              ><img src="../assets/option.svg" alt="オプションアイコン" />Option
            </a>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";

const active = ref(false);
</script>

<style scoped>
/* ハンバーガーメニューのボタンのcss */
.hamburger-btn {
  position: fixed;
  top: 16px;
  left: 8px;
  width: 65px;
  height: 66px;
  cursor: pointer;
  border: solid 2px #383e45;
  border-radius: 10%;
  background-color: rgb(240, 248, 255);
  z-index: 50;
}
.line {
  position: absolute;
  top: 0;
  left: 9.5px;
  width: 45px;
  height: 2px;
  background: #333333;
  text-align: center;
}
.line-top {
  top: 24px;
  transition: 0.4s ease;
}
.line-middle {
  top: 34px;
  transition: 0.4s ease;
}
.line-bottom {
  top: 44px;
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

/* ハンバーガーメニューの中身のcss */
.hamburger-menu-enter-active,
.hamburger-menu-leave-active {
  transition: transform 0.3s ease;
}
.hamburger-menu-enter,
.hamburger-menu-leave-to {
  transform: translateX(-100%);
}
.hamburger-menu-enter-to,
.hamburger-menu-leave {
  transform: translateX(0);
}
.hamburger-menu {
  top: 0;
  left: 0;
  width: 200px;
  height: 100vh;
  padding: 2rem 1rem;
  position: fixed;
  background-color: rgb(8, 8, 30);
  z-index: 30;
}
img {
  width: 64px;
  height: 64px;
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
  padding-top: 60px;
  list-style: none;
  line-height: 1;
}
a {
  font-size: 30px;
  margin: 2px;
  color: rgb(180, 180, 180);
  text-decoration: none;
}
a:hover {
  color: rgba(0, 0, 0, 0.416);
}
</style>
