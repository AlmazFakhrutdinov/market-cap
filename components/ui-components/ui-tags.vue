<template>
  <div v-if="domainList" class="tags">
    <div v-for="(tag, index) in items" :key="index" class="tags__item">
      <a v-if="tag" class="tags__link" :href="tag">{{ takeSiteName(tag) }}</a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState(['domainList'])
  },
  methods: {
    takeSiteName(item) {
      if (!item) return
      // eslint-disable-next-line no-useless-escape
      const regExp = new RegExp(`[^\/]*(${this.domainList})`, 'g')
      return item.match(regExp).toString()
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  display: flex;
  justify-content: start;
  flex-direction: row;
  flex-wrap: wrap;
  min-height: 30px;
  &__item {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px 0px;
    // line-height: 40px;
  }
  &__link {
    background-color: #eee;
    font-weight: 400;
    height: 25px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    margin-right: 5px;
    color: #428bca;
    text-decoration: none;
  }
}
</style>
