<template>
  <div class="container">
    <Navbar />
    <nuxt />
  </div>
</template>

<script>
import Navbar from '../components/Navbar'

export default {
  components: { Navbar }
}
</script>

<style>
body {
  font-family: 'Rubik';
  font-weight: 400;
}
.container {
  width: 85%;
  margin: 0 auto;
}
</style>
