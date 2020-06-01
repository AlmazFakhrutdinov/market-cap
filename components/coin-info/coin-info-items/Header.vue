<template>
  <div>
    <div class="header">
      <div class="header-coin">
        <img class="header-coin__icon" :src="coin.image.small" alt="" />
        <h2 class="header-coin__id">{{ coin.id }}</h2>
        <span class="header-coin__symbol">({{ coin.symbol }})</span>
      </div>
      <div class="header-price">
        <div class="header-price__usd-info">
          <span class="header-price__current-price-usd">
            {{ coinPairSymbol
            }}{{
              coin.market_data.current_price[coinPairName] | toLocaleString()
            }}
          </span>
          <span
            class="header-price__change-24h-usd"
            :style="{
              color:
                isPositivePercentage(
                  coin.market_data.price_change_percentage_24h
                ) === false
                  ? '#e15241'
                  : '#4eaf0a'
            }"
          >
            {{ coin.market_data.price_change_percentage_24h | cropToTenth }} %
          </span>
        </div>
        <div class="header-price__currency-info">
          <span
            class="header-price__current-price-btc header-price__current-price-btc_grow"
          >
            {{ coin.market_data.current_price.btc }} {{ coin.symbol }}
          </span>
          <div
            :style="{
              color:
                isPositivePercentage(
                  coin.market_data.price_change_percentage_24h
                ) === false
                  ? '#e15241'
                  : '#4eaf0a'
            }"
          >
            <span class="header-price__change-24h-btc">
              {{
                coin.market_data.market_cap_change_percentage_24h_in_currency
                  .btc | cropToTenth
              }}
              %
            </span>
            <fa
              v-if="
                isPositivePercentage(
                  coin.market_data.price_change_percentage_24h
                )
              "
              class="header-price__icon"
              :icon="['fa', 'level-up-alt']"
            />
            <fa
              v-else
              class="header-price__icon"
              :icon="['fa', 'level-down-alt']"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    cropToTenth(item) {
      if (item) return item.toFixed(1)
    }
  },
  props: {
    coin: {
      type: Object,
      required: true
    },
    coinPairName: {
      type: String,
      required: true
    },
    coinPairSymbol: {
      type: String,
      required: true
    }
  },
  computed: {
    isPositivePercentage(item) {
      const signOfNumber = Math.sign(item)

      if (signOfNumber === 1) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
}

.header-coin {
  display: flex;
  align-items: center;
  &__icon {
    margin-right: 10px;
  }
  &__id::first-letter {
    text-transform: uppercase;
  }
  &__id {
    font-size: 28px;
  }
  &__symbol {
    margin-left: 10px;
    font-size: 28px;
    text-transform: uppercase;
  }
}

.header-price {
  margin-left: auto;
  &__usd-info,
  &__currency-info {
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
  }
  &__current-price-usd {
    font-size: 28px;
  }
  &__current-price-btc {
    color: #bebebe;
    text-transform: uppercase;
  }
  &__change-24h-usd {
    margin-left: 10px;
  }
  &__change-24h-btc {
    margin-left: 10px;
  }
}
</style>
