<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <button @click="onClickBtn">Huga</button>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const onClickBtn = () => {
  router.push("/test");
};
</script>
