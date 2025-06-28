<template>
  <footer>
    <a href="https://github.com/NamakoKakeGohan/mysite">
    <img :src="GitHubIcon" alt="GitHubアイコン" />
    </a>
    <a href="mailto:closure1215@outlook.com?subject=件名を入力&body=本文を入力">
    <img :src="MailIcon" alt="メールアイコン" />
    </a>
  </footer>
</template>

<script setup>
import GitHubIcon from "../assets/GitHub.png";
import MailIcon from "../assets/MAIL.png";
</script>

<style scoped>
footer {
  max-width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 100px;
  background-color: #265e9e;
  color: white;
}

h1 {
  font-size: 4rem;
}

footer img {
  width: 36px;
  height: 36px;
  margin: 0 16px;
  object-fit: contain;
  transition: transform 0.2s;
  filter: brightness(0) invert(1);
  background: transparent;
  border-radius: 8px;
  display: inline-block;
  vertical-align: middle;
}
footer img:hover {
  transform: scale(1.15);
}


</style>