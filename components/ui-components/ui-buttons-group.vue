<template>
  <div>
    {{ items }}
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {}
  }
}
</script>

<style></style>
