<template>
  <nav>
    <ul>
      <li v-for="icon in iconList" :key="icon.id">
        <router-link :to="icon.path">
          <img :src="icon.src" :alt="icon.alt" />
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import homeIcon from "../assets/home.svg";
import rankingIcon from "../assets/ranking.svg";
import tagsIcon from "../assets/tags.svg";
import testIcon from "../assets/test.svg";
import accountIcon from "../assets/account.svg";
import optionIcon from "../assets/option.svg";

const iconList = ref([
  { id: 1, path: "/", src: homeIcon, alt: "ホームアイコン" },
  { id: 2, path: "/ranking", src: rankingIcon, alt: "ランキングアイコン" },
  { id: 3, path: "/tags", src: tagsIcon, alt: "タグアイコン" },
  { id: 4, path: "/test", src: testIcon, alt: "テストアイコン" },
  { id: 5, path: "/account", src: accountIcon, alt: "アカウントアイコン" },
  { id: 6, path: "#", src: optionIcon, alt: "オプションアイコン" },
]);
</script>

<style scoped>
nav {
  left: 0%;
  width: 90px;
  max-height: 100%;
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
