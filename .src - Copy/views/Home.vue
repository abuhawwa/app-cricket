<template>
  <div class="home">
    <div class="d-flex justify-content-center flex-column vh-100">
      <router-link to="/about" class="btn btn-outline-info mb-2"
        >Previous Matches</router-link
      >
      <router-link to="/match" class="btn btn-outline-info mb-2"
        >New Match</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>
