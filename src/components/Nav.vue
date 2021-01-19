<template>
  <ul class="nav nav-tabs nav-justified">
    <li class="nav-item">
      <router-link :to="{ name: 'FirstIngs' }" class="nav-link"
        >1st Ings</router-link
      >
    </li>
    <li class="nav-item">
      <router-link :to="{ name: 'SecondIngs' }" class="nav-link"
        >2nd Ings</router-link
      >
    </li>
    <li class="nav-item">
      <router-link :to="{ name: 'Summary' }" class="nav-link"
        >Summary</router-link
      >
    </li>
  </ul>
</template>

<script>
export default {
  name: "Nav",
};
</script>

<style>
</style>