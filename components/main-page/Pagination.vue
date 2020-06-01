<template>
  <div v-if="overallStats" class="pagination">
    <div
      v-for="(item, index) in paginationItems"
      :key="index"
      class="pagination__item"
    >
      <span
        v-if="item != false"
        class="pagination__btn"
        @click="setPagination(item), $emit('fetch', item)"
      >
        {{ item }}
      </span>
      <span v-else class="pagination__btn">
        {{ '...' }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pageNumber: {
      type: Number,
      required: true
    },
    overallStats: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      paginationItems: [],
      min: 1
    }
  },
  computed: {
    max() {
      return Math.trunc(this.overallStats.active_cryptocurrencies / 100)
    }
  },
  watch: {
    pageNumber() {
      this.setPagination(this.pageNumber)
    }
  },
  mounted() {
    this.setPagination(this.pageNumber)
  },
  methods: {
    setPagination(pageNumber) {
      const pagination = []

      if (pageNumber - 3 < this.min) {
        pageNumber = this.min + 3
      }
      if (pageNumber + 3 > this.max) {
        pageNumber = this.max - 3
      }

      pagination.push(this.min)

      pageNumber - 3 === this.min
        ? pagination.push(pageNumber - 2)
        : pagination.push(false)

      pagination.push(pageNumber - 1)

      pagination.push(pageNumber)

      pagination.push(pageNumber + 1)

      pageNumber + 3 === this.max
        ? pagination.push(pageNumber + 2)
        : pagination.push(false)

      pagination.push(this.max)

      this.paginationItems = pagination
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: space-between;
  width: 33%;
  height: 40px;
  margin: 0 auto;
  &__item {
    background-color: #f6f6f4;
    width: 35px;
    height: 35px;
    border-radius: 50px;
  }
  &__btn {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    width: 35px;
  }
  &__item:hover {
    background-color: #e6e6e6;
    cursor: pointer;
  }
}
</style>
