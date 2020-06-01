<template>
  <div :style="{ top: top + 'px', bottom: bottom + 'px' }" class="loading-page">
    <p>Loading...</p>
  </div>
</template>

<script>
export default {
  props: {
    top: {
      type: Number,
      default: 109
    },
    bottom: {
      type: Number,
      default: 71
    }
  }
}
</script>

<style scoped>
.loading-page {
  position: absolute;
  left: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
}
</style>
