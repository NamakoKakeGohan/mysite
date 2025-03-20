<template>
  <div>
    <!--ハンバーガーメニューのボタン-->
    <div class="hamburger-btn" @click="toggleMenu">
      <span class="line line-top"    :class="{ 'rotate-top'   : active }"></span>
      <span class="line line-middle" :class="{ 'rotate-middle': active }"></span>
      <span class="line line-bottom" :class="{ 'rotate-bottom': active }"></span>
    </div>

    <!--ハンバーガーメニューの中身-->
    <transition name="hamburger-menu">
      <div class="hamburger-menu" v-if="show">
        <ul>
          <li v-for="menu in menuList" :key="menu.id">
            <router-link :to="menu.path">
              <img :src="menu.src" :alt="menu.alt" />
              {{ menu.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref }     from "vue";
import homeIcon    from "../assets/home.svg";
import rankingIcon from "../assets/ranking.svg";
import tagsIcon    from "../assets/tags.svg";
import testIcon    from "../assets/test.svg";
import accountIcon from "../assets/account.svg";
import optionIcon  from "../assets/option.svg";

const menuList = ref([ // ハンバーガーメニューのリスト
  { id: 1, path: "/", src: homeIcon, alt: "ホームアイコン", name: "Home" },
  { id: 2, path: "/ranking", src: rankingIcon, alt: "ランキングアイコン", name: "Ranking" },
  { id: 3, path: "/tags", src: tagsIcon, alt: "タグアイコン", name: "Tags" },
  { id: 4, path: "/test", src: testIcon, alt: "テストアイコン", name: "Test" },
  { id: 5, path: "/account", src: accountIcon, alt: "アカウントアイコン", name: "Account" },
  { id: 6, path: "#", src: optionIcon, alt: "オプションアイコン", name: "Option" },
]);

const active = ref(false); // ハンバーガーメニューのボタンのアニメーション

const show   = ref(false); // ハンバーガーメニューの表示非表示

const toggleMenu = () => { 
  active.value = !active.value; // ハンバーガーメニューの表示非表示を切り替える
  show.value   = !show.value;   // showの値も切り替える
};

</script>

<style scoped>
/* ハンバーガーメニューのボタンのcss */
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

/* ハンバーガーメニューの中身のcss */
.hamburger-menu-enter-active,
.hamburger-menu-leave-active {
  transition: all 0.7s ease;
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
