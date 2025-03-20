<template>
  <nav>
    <ul>
      <li v-for="menu in menuList" :key="menu.id">
        <router-link :to="menu.path">
          <img :src="menu.src" :alt="menu.alt" />
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import menuList from "../menuList";
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
