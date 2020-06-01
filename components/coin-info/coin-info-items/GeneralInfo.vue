<template>
  <div class="general-information">
    <ul class="resurses-list">
      <li class="resourses-list__item">
        <div class="resourses-list__title">
          Market Cap
        </div>
        <div class="resourses-list__tag resourses-list__tag-rank">
          <span>Rank #{{ coin.market_cap_rank }}</span>
        </div>
      </li>
      <li class="resourses-list__item">
        <div class="resourses-list__title">
          Website
        </div>
        <ui-tags
          class="resourses-list__tag"
          :items="coin.links.homepage"
        ></ui-tags>
      </li>
      <li class="resourses-list__item">
        <div class="resourses-list__title">
          Explorers
        </div>
        <ui-tags
          class="resourses-list__tag"
          :items="coin.links.blockchain_site"
        ></ui-tags>
      </li>
      <li class="resourses-list__item">
        <div class="resourses-list__title">
          Community
        </div>
        <ui-tags
          class="resourses-list__tag"
          :items="coin.links.official_forum_url"
        ></ui-tags>
      </li>
      <li class="resourses-list__item">
        <div class="resourses-list__title">
          Source Code
        </div>
        <ui-tags
          class="resourses-list__tag"
          :items="[...coin.links.repos_url.github[0]]"
        ></ui-tags>
      </li>
    </ul>
    <div class="coin-stats">
      <div class="coin-stats__container">
        <p class="coin-stats__title">Market Cap</p>
        <p class="coin-stats__item">
          {{ coinPairSymbol }}
          {{ coin.market_data.market_cap[coinPairName] | toLocaleString() }}
        </p>
      </div>

      <div class="coin-stats__container">
        <p class="coin-stats__title">24 Hour Trading Vol</p>
        <p class="coin-stats__item">
          {{ coinPairSymbol }}
          {{ coin.market_data.total_volume[coinPairName] | toLocaleString() }}
        </p>
      </div>

      <div class="coin-stats__container">
        <p class="coin-stats__title">24h Low / 24h High</p>
        <p class="coin-stats__item">
          {{ coinPairSymbol }}
          {{ coin.market_data.high_24h[coinPairName] | toLocaleString() }}
          /
          {{ coinPairSymbol }}
          {{ coin.market_data.low_24h[coinPairName] | toLocaleString() }}
        </p>
      </div>

      <div class="coin-stats__container">
        <p class="coin-stats__title">Circulating Supply</p>
        <p class="coin-stats__item">
          {{ coin.market_data.total_supply | toLocaleString() }}
          /
          {{ coin.market_data.circulating_supply | toLocaleString() }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import UiTags from '@/components/ui-components/ui-tags'

export default {
  components: {
    UiTags
  },
  filters: {
    toLocaleString(item) {
      if (item) return item.toLocaleString()
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
  }
}
</script>

<style lang="scss" scoped>
.general-information {
  display: flex;
  margin-top: 15px;
  width: 100%;
}

.resourses-list {
  display: flex;
  flex-direction: column;
  width: 65%;
  &__item {
    display: flex;
    font-size: 13px;
    min-height: 30px;
  }
  &__title {
    display: flex;
    align-items: center;
    color: #4a4a4a;
    width: 100px;
    min-width: 100px;
    height: 30px;
  }
  &__tag {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    // justify-content: center;
    // height: 30;
  }
  &__tag-rank {
    height: 25px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    background-color: #343a40;
    color: #fff;
    font-weight: 500;
  }
}

.coin-stats {
  display: flex;
  flex-wrap: wrap;
  margin-left: auto;
  height: 90px;
  width: 40%;
  &__container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 50%;
    height: 40px;
    margin-bottom: 16px;
    color: #4a4a4a;
  }
  &__title {
    font-size: 14px;
    font-weight: 500;
  }
  &__item {
    font-size: 14px;
    margin-top: 10px;
  }
}
</style>
