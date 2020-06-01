<template>
  <div class="tabs">
    <div
      v-for="item in items"
      :key="item"
      class="tabs__item"
      :class="{ active: currentTab === item }"
      @click="$emit('toggleTab', item)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    currentTab: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  margin-left: 5px;
  &__item {
    padding: 12px 20px 8px 20px;
    margin-bottom: -1px;
    font-weight: 500;
    font-size: 14px;
    border: 1px solid transparent;
    color: #495057;
    transition: 0.2s ease all;
    cursor: pointer;
    &:hover {
      color: #4eaf0a;
    }
  }
  &__item.active {
    border: 1px solid #dee2e6;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
    background-color: #fff;
    border-bottom: 1px solid transparent;
  }
}
</style>
