<template>
  <div v-click-outside="outside" class="dropdown" @click="inside">
    <button class="dropdown__button">
      <span>{{ dropDownContent.buttonText }}</span>
      <fa class="dropdown__icon" :icon="['fa', 'angle-down']" />
    </button>
    <div v-show="isDropDownExpanded" class="dropdown__content">
      <div
        v-for="itemContent in dropDownContent.dropDownItem"
        :key="itemContent.buttonText"
        class="dropdown__item"
      >
        <div class="dropdown__header">
          <img
            class="dropdown__item-icon-src"
            :src="itemContent.icon"
            alt="icon"
          />
          <a class="dropdown__item-link" :href="itemContent.href">{{
            itemContent.hrefText
          }}</a>
        </div>
        <p class="dropdown__body">
          {{ itemContent.text }}
        </p>
      </div>
      <span class="dropdown__footer">Sponsored</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dropDownContent: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isDropDownExpanded: false
    }
  },
  methods: {
    outside() {
      this.isDropDownExpanded = false
    },
    inside() {
      this.isDropDownExpanded = !this.isDropDownExpanded
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown {
  position: relative;
  margin-right: 6px;
  height: 34px;
  &__button {
    display: flex;
    align-items: center;
    border-radius: 3px;
    border: none;
    padding: 0 10px;
    color: #fff;
    transition: 0.2s;
    background-color: #428bca;
    &:hover {
      color: #4a4a4a;
    }
  }
  &__icon {
    margin-left: 5px;
  }
  &__content {
    display: flex;
    flex-direction: column;
    width: 360px;
    padding: 20px 10px 10px 20px;
    background-color: #fff;
    position: absolute;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    content: '';
    left: 0;
    top: 40px;
  }
  &__header {
    display: flex;
    align-items: center;
  }
  &__item-icon-src {
    height: 22px;
    width: 22px;
    margin-right: 5px;
  }
  &__item-link {
    color: #8dc647;
    font-size: 17px;
    text-decoration: none;
  }
  &__body {
    margin-top: 5px;
    margin-right: 10px;
    font-size: 14px;
    line-height: 18px;
    color: #bebebe;
  }
  &__footer {
    font-size: 12px;
    margin-left: auto;
    color: #bebebe;
  }
}

.dropdown__item:nth-child(2) {
  margin-top: 10px;
}
</style>
