<template>
  <div class="main-page">
    <div class="controls">
      <button
        v-if="$route.query.page != 1"
        class="controls__previous"
        @click="handlePrevious"
      >
        Previous
      </button>
      <button class="controls__next" @click="handleNext">
        Next
      </button>
    </div>
    <coin-list
      class="coin-list"
      :coin-list="coinList"
      @goToCoinInfo="goToCoinInfo"
    />
    <pagination
      class="pagination"
      :overall-stats="overallStats"
      :page-number="page"
      @fetch="handlePagination"
    />
    <button v-scroll-to="'#element'" class="scroll-to" href="#">
      <fa :icon="['fa', 'arrow-up']" />
    </button>
    <loading v-if="isLoading" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CoinList from '../components/main-page/CoinList'
import Pagination from '@/components/main-page/Pagination'

export default {
  components: { CoinList, Pagination },
  middleware: 'load_coins',
  computed: {
    ...mapState(['overallStats']),
    ...mapState('main_page', ['coinList', 'pageNumber']),
    page() {
      return +this.$route.query.page || 1
    }
  },
  // eslint-disable-next-line vue/order-in-components
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    ...mapActions('main_page', ['fetchCoinList']),
    handlePagination(page) {
      this.fetch(page)
    },
    handlePrevious() {
      this.fetch(this.page - 1)
    },
    handleNext() {
      this.fetch(this.page + 1)
    },
    async fetch(id) {
      this.isLoading = true
      this.$router.push({ path: '/', query: { page: id } })
      await this.fetchCoinList(id)
    },
    goToCoinInfo(coinId) {
      this.$router.push(`/${coinId}`)
    }
  },
  watch: {
    coinList() {
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.main-page {
  position: relative;
}

.controls {
  width: 19%;
  margin-left: auto;
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  &__previous,
  &__next {
    margin-left: auto;
    height: 35px;
    padding-left: 15px;
    padding-right: 15px;
    font-size: 16px;
    border-radius: 3px;
    border: none;
    background-color: #f6f6f4;
    outline: none;
    &:hover {
      cursor: pointer;
      background-color: #e6e6e6;
    }
  }
}

.coin-list {
  border-radius: 5px;
}

.pagination {
  margin-top: 30px;
  margin-bottom: 40px;
}

.scroll-to {
  position: fixed;
  right: 30px;
  bottom: 50px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
}

.scroll-to {
  position: fixed;
  right: 30px;
  bottom: 50px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
}
</style>
