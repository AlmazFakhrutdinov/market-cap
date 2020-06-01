<template>
  <div class="coinList">
    <div class="t-header">
      <div class="t-header__id">#</div>
      <div class="t-header__name">Coin</div>
      <div class="t-header__price">Price</div>
      <div class="t-header__change1h">1h</div>
      <div class="t-header__change24h">24h</div>
      <div class="t-header__change7d">7d</div>
      <div class="t-header__volume">24h Volume</div>
      <div class="t-header__mkt-cap">Mkt Cap</div>
      <div class="t-header__chart">Last 7 Days</div>
    </div>
    <coin-list-item
      v-for="item in watchListCoinList"
      :key="item.id"
      :item="item"
      :favorites="favorites"
      @handleDelete="handleDelete"
    />
    <loading v-if="isLoading" :bottom="0" :top="62" />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import CoinListItem from '../components/watch-list/CoinListItem'

export default {
  components: { CoinListItem },
  data() {
    return {
      favorites: [],
      isLoading: false
    }
  },
  async mounted() {
    const favorites = localStorage.getItem('favorites')
    if (favorites) {
      this.isLoading = true
      this.favorites = JSON.parse(favorites)

      const coinsId = this.favorites
        .map((item) => {
          return item + '%2C'
        })
        .join('')

      await this.fetchCoinList(coinsId)
      this.isLoading = false
    }
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    ...mapState('main_page', ['coinList']),
    ...mapState('watchlist', ['watchListCoinList'])
  },
  methods: {
    ...mapMutations('watchlist', ['removeCoin']),
    ...mapActions('watchlist', ['fetchCoinList']),
    handleDelete(coinId) {
      this.favorites = this.favorites.filter((item) => {
        return item !== coinId
      })
      this.removeCoin(coinId)
    }
  },
  // eslint-disable-next-line vue/order-in-components
  watch: {
    favorites() {
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === 'index' && !this.coinList) {
      this.isLoading = true
      next()
    }
    next()
  }
}
</script>

<style lang="scss" scoped>
.coinList {
  position: relative;
  height: vh;
}

.t-header {
  display: flex;
  border-radius: 3px;
  border-top: 1px solid #dbd9d2;
  padding-top: 14px;
  border-bottom: 1px solid #dbd9d2;
  height: 45px;
  font-size: 13px;

  &__id {
    text-align: center;
    width: 5%;
  }
  &__name {
    width: 22%;
  }
  &__price {
    text-align: right;
    width: 12%;
  }
  &__change1h {
    text-align: center;
    width: 5%;
  }
  &__change24h {
    text-align: center;
    width: 5%;
  }
  &__change7d {
    text-align: center;
    width: 5%;
  }
  &__volume {
    text-align: right;
    width: 12%;
  }
  &__mkt-cap {
    text-align: right;
    width: 12%;
  }
  &__chart {
    text-align: center;
    width: 16%;
  }
}
</style>
