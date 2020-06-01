<template>
  <div>
    <div class="quick-stats">
      <div class="quick-stats__title">
        Quick stats
      </div>
      <ul>
        <li class="quick-stats__list-item">
          <div class="quick-stats__list-title">{{ coin.name }} Price</div>
          <div class="quick-stats__list-text">
            {{ coinPairSymbol }}
            {{
              coin.market_data.current_price[coinPairName] | toLocaleString()
            }}
          </div>
        </li>
        <li v-if="coin.market_data.roi" class="quick-stats__list-item">
          <div class="quick-stats__list-title">{{ coin.name }} Roi</div>
          <div
            :style="{
              color:
                isPositivePercentage(coin.market_data.roi.percentage) === true
                  ? '#4eaf0a'
                  : '#e15241'
            }"
            class="quick-stats__list-text"
          >
            {{ coin.market_data.roi.percentage | hundredthFractionalPart }}%

            <fa
              v-if="
                isPositivePercentage(coin.market_data.roi.percentage) === true
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
        </li>
        <li class="quick-stats__list-item">
          <div class="quick-stats__list-title">Market Cap</div>
          <div class="quick-stats__list-text">
            {{ coinPairSymbol }}
            {{ coin.market_data.market_cap[coinPairName] | toLocaleString() }}
          </div>
        </li>
        <li class="quick-stats__list-item">
          <div class="quick-stats__list-title">Market Cap Dominance</div>
          <div class="quick-stats__list-text">
            {{ coinDominancePercentage }}%
          </div>
        </li>
        <li class="quick-stats__list-item">
          <div class="quick-stats__list-title">Trading Volume</div>
          <div class="quick-stats__list-text">
            {{ coinPairSymbol }}
            {{ coin.market_data.total_volume[coinPairName] | toLocaleString() }}
          </div>
        </li>
        <li class="quick-stats__list-item">
          <div class="quick-stats__list-title">24h Low / 24h High</div>
          <div class="quick-stats__list-text">
            {{ coinPairSymbol }}
            {{ coin.market_data.high_24h[coinPairName] | toLocaleString() }}
            /
            {{ coinPairSymbol }}
            {{ coin.market_data.low_24h[coinPairName] | toLocaleString() }}
          </div>
        </li>
        <li class="quick-stats__list-item">
          <div class="quick-stats__list-title">7d Low / 7d High</div>
          <div class="quick-stats__list-text">
            {{ coinPairSymbol }} {{ +sevenDayLowPrice | toLocaleString() }} /
            {{ coinPairSymbol }} {{ +sevenDayHighPrice | toLocaleString() }}
          </div>
        </li>
        <li class="quick-stats__list-item">
          <div class="quick-stats__list-title">Market Cap Rank</div>
          <div class="quick-stats__list-text">#{{ coin.market_cap_rank }}</div>
        </li>
        <li class="quick-stats__list-item">
          <div class="quick-stats__list-title">All-Time High</div>
          <div class="quick-stats__list-ath">
            {{ coinPairSymbol }}
            {{ coin.market_data.ath[coinPairName] | toLocaleString() }}
            <span
              :style="{
                color:
                  isPositivePercentage(
                    coin.market_data.ath_change_percentage[coinPairName]
                  ) === true
                    ? '#4eaf0a'
                    : '#e15241'
              }"
            >
              {{
                coin.market_data.ath_change_percentage[coinPairName]
                  | decimalPart
              }}
              %
            </span>
            <span class="quick-stats__list-text_small">
              {{
                $moment(coin.market_data.ath_date[coinPairName]).format(
                  'MMM Do, YYYY'
                )
              }}
            </span>
          </div>
        </li>
        <li class="quick-stats__list-item">
          <div class="quick-stats__list-title">All-Time Low</div>
          <div class="quick-stats__list-atl">
            {{ coinPairSymbol }}
            {{ coin.market_data.atl[coinPairName] | toLocaleString() }}
            <span
              :style="{
                color:
                  isPositivePercentage(
                    coin.market_data.atl_change_percentage[coinPairName]
                  ) === true
                    ? '#4eaf0a'
                    : '#e15241'
              }"
            >
              {{
                coin.market_data.atl_change_percentage[coinPairName]
                  | decimalPart
              }}
              %
            </span>
            <span class="quick-stats__list-text_small">
              {{
                $moment(coin.market_data.atl_date[coinPairName]).format(
                  'MMM Do, YYYY'
                )
              }}
            </span>
          </div>
        </li>
        <li class="quick-stats__list-item">
          <div class="quick-stats__list-title">Bitcoin/Bitcoin Ratio</div>
          <div class="quick-stats__list-text">
            1 BTC = {{ convertToCurrentCoinPair }}
            {{ coin.symbol.toUpperCase() }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    toLocaleString(item) {
      if (item) return item.toLocaleString()
    },
    hundredthFractionalPart(item) {
      if (!item) return '?'
      return item.toFixed(2)
    },
    decimalPart(item) {
      if (!item) return '?'
      return item.toFixed(2)
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
    },
    overallStats: {
      type: Object,
      required: true
    }
  },
  computed: {
    coinDominancePercentage() {
      const coinDominance = this.coin.market_data.market_cap[this.coinPairName]
      const marketCap = this.overallStats.total_market_cap[this.coinPairName]
      return (coinDominance / (marketCap / 100)).toFixed(2)
    },
    sevenDayLowPrice() {
      return Math.max(...this.coin.market_data.sparkline_7d.price).toFixed(2)
    },
    sevenDayHighPrice() {
      return Math.min(...this.coin.market_data.sparkline_7d.price).toFixed(2)
    },
    convertToCurrentCoinPair() {
      return (1 / this.coin.market_data.current_price.btc).toFixed(2)
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
.quick-stats {
  // width: 32%;
  background-color: #f8f8f8;
  border-left: 1px solid #e7e7e7;
  border-right: 1px solid #e7e7e7;
  &__title {
    height: 40px;
    color: #4a4a4a;
    padding-left: 20px;
    // margin-left: 20px;
    margin-top: 25px;
    font-weight: 500;
    border-bottom: 1px solid #e7e7e7;
  }
  &__list-item {
    font-size: 14px;
    display: flex;
    align-items: center;
    color: #212529;
    border-bottom: 1px solid #e7e7e7;
  }
  &__list-title {
    font-weight: 500;
    width: 50%;
    margin: 20px 0px 20px 20px;
  }
  &__list-text {
    display: flex;
    &_small {
      font-size: 12px;
    }
  }
  &__list-atl {
    display: flex;
    flex-direction: column;
  }
  &__list-ath {
    display: flex;
    flex-direction: column;
  }
}
</style>
