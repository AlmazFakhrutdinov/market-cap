<template>
  <div class="t-body">
    <div
      v-for="item in filteredExchangesList"
      :key="item.img"
      class="t-body__item"
    >
      <div class="t-body__trust-score-rank">
        {{ item.trust_score_rank }}
      </div>
      <div class="t-body__exchange-name">
        <img class="t-body__exchange-img" :src="item.image" alt="exchange" />
        <a class="t-body__exchange-link" :href="item.url">
          {{ item.name }}
        </a>
      </div>
      <div class="t-body__country">
        <a class="t-body__country-link" href="">{{ item.country }}</a>
      </div>
      <div class="t-body__year-established">
        {{ item.year_established }}
      </div>
      <div class="t-body__btc-trading-volume">
        BTC
        {{ item.trade_volume_24h_btc | removeTheFractionalPartAndPutCommas }}
      </div>
      <div class="t-body__btc-trading-volume-normalize">
        BTC
        {{
          item.trade_volume_24h_btc_normalized
            | removeTheFractionalPartAndPutCommas
        }}
      </div>
      <div class="t-body__trust-score">
        <div class="t-body__progress-bar">
          <div
            :style="{ width: item.trust_score + '0' + '%' }"
            class="t-body__progress-item"
          ></div>
        </div>
        <div class="t-body__trust-score-number">
          {{ item.trust_score }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    removeTheFractionalPartAndPutCommas(item) {
      if (!item) return '?'
      return Math.trunc(item).toLocaleString()
    }
  },
  props: {
    filteredExchangesList: {
      type: Array
    }
  }
}
</script>

<style lang="scss" scoped>
.t-body {
  font-size: 15px;
  &__item {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e7e7e7;
    height: 28px;
    display: flex;
  }
  &__trust-score-rank {
    margin-left: 5px;
    width: 5%;
  }
  &__exchange-name {
    width: 20%;
  }
  &__exchange-img {
    height: 20px;
    width: 20px;
  }
  &__exchange-link {
    text-decoration: none;
    color: #428bca;
  }
  &__country {
    width: 16%;
  }
  &__country-link {
    text-decoration: none;
    color: #428bca;
  }
  &__year-established {
    width: 12%;
  }
  &__btc-trading-volume {
    display: flex;
    justify-content: flex-end;
    width: 10%;
  }
  &__btc-trading-volume-normalize {
    display: flex;
    justify-content: flex-end;
    width: 19%;
  }
  &__trust-score {
    display: flex;
    align-items: center;
    width: 12%;
    margin-left: 10px;
  }
  &__trust-score-number {
    width: 10%;
  }
  &__progress-bar {
    width: 90%;
    height: 10px;
    margin-right: 5px;
    border: 1px solid transparent;
    border-radius: 3px;
    background-color: #eee;
    overflow: hidden;
  }
  &__progress-item {
    height: 10px;
    background-color: #7bb809;
  }
}
</style>
