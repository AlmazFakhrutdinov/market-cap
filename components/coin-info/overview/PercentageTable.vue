<template>
  <div>
    <ul class="percentage-table">
      <li class="percentage-table__container">
        <div class="percentage-table__title">1h</div>
        <div
          :style="{
            color:
              isPositivePercentage(
                coin.market_data.price_change_percentage_1h_in_currency.usd
              ) === false
                ? '#e15241'
                : '#4eaf0a'
          }"
          class="percentage-table__item"
        >
          {{
            coin.market_data.price_change_percentage_1h_in_currency.usd
              | hundredthFractionalPart
          }}%
        </div>
      </li>
      <li class="percentage-table__container">
        <div class="percentage-table__title">24h</div>
        <div
          :style="{
            color:
              isPositivePercentage(
                coin.market_data.price_change_percentage_24h
              ) === false
                ? '#e15241'
                : '#4eaf0a'
          }"
          class="percentage-table__item"
        >
          {{
            coin.market_data.price_change_percentage_24h
              | hundredthFractionalPart
          }}%
        </div>
      </li>
      <li class="percentage-table__container">
        <div class="percentage-table__title">7d</div>
        <div
          :style="{
            color:
              isPositivePercentage(
                coin.market_data.price_change_percentage_7d
              ) === false
                ? '#e15241'
                : '#4eaf0a'
          }"
          class="percentage-table__item"
        >
          {{
            coin.market_data.price_change_percentage_7d
              | hundredthFractionalPart
          }}%
        </div>
      </li>
      <li class="percentage-table__container">
        <div class="percentage-table__title">14d</div>
        <div
          :style="{
            color:
              isPositivePercentage(
                coin.market_data.price_change_percentage_14d
              ) === false
                ? '#e15241'
                : '#4eaf0a'
          }"
          class="percentage-table__item"
        >
          {{
            coin.market_data.price_change_percentage_14d
              | hundredthFractionalPart
          }}%
        </div>
      </li>
      <li class="percentage-table__container">
        <div class="percentage-table__title">30d</div>
        <div
          :style="{
            color:
              isPositivePercentage(
                coin.market_data.price_change_percentage_30d
              ) === false
                ? '#e15241'
                : '#4eaf0a'
          }"
          class="percentage-table__item"
        >
          {{
            coin.market_data.price_change_percentage_30d
              | hundredthFractionalPart
          }}%
        </div>
      </li>
      <li class="percentage-table__container">
        <div class="percentage-table__title">1y</div>
        <div
          :style="{
            color:
              isPositivePercentage(
                coin.market_data.price_change_percentage_1y
              ) === false
                ? '#e15241'
                : '#4eaf0a'
          }"
          class="percentage-table__item"
        >
          {{
            coin.market_data.price_change_percentage_1y
              | hundredthFractionalPart
          }}%
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  filters: {
    hundredthFractionalPart(item) {
      if (!item) return '?'
      return item.toFixed(2)
    }
  },
  props: {
    coin: {
      type: Object,
      required: true
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
.percentage-table {
  display: flex;
  width: 100%;
  margin-top: 20px;
  &__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    align-items: center;
    font-size: 14px;
  }
  &__title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 100%;
    border: 1px solid #dee2e6;
  }
  &__item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 100%;
    border: 1px solid #dee2e6;
  }
}
</style>
