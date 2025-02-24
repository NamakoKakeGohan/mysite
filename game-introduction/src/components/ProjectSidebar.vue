<template>
  <nav>
    <ul>
      <li>
        <router-link to="/"
          ><img src="../assets/home.svg" alt="ホームアイコン"
        /></router-link>
      </li>
      <li>
        <router-link to="/ranking"
          ><img src="../assets/ranking.svg" alt="ランキングアイコン"
        /></router-link>
      </li>
      <li>
        <router-link to="/tags"
          ><img src="../assets/tags.svg" alt="タグアイコン"
        /></router-link>
      </li>
      <li>
        <router-link to="/test"
          ><img src="../assets/test.svg" alt="テストアイコン"
        /></router-link>
      </li>
      <li>
        <router-link to="/account"
          ><img src="../assets/account.svg" alt="アカウントアイコン"
        /></router-link>
      </li>
      <li>
        <a href="#"
          ><img src="../assets/option.svg" alt="オプションアイコン" />
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup></script>

<style scoped>
nav {
  left: 0%;
  width: 100px;
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
