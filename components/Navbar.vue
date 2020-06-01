<template>
  <div>
    <nav id="element" class="navbar">
      <a v-cloak href="/" class="navbar__brand">
        <img
          class="navbar__img"
          src="https://static.coingecko.com/s/coingecko-logo-d13d6bcceddbb003f146b33c2f7e8193d72b93bb343d38e392897c3df3e78bdd.png"
          alt="brand"
        />
      </a>

      <div class="navbar__links">
        <nuxt-link
          :to="{ path: '/', query: { page: pageNumber || 1 } }"
          class="navbar__item"
        >
          Coin List
        </nuxt-link>
        <nuxt-link :to="{ path: '/exchanges' }" class="navbar__item">
          Exchanges
        </nuxt-link>

        <nuxt-link :to="{ path: '/watchlist' }" class="navbar__item">
          Watchlist
        </nuxt-link>

        <div
          class="navbar__item"
          @mouseover="isResources = true"
          @mouseleave="isResources = false"
        >
          Resources
          <div v-show="isResources" class="navbar__dropdown">
            <a
              href="https://www.coingecko.com/en/api"
              class="navbar__dropdown-item"
              >API</a
            >
            <a
              href="https://reports.coingecko.com/all-reports"
              class="navbar__dropdown-item"
              >Reports</a
            >
            <a
              href="https://newsletter.coingecko.com/landing/subscribe"
              class="navbar__dropdown-item"
              >Newsletter</a
            >
            <a
              href="https://www.coingecko.com/en/events"
              class="navbar__dropdown-item"
              >Events Calendar</a
            >
            <a
              href="https://www.coingecko.com/en/methodology"
              class="navbar__dropdown-item"
              >Methodology</a
            >
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSc4S3p2MzLLgQ5HKwXQ1qvufLvE8VdWIFy5ZmgQ2KQCGuqFoA/viewform"
              class="navbar__dropdown-item"
              >Request Form</a
            >
          </div>
        </div>
        <div
          class="navbar__item"
          @mouseover="isCommunity = true"
          @mouseleave="isCommunity = false"
        >
          Community
          <div v-show="isCommunity" class="navbar__dropdown">
            <a
              href="https://www.facebook.com/coingecko"
              class="navbar__dropdown-item"
            >
              <fa
                class="navbar__icon"
                :icon="['fab', 'facebook']"
                @click.stop
              />Facebook</a
            >
            <a
              href="https://twitter.com/coingecko"
              class="navbar__dropdown-item"
            >
              <fa class="navbar__icon" :icon="['fab', 'twitter']" @click.stop />

              Twitter</a
            >
            <a
              href="https://www.instagram.com/coingecko/"
              class="navbar__dropdown-item"
            >
              <fa
                class="navbar__icon"
                :icon="['fab', 'instagram']"
                @click.stop
              />

              Instagram</a
            >
            <a href="https://t.me/coingecko" class="navbar__dropdown-item">
              <fa
                class="navbar__icon"
                :icon="['fab', 'telegram']"
                @click.stop
              />

              Telegram Official</a
            >
            <a href="https://t.me/coingeckonews" class="navbar__dropdown-item">
              <fa
                class="navbar__icon"
                :icon="['fab', 'telegram']"
                @click.stop
              />

              Telegram News</a
            >
            <a
              href="https://discordapp.com/invite/EhrkaCH"
              class="navbar__dropdown-item"
            >
              <fa class="navbar__icon" :icon="['fab', 'discord']" @click.stop />

              Discord</a
            >
            <a
              href="https://bitcointalk.org/index.php?topic=561516.0"
              class="navbar__dropdown-item"
            >
              <fa class="navbar__icon" :icon="['fab', 'btc']" @click.stop />

              Bitcoin Talk</a
            >
          </div>
        </div>
      </div>
      <div class="navbar-searcher">
        <!-- <searcher class="navbar-searcher__item" :coins-id="coinsId" /> -->
      </div>
    </nav>

    <div v-if="overallStats" class="overall-stats">
      <div class="overall-stats__container">
        <div class="overall-stats__title">Coins:</div>
        <nuxt-link
          :to="{ path: '/' }"
          class="overall-stats__item overall-stats__item_cyan"
        >
          {{ overallStats.active_cryptocurrencies }}
        </nuxt-link>
      </div>
      <div class="overall-stats__container">
        <div class="overall-stats__title">Exchanges:</div>
        <nuxt-link
          :to="{ path: '/exchanges' }"
          class="overall-stats__item overall-stats__item_cyan"
        >
          {{ overallStats.markets }}
        </nuxt-link>
      </div>
      <div class="overall-stats__container">
        <div class="overall-stats__title">Market Cap:</div>
        <a
          href="https://www.coingecko.com/en/global_charts"
          class="overall-stats__item overall-stats__item_cyan"
        >
          ${{ overallStats.total_market_cap.usd | removeFractionalPart }}
        </a>
        <div
          class="overall-stats__item"
          :style="{
            color:
              isPositivePercentage(
                overallStats.market_cap_change_percentage_24h_usd
              ) === false
                ? '#e15241'
                : '#4eaf0a'
          }"
        >
          {{ overallStats.market_cap_change_percentage_24h_usd.toFixed(2) }}
          <fa
            v-if="
              isPositivePercentage(
                overallStats.market_cap_change_percentage_24h_usd
              )
            "
            class="overall-stats__icon"
            :icon="['fa', 'level-up-alt']"
          />
          <fa
            v-else
            class="overall-stats__icon"
            :icon="['fa', 'level-down-alt']"
          />
        </div>
      </div>
      <div class="overall-stats__container">
        <div class="overall-stats__title">24 Vol:</div>
        <a
          href="https://www.coingecko.com/en/global_charts"
          class="overall-stats__item overall-stats__item_cyan"
          >${{ overallStats.total_volume.usd | removeFractionalPart }}</a
        >
      </div>
      <div class="overall-stats__container">
        <div class="overall-stats__title">Dominance:</div>
        <div class="overall-stats__item overall-stats_uppercase">
          btc {{ overallStats.market_cap_percentage.btc.toFixed(2) }} % eth
          {{ overallStats.market_cap_percentage.eth.toFixed(2) }}% xrp
          {{ overallStats.market_cap_percentage.xrp.toFixed(2) }} %
        </div>
      </div>
    </div>

    <div class="advertising">
      <img
        class="advertising__img"
        src="https://tpc.googlesyndication.com/simgad/681020113824114053"
        alt="advertising"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
// import Searcher from '../components/Searcher'

export default {
  filters: {
    removeFractionalPart(item) {
      return Math.trunc(item).toLocaleString()
    }
  },
  // components: { Searcher },
  data() {
    return {
      isResources: false,
      isCommunity: false
    }
  },
  computed: {
    ...mapState(['coinsId', 'overallStats']),
    ...mapState('main_page', ['pageNumber'])
  },
  mounted() {
    if (!this.overallStats) {
      this.fetchOverallStats()
    }
    this.fetchDomainList()
  },
  methods: {
    ...mapActions(['fetchCoinsId', 'fetchOverallStats', 'fetchDomainList']),
    isPositivePercentage(item) {
      const signOfNumber = Math.sign(parseInt(item))
      // eslint-disable-next-line no-compare-neg-zero
      if (signOfNumber === -1 || signOfNumber === -0) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  height: 60px;
  margin-top: 10px;
  &__links {
    display: flex;
  }
  &__img {
    width: 140px;
    height: 39px;
    margin-top: -3px;
    border: none;
    color: #7ab52b;
  }
  &__item {
    height: 30px;
    display: flex;
    align-items: center;
    font-size: 14px;
    margin: 0 10px;
    text-decoration: none;
    color: #4a4a4a;
    transition: 0.3s;
    position: relative;
    &:hover {
      color: #8dc647;
      cursor: pointer;
    }
  }
  &__searcher {
    margin-left: auto;
    display: flex;
    align-items: center;
  }
  &__dropdown {
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 0;
    top: 30px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    background-color: #fff;
    padding: 8px 0;
    border-radius: 5px;
  }
  &__dropdown-item {
    display: flex;
    align-items: center;
    padding: 0px 25px;
    height: 30px;
    font-size: 14px;
    color: #4a4a4a;
    text-decoration: none;
    white-space: nowrap;
    &:hover {
      background-color: #f8f9fa;
    }
  }
  &__icon {
    width: 20px;
    height: 20px;
    margin: 5px;
  }
}

.advertising {
  padding: 25px;
  display: flex;
  justify-content: center;
}

.overall-stats {
  display: flex;
  height: 50px;
  margin-top: 10px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  &__container {
    display: flex;
    align-items: center;
    margin-right: 15px;
  }
  &__title {
    font-size: 13px;
    font-weight: 500;
  }
  &__item {
    font-size: 13px;
    margin-left: 5px;
    text-decoration: none;
    transition: 0.2s;
    // height: 13px;
    // line-height: 13px;
    &_cyan {
      color: #00bbd4;
    }
    &_cyan:hover {
      color: #8dc647;
    }
  }
  &_uppercase {
    text-transform: uppercase;
  }
}
</style>
