<template>
  <div class="coin-info">
    <div v-if="coin">
      <header :coin="coin" />
      <controls
        :coin-pair-name="coinPairName"
        :coin-pair-symbol="coinPairSymbol"
        :coin="coin"
        @handleCoinName="handleCoinName"
      />
      <general-info
        :coin="coin"
        :coin-pair-symbol="coinPairSymbol"
        :coin-pair-name="coinPairName"
      />

      <div
        :style="{ flexDirection: calculatorFlexDirection }"
        class="calculator"
      >
        <div ref="currentCoin" class="calculator__container">
          <span class="calculator__coin-name">{{ coin.symbol }}</span>
          <input
            v-model="convertedToCurrentCoin"
            class="calculator__input"
            type="number"
            @input="convertToCurrentCoin($event.target.value)"
          />
        </div>
        <div>
          <fa
            class="calculator__arrow"
            :icon="['fa', 'exchange-alt']"
            @click="changeCalculatorFlexDirection()"
          />
        </div>
        <div ref="currentCoinPair" class="calculator__container">
          <span class="calculator__coin-name">{{ coinPairName }}</span>
          <input
            v-model="convertedToCurrentCoinPair"
            class="calculator__input"
            type="number"
            @input="convertToCurrentCoinPair($event.target.value)"
          />
        </div>
      </div>
      <div class="coin-card">
        <div class="coin-card__tabs">
          <ui-tabs
            :current-tab="currentTab"
            :items="tabs"
            @toggleTab="toggleTab"
          ></ui-tabs>
        </div>
        <component
          :is="currentTabComponent"
          :domain-list="domainList"
          :coin-pair-symbol="coinPairSymbol"
          :coin-pair-name="coinPairName"
        ></component>
      </div>
    </div>
    <loading v-if="isLoading" :bottom="0" :top="0" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Header from '@/components/coin-info/coin-info-items/Header'
import GeneralInfo from '@/components/coin-info/coin-info-items/GeneralInfo'
import Controls from '@/components/coin-info/Controls'
import Overview from '@/components/coin-info/Overview'
import Chart from '@/components/coin-info/Chart'
import Markets from '@/components/coin-info/Markets'
import HistoricalData from '@/components/coin-info/Historical-data'
import UiTabs from '@/components/ui-components/ui-tabs'

export default {
  components: {
    Header,
    GeneralInfo,
    Controls,
    Overview,
    Chart,
    Markets,
    HistoricalData,
    UiTabs
  },
  data() {
    return {
      tabs: ['Overview', 'Markets', 'Chart', 'Historical Data'],
      currentTab: 'Overview',
      convertedToCurrentCoin: '',
      convertedToCurrentCoinPair: '',
      coinPairName: 'usd',
      coinPairSymbol: '$',
      calculatorFlexDirection: 'row',
      isLoading: false
    }
  },
  mounted() {
    if ((this.coin && this.coin.id !== this.$route.params.id) || !this.coin) {
      this.isLoading = true
    }
    this.fetchCoin(this.id)
  },
  computed: {
    ...mapState(['domainList']),
    ...mapState('main_page', ['coinList']),
    ...mapState('coin_info', ['coin']),
    id() {
      return this.$route.params.id
    },
    currentTabComponent() {
      return this.currentTab.replace(/\s/g, '-').toLowerCase()
    }
  },
  methods: {
    ...mapActions('coin_info', ['fetchCoin']),
    toggleTab(tabName) {
      this.currentTab = tabName
    },
    handleCoinName(coinId, coinSymbol) {
      this.coinPairName = coinId.toLowerCase()
      this.coinPairSymbol = coinSymbol
    },
    convertToCurrentCoin(item) {
      if (!item) return
      this.convertedToCurrentCoinPair =
        +item * this.coin.market_data.current_price[this.coinPairName]
    },
    convertToCurrentCoinPair(item) {
      if (!item) return
      this.convertedToCurrentCoin =
        +item / this.coin.market_data.current_price[this.coinPairName]
    },
    changeCalculatorFlexDirection() {
      if (this.calculatorFlexDirection === 'row') {
        this.calculatorFlexDirection = 'row-reverse'
      } else {
        this.calculatorFlexDirection = 'row'
      }
    }
  },
  watch: {
    coinPairName() {
      this.convertToCurrentCoin(this.convertedToCurrentCoin)
    },
    coin() {
      this.isLoading = false
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
.coin-info {
  position: relative;
  min-height: vh;
}

.calculator {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eee;
  height: 112px;
  margin-top: 15px;
  &__container {
    height: 66px;
    display: flex;
    align-items: center;
  }
  &__coin-name {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: #4a4a4a;
    font-weight: 500;
    text-transform: uppercase;
    font-size: 15px;
    background: #f8f8f8;
    border: 1px solid #e7e7e7;
    border-right: 0;
    width: 85px;
  }
  &__input {
    height: 100%;
    width: 189px;
    border: 1px solid #e7e7e7;
    padding: 0 10px;
  }
  &__arrow {
    width: 30px;
    height: 26px;
    margin: 0 16px;
    cursor: pointer;
  }
}

.coin-card {
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.125);
  margin-top: 20px;
  &__tabs {
    display: flex;
    align-items: flex-end;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.03);
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  }
}
</style>
