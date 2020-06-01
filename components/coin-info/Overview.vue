<template>
  <div v-if="overallStats" class="overview">
    <div class="general">
      <div class="general__title">
        <p class="general__coin-name">{{ coin.name }}</p>
        <span class="general__coin-symbol">({{ coin.symbol }})</span>
      </div>
      <general-text
        :domain-list="domainList"
        :coin-pair-symbol="coinPairSymbol"
        :coin-pair-name="coinPairName"
        :coin="coin"
      />
      <percentage-table :coin="coin" />
      <div>
        <div
          v-if="fetchSentimentVotes"
          class="centiment-controls centiment-controls__response"
        >
          Thank you for your response!
        </div>
        <div v-else class="centiment-controls">
          <div class="centiment-controls__title">
            How do you feel about Bitcoin today?
          </div>
          <button
            class="centiment-controls__button centiment-controls__button_like"
            @click="fetchSentimentVotes = true"
          >
            <fa
              class="centiment-controls__icon"
              :icon="['fa', 'thumbs-up']"
              @click.stop
            />
          </button>
          <button
            class="centiment-controls__button centiment-controls__button_dislike"
            @click="fetchSentimentVotes = true"
          >
            <fa
              :icon="['fa', 'thumbs-down']"
              class="centiment-controls__icon"
              @click.stop
            />
          </button>
        </div>
        <div class="centiment-progress-bar">
          <div
            :style="{ width: coin.sentiment_votes_up_percentage + '%' }"
            class="centiment-progress-bar__up-percentage"
          >
            <span v-if="coin.sentiment_votes_up_percentage >= 10"
              >{{ coin.sentiment_votes_up_percentage }}%</span
            >
          </div>
          <div
            :style="{ width: coin.sentiment_votes_down_percentage + '%' }"
            class="centiment-progress-bar__down_percentage"
          >
            <span v-if="coin.sentiment_votes_down_percentage >= 10"
              >{{ coin.sentiment_votes_down_percentage }}%</span
            >
          </div>
        </div>
        {{ coin.market_data.sparkline_7d.price.length }}
        <chart
          v-if="timeStamp"
          :sparkline="coin.market_data.sparkline_7d.price"
          :time-stamp="timeStamp"
          :chart-data="chartData"
          class="chart"
        />
      </div>
    </div>
    <quick-stats
      class="quick-stats"
      :coin-pair-symbol="coinPairSymbol"
      :coin-pair-name="coinPairName"
      :coin="coin"
      :overall-stats="overallStats"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import QuickStats from '@/components/coin-info/overview/QuickStats'
import GeneralText from '@/components/coin-info/overview/GeneralText'
import PercentageTable from '@/components/coin-info/overview/PercentageTable'
import Chart from '@/components/Chart'

export default {
  components: {
    QuickStats,
    GeneralText,
    PercentageTable,
    Chart
  },
  props: {
    domainList: {
      type: String,
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
  data() {
    return {
      fetchSentimentVotes: false,
      timeStamp: null,
      chartData: null
    }
  },
  async mounted() {
    const { data } = await this.$api.getChartData(1570008445, 1587416400)
    this.timeStamp = data.prices.map((item) => {
      return item[0]
    })
    this.chartData = data.prices.map((item) => {
      return item[1]
    })
  },
  computed: {
    ...mapState(['overallStats']),
    ...mapState('coin_info', ['coin'])
  }
}
</script>

<style lang="scss" scoped>
.bold {
  font-weight: 500;
}

.overview {
  display: flex;
}

.general {
  padding: 20px;
  color: #4a4a4a;
  width: 68%;
  &__title {
    display: flex;
    margin-top: 10px;
    font-size: 20px;
  }
  &__coin-name {
    margin-right: 10px;
  }
  &__coin-symbol {
    text-transform: uppercase;
  }
}

.centiment-controls {
  display: flex;
  margin-top: 20px;
  &__title {
    font-size: 14px;
    margin-top: 5px;
    margin-right: 10px;
    color: #4a4a4a;
  }
  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;
    width: 90px;
    background-color: #fff;
    border: 1px solid #e7e7e7;
    outline: transparent;
    &:hover {
      border-color: #8dc647;
    }
    &:active {
      background-color: #545b62;
      border-color: #4e555b;
    }
    &_like {
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    }
    &_dislike {
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
    }
  }
  &__response {
    font-size: 14px;
    font-weight: 500;
  }
}

.centiment-progress-bar {
  display: flex;
  height: 16px;
  overflow: hidden;
  border: 1px solid transparent;
  border-radius: 5px;
  color: #ffff;
  font-size: 13px;
  margin-top: 20px;
  &__up-percentage {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #4eaf0a;
  }
  &__down_percentage {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e15241;
  }
}

.chart {
  width: 100%;
  height: 400px;
}
</style>
