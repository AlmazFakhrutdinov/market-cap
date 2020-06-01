<template>
  <div class="markets">
    <input class="searcher" type="text" placeholder="Search..." />
    <div class="t-header">
      <div class="t-header__index">#</div>
      <div class="t-header__exchange-name">Exchange</div>
      <div class="t-header__pair">Pair</div>
      <div class="t-header__price">Price</div>
      <div class="t-header__spread">Spread</div>
      <div class="t-header__24h-volume">24h Volume</div>
      <div class="t-header__last-traded">Last Traded</div>
      <div class="t-header__trust-score">Trust Scrore</div>
    </div>
    <div
      v-for="(item, index) in marketsList"
      :key="item.converted_volume.usd"
      class="t-body"
    >
      <div class="t-body__index">{{ index + 1 }}</div>
      <div class="t-body__exchange-name-container">
        <img
          class="t-body__exchange-img"
          :src="item.market.logo"
          alt="exchange-img"
        />

        <!-- fix !!!!!!! -->

        <a class="t-body__exchange-link" :href="item.trade_url">{{
          item.market.name
        }}</a>
      </div>
      <div class="t-body__pair">
        <a class="t-body__trade-link" :href="item.trade_url"
          >{{ item.base }}/{{ item.target }}</a
        >
      </div>
      <div class="t-body__price">${{ item.converted_last.usd.toFixed(2) }}</div>
      <div class="t-body__spread">
        {{ item.bid_ask_spread_percentage.toFixed(2) }}%
      </div>
      <div class="t-body__24h-volume">{{ item.converted_volume.usd }}</div>
      <div class="t-body__last-traded">
        {{ $moment(item.last_traded_at).format('h:mm:ss a, MMMM Do, YYYY') }}
      </div>
      <div class="t-body__trust-score">
        <div
          :style="{ backgroundColor: (color = item.trust_score) }"
          class="t-body__trust-score-item"
        ></div>
      </div>
    </div>
    <loading v-if="isLoading" :bottom="0" :top="0" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    coinPairName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      pageNumber: 1,
      lol: null,
      isLoading: false
    }
  },
  async mounted() {
    if (this.coinPairName !== this.$route.params.id) {
      await this.fetchExchangesIdsList()
      this.fetch()
    }
    if (!this.exchangesIdsList) await this.fetchExchangesIdsList()
    if (!this.marketsList) this.fetch()
  },
  computed: {
    ...mapState('coin_info', ['exchangesIdsList', 'marketsList']),
    id() {
      return this.$route.params.id
    }
  },
  methods: {
    ...mapActions('coin_info', ['fetchExchangesIdsList', 'fetchMarketsList']),
    async fetch() {
      this.isLoading = true
      await this.fetchMarketsList([
        this.id,
        this.exchangesIdsList,
        this.pageNumber
      ])
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.markets {
  position: relative;
  min-height: vh;
}

.searcher {
  display: block;
  height: 24px;
  width: 201px;
  padding: 6px 12px;
  border: 1px solid #e7e7e7;
  border-radius: 5px;
  margin: 20px 7px 7px auto;
}

.t-header {
  display: flex;
  height: 20px;
  padding-top: 20px;
  color: #4a4a4a;
  font-size: 14px;
  font-weight: 500;
  border-bottom: 1px solid #dfdfdf;
  border-top: 1px solid #dfdfdf;

  &__index {
    width: 3%;
    margin-left: 10px;
  }
  &__exchange-name {
    width: 18%;
  }
  &__pair {
    width: 10%;
  }
  &__price {
    width: 10%;
  }
  &__spread {
    width: 10%;
  }
  &__24h-volume {
    width: 12%;
  }

  &__last-traded {
    width: 22%;
  }
  &__trust-score {
    width: 10%;
    text-align: center;
  }
}

.t-body {
  display: flex;
  align-items: center;
  color: #212529;
  height: 31px;
  border-bottom: 1px solid #dfdfdf;
  font-size: 14px;
  &__index {
    width: 3%;
    margin-left: 10px;
  }
  &__exchange-name-container {
    display: flex;
    align-items: center;
    width: 18%;
  }
  &__exchange-img {
    width: 20px;
    height: 20px;
  }
  &__exchange-link {
    font-style: 13px;
    text-decoration: none;
    margin-left: 6px;
    color: #428bca;
  }
  &__pair {
    width: 10%;
  }
  &__price {
    width: 10%;
  }
  &__trade-link {
    font-style: 13px;
    text-decoration: none;
    color: #428bca;
  }
  &__spread {
    width: 10%;
  }
  &__24h-volume {
    width: 12%;
  }
  &__last-traded {
    width: 22%;
  }
  &__trust-score {
    width: 10%;
  }
  &__trust-score-item {
    width: 10%;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin: 0 auto;
  }
}
</style>
