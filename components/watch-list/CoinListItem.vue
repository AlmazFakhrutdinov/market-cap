<template>
  <div class="t-body">
    <div class="t-body__serial-number">
      <div class="t-body__rank">
        {{ item.market_cap_rank }}
      </div>
    </div>
    <div class="t-body__coin-name">
      <img class="t-body__img" :src="item.image" alt="coin-image" />
      <div class="t-body__name">{{ item.name }} {{ hiddenId }}</div>
      <div class="t-body__id">
        {{ item.symbol }}
      </div>
    </div>
    <div class="t-body__price">${{ item.current_price | toLocaleString }}</div>
    <div
      :style="{
        color:
          isPositivePercentage(item.price_change_percentage_1h_in_currency) ===
          false
            ? '#e15241'
            : '#4eaf0a'
      }"
      class="t-body__1h"
    >
      {{ item.price_change_percentage_1h_in_currency | shortenToDecimal }}
    </div>
    <div
      :style="{
        color:
          isPositivePercentage(item.price_change_percentage_24h_in_currency) ===
          false
            ? '#e15241'
            : '#4eaf0a'
      }"
      class="t-body__24h"
    >
      {{ item.price_change_percentage_24h_in_currency | shortenToDecimal }}
    </div>
    <div
      :style="{
        color:
          isPositivePercentage(item.price_change_percentage_7d_in_currency) ===
          false
            ? '#e15241'
            : '#4eaf0a'
      }"
      class="t-body__7d"
    >
      {{ item.price_change_percentage_7d_in_currency | shortenToDecimal }}
    </div>
    <div class="t-body__volume">${{ item.total_volume | toLocaleString }}</div>
    <div class="t-body__market-cap">
      ${{ item.market_cap | toLocaleString }}
    </div>
    <div class="t-body__chart">
      <img :src="sparklineUrl" alt="chart" />
    </div>
    <div class="t-body__trash">
      <fa
        class="t-body__icon"
        :icon="['fa', 'trash']"
        @click="$emit('handleDelete', item.id)"
      />
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    shortenToDecimal(item) {
      if (!item) return '?'
      return item.toFixed(2) + '%'
    },
    toLocaleString(item) {
      if (item) return item.toLocaleString()
    }
  },
  props: {
    favorites: {
      type: Array,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    isFavoritesItem() {
      return this.favorites.includes(this.item.id)
    },
    hiddenId() {
      const imageUrl = this.item.image
      const matches = imageUrl.match(/images\/(.+)\/large/)
      return matches.length ? matches[1] : false
    },
    sparklineUrl() {
      return `https://www.coingecko.com/coins/${this.hiddenId}/sparkline`
    }
  },
  methods: {
    isPositivePercentage(item) {
      const signOfNumber = Math.sign(item)

      if (signOfNumber === 1 || signOfNumber === 0) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.t-body {
  width: 100%;
  display: flex;
  align-items: center;
  height: 55px;
  border-radius: 3px;
  border-bottom: 1px solid #dbd9d2;
  font-size: 14px;
  cursor: pointer;
  &__serial-number {
    display: flex;
    align-items: center;
    width: 5%;
  }
  &__label {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  &__icon {
    margin-left: 10px;
    width: 25px;
    height: 25px;
  }
  &__checkbox {
    display: none;
  }
  &__rank {
    margin-left: 20px;
  }
  &__coin-name {
    display: flex;
    align-items: center;
    width: 22%;
  }
  &__img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  &__name {
    width: 40%;
  }
  &__id {
    text-transform: uppercase;
  }
  &__price {
    width: 12%;
    text-align: right;
    font-weight: 400;
  }
  &__1h {
    width: 5%;
    text-align: center;
    font-weight: 400;
  }
  &__24h {
    width: 5%;
    text-align: center;
    font-weight: 400;
  }
  &__7d {
    width: 5%;
    text-align: center;
    font-weight: 400;
  }
  &__volume {
    width: 12%;
    text-align: right;
    font-weight: 400;
  }
  &__market-cap {
    width: 12%;
    text-align: right;
    font-weight: 400;
  }
  &__chart {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16%;
    &img {
      height: 80%;
      widows: 90%;
    }
  }
  &__icon {
    margin-top: 5px;
    color: #310a0b;
  }
  &:hover {
    background-color: #dbd9d2;
  }
}
</style>
