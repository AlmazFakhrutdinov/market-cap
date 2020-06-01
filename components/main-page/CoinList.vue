<template>
  <div>
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
      v-for="item in coinList"
      :key="item.id"
      :item="item"
      :favorites="favorites"
      @handleCheck="handleCheck"
      @goToCoinInfo="$emit('goToCoinInfo', item.id)"
    />
  </div>
</template>

<script>
import CoinListItem from './CoinListItem'

export default {
  components: { CoinListItem },
  props: {
    coinList: {
      type: Array
    }
  },
  data() {
    return {
      favorites: []
    }
  },
  mounted() {
    const favorites = localStorage.getItem('favorites')
    if (favorites) {
      this.favorites = JSON.parse(favorites)
    }
  },
  methods: {
    handleCheck(coinId) {
      const checkFavorites = this.favorites.includes(coinId)
      if (!checkFavorites) {
        this.favorites.push(coinId)
        localStorage.setItem('favorites', JSON.stringify(this.favorites))
      } else {
        this.favorites = this.favorites.filter((elem) => elem !== coinId)
        localStorage.setItem('favorites', JSON.stringify(this.favorites))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
    width: 8%;
  }
  &__name {
    width: 25%;
  }
  &__price {
    text-align: right;
    width: 10%;
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
    width: 14%;
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
