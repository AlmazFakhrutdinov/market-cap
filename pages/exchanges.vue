<template>
  <div class="exchanges">
    <input
      v-model="searcher"
      class="searcher"
      type="text"
      placeholder="Search..."
    />
    <div class="t-header">
      <div class="t-header__trust-score-rank">#</div>
      <div class="t-header__exchange-name">Exchange</div>
      <div class="t-header__country">Country</div>
      <div class="t-header__year-established">Year Established</div>
      <div class="t-header__btc-trading-volume">24h volume</div>
      <div class="t-header__btc-trading-volume-normalize">
        24h Volume (Normalize)
      </div>
      <div class="t-header__trust-score">Trust Score</div>
    </div>
    <exchanges-list-item :filtered-exchanges-list="filteredExchangesList" />
    <div v-if="modal" class="modal">No more data</div>
    <button class="loader" @click="pageNumber += 1">Show more</button>
    <button v-scroll-to="'#element'" class="scroll-to" href="#">
      <fa :icon="['fa', 'arrow-up']" />
    </button>
    <loading v-if="isLoading" :bottom="0" :top="105" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ExchangesListItem from '@/components/exchanges/ExchangesListItem'

export default {
  components: {
    ExchangesListItem
  },
  data() {
    return {
      pageNumber: 1,
      itemPerPage: 100,
      isLoading: false,
      searcher: '',
      modal: false
    }
  },
  mounted() {
    if (!this.exchangesList) {
      this.fetch()
    }
  },
  computed: {
    ...mapState('main_page', ['coinList']),
    ...mapState('exchanges', ['exchangesList']),
    filteredExchangesList() {
      return this.exchangesList
        ? this.exchangesList.filter((item) => {
            const searchItems = [
              item.id,
              item.year_established,
              item.country,
              item.trust_score,
              item.trust_score_rank,
              item.trade_volume_24h_btc,
              item.trade_volume_24h_btc_normalized
            ]
            const result = searchItems.some((item) => {
              if (!item) return false
              return item.toString().includes(this.searcher)
            })
            if (result) return item
          })
        : false
    }
  },
  methods: {
    ...mapActions('exchanges', ['fetchExhangesList']),
    async fetch() {
      this.isLoading = true
      const response = await this.fetchExhangesList([
        this.itemPerPage,
        this.pageNumber
      ])
      this.isLoading = false
      if (response.length === 0) {
        this.modal = true
        setTimeout(() => {
          this.modal = false
        }, 2000)
      }
    }
  },
  watch: {
    pageNumber() {
      this.fetch()
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
.exchanges {
  position: relative;
  height: vh;
}

.searcher {
  height: 30px;
  width: 220px;
  border: 1px solid #e7e7e7;
  border-radius: 3px;
  padding-left: 15px;
  margin-top: 20px;
  margin-left: auto;
  display: block;
  margin-right: 10px;
}

.t-header {
  display: flex;
  align-items: flex-end;
  border-top: 1px solid #e7e7e7;
  border-bottom: 1px solid #e7e7e7;
  margin-top: 10px;
  font-size: 14px;
  font-weight: 500;
  height: 50px;
  color: #4a4a4a;
  padding-bottom: 5px;
  &__trust-score-rank {
    margin-left: 5px;
    width: 5%;
  }
  &__exchange-name {
    width: 20%;
  }
  &__country {
    width: 16%;
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
    width: 10%;
    margin-left: 10px;
  }
}

.loader {
  display: flex;
  align-items: center;
  height: 30px;
  margin: 30px auto;
  padding: 0 10px;
  color: #fff;
  background-color: #7bb809;
  border: 1px solid transparent;
  border-radius: 3px;
}

.modal {
  display: flex;
  align-items: center;
  bottom: 100px;
  right: 100px;
  position: fixed;
  height: 30px;
  padding: 0 30px;
  background-color: #bd2130;
  border: 1px solid #e7e7e7;
  color: #fff;
  border-radius: 3px;
  animation: move 2s;
  @keyframes move {
    0% {
      transform: translate(0, 0);
    }

    /* Закончите все действия к этому моменту */
    80% {
      transform: translate(0, 0);
    }

    /* Между 20% и 100% ничего не происходит */
    100% {
      transform: translate(300px, 0);
    }
  }
}

.scroll-to {
  position: fixed;
  right: 30px;
  bottom: 50px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
}
</style>
