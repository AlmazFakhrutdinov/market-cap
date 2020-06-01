<template>
  <div class="general-text">
    <span class="bold">{{ coin.name }} price</span> today is
    <span class="bold"> {{ coinPairSymbol }}{{ convertToCurrentCoin }} </span>
    with a 24-hour trading volume of
    {{ coin.market_data.total_volume.usd }}
    {{ coinPairName.toUpperCase() }}.
    <span>{{ coin.symbol.toUpperCase() }}</span> price is
    <span
      v-if="isPositivePercentage(coin.market_data.price_change_percentage_24h)"
      >up</span
    >
    <span v-else>down</span>
    <span
      class="general-text__percentage"
      :style="{
        backgroundColor:
          isPositivePercentage(coin.market_data.price_change_percentage_24h) ===
          false
            ? '#e15241'
            : '#4eaf0a'
      }"
      >{{
        coin.market_data.price_change_percentage_24h | hundredthFractionalPart
      }}%</span
    >
    in the last 24 hours. It has a circulating supply of 18 Million coins and a
    max supply of 21 Million coins.
    <a
      v-if="coin.tickers[0].market.name"
      class="general-text__link"
      :href="coin.tickers[0].trade_url"
      >{{ coin.tickers[0].market.name }}</a
    >
    is the current most active market trading it. In order to explore addresses
    and transactions, you block explorers such as
    <a
      v-for="(item, index) in coin.links.blockchain_site"
      :key="index"
      class="general-text__link"
      :href="item"
      >{{ takeSiteName(item) }}</a
    >
    Additional information can be found at
    <a class="general-text__link" :href="coin.links.homepage[0]">{{
      takeSiteName(coin.links.homepage[0])
    }}</a>
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
    coinPairSymbol: {
      type: String,
      required: true
    },
    coinPairName: {
      type: String,
      required: true
    },
    coin: {
      type: Object,
      required: true
    },
    domainList: {
      type: String,
      required: true
    }
  },
  computed: {
    convertToCurrentCoin() {
      return 1 * this.coin.market_data.current_price[this.coinPairName]
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
    },
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
.general-text {
  font-size: 14px;
  margin-top: 15px;
  line-height: 26px;
  color: #4a4a4a;
  &__percentage {
    height: 24px;
    padding: 3px 7px;
    border-radius: 10px;
    color: #fff;
  }
  &__link {
    text-decoration: none;
    margin-right: 5px;
    color: #4eaf0a;
  }
}
</style>
