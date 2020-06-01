<template>
  <div class="controls">
    <div v-click-outside="outside" class="dropdown" @click="inside">
      <button class="dropdown__button">
        <span>{{ coinPairName }}</span>
        <fa class="dropdown__icon" :icon="['fa', 'angle-down']" />
      </button>
      <div v-if="isDropDownExpanded" class="dropdown__content">
        <p class="dropdown__title">Cryptocurrencies</p>
        <div class="dropdown__items">
          <div
            v-for="item in coinsSymbolAndName"
            :key="item.symbol"
            class="dropdown__item item"
            @click="$emit('handleCoinName', item.id, item.symbol)"
          >
            <p class="item__title">{{ item.id }}</p>
            <p class="item__text">{{ item.name }}</p>
          </div>
        </div>
        <p class="dropdown__title">Suggested Currencies</p>
        <div class="dropdown__items">
          <div
            v-for="item in fiatMoneySymbolAndName"
            :key="item.symbol"
            class="dropdown__item item"
            @click="$emit('handleCoinName', item.id, item.symbol)"
          >
            <p class="item__title">{{ item.id }}</p>
            <p class="item__text">{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>

    <ui-dropdown
      v-for="dropDownContent in dropDownContents"
      :key="dropDownContent.dropDownText"
      :drop-down-content="dropDownContent"
    >
    </ui-dropdown>
  </div>
</template>

<script>
import uiDropdown from '../ui-components/ui-dropdown'
export default {
  components: { uiDropdown },
  props: {
    coin: {
      type: Object,
      required: true
    },
    coinPairName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      coinsSymbolAndName: [
        {
          id: 'BTC',
          name: 'Bitcoin',
          symbol: 'BTC'
        },
        {
          id: 'ETH',
          name: 'Ether',
          symbol: 'ETH'
        },
        {
          id: 'LTC',
          name: 'Litcecoin',
          symbol: 'LTC'
        },
        {
          id: 'BCH',
          name: 'Bitcoin Cash',
          symbol: 'BCH'
        },
        {
          id: 'BNB',
          name: 'Binance Coin',
          symbol: 'BNB'
        },
        {
          id: 'EOS',
          name: 'EOS',
          symbol: 'EOS'
        },
        {
          id: 'XRP',
          name: 'XRP',
          symbol: 'XRP'
        },
        {
          id: 'XLM',
          name: 'Lumens',
          symbol: 'XLM'
        }
      ],
      fiatMoneySymbolAndName: [
        {
          id: 'USD',
          name: 'US Dollar',
          symbol: '$'
        },
        {
          id: 'IDR',
          name: 'Indonesian Rupiah',
          symbol: 'IDR'
        },
        {
          id: 'TWD',
          name: 'New Taiwan Dollar',
          symbol: 'NT$'
        },
        {
          id: 'EUR',
          name: 'Euro',
          symbol: '€'
        },
        {
          id: 'KRW',
          name: 'South Korean Won',
          symbol: '₩'
        },
        {
          id: 'JPY',
          name: 'Japanese Yen',
          symbol: '¥'
        },
        {
          id: 'RUB',
          name: 'Russian Ruble',
          symbol: 'RUB'
        },
        {
          id: 'CNY',
          name: 'Chinese Yuan',
          symbol: 'CN¥'
        }
      ],
      dropDownContents: [
        {
          buttonText: 'Buy / Sell',
          dropDownItem: [
            {
              icon:
                'https://static.coingecko.com/s/etoro-99237c95c3754605c1c631c496da514fdef132e165b0dba4bc5d49dba90398d9.png',
              text:
                'Trade on the world&prime;s leading social trading platform (Highly volatile investment product. Your capital is at risk)',
              hrefText: 'eToro',
              href: 'https://bit.ly/2OVMm37'
            },
            {
              icon:
                'https://static.coingecko.com/s/crypto_dot_com-c42cd0f80bb6c1753bc16581a73e34f87776d840c522a0a3b5cce9fd9da131d8.png',
              text:
                'Buy, Sell, Earn in One Place. Buy Crypto Instantly and Securely at True Cost with USD, EUR, AUD, GPB, and More',
              hrefText: 'crypto.com',
              href: 'https://bit.ly/3a5U9lu'
            }
          ]
        },
        {
          buttonText: 'Long / Short',
          dropDownItem: [
            {
              icon:
                'https://static.coingecko.com/s/FTX-83282819516f0d86de229e361ec11f1f5c5c75abde23b541a59fc3b202df656c.jpg',
              text:
                'Built by traders, for traders. Collateralize with USD, BTC, ETH, USDT, BNB, or FTT to trade perpetual, quarterly, index, and volatility futures on one of the world’s most liquid crypto derivative exchanges. Low fees and unique products to trade!',
              hrefText: 'FTX',
              href: 'https://bit.ly/2MgqSLd'
            },
            {
              icon:
                'https://static.coingecko.com/s/okex_150x150_logo-27bdfb762d263423a7ac6ba142af62b2d8a229c3059bed016fb8a8cf9e1d08dc.png',
              text:
                'World&prime;s largest BTC futures exchange platform with industry-leading security, high liquidity, and competitive rates. Supporting 145+ coins and 200+ futures/option pairs, up to 100x leverage, exclusive VIP support and competitive trading fee.',
              hrefText: 'OKEx: NO.1 Futures Exchange',
              href: 'https://bit.ly/2yvEKgB'
            }
          ]
        },
        {
          buttonText: 'Earn / Loan',
          dropDownItem: [
            {
              icon:
                'https://static.coingecko.com/s/nexo_20-cc49f1b3e578dcb4c7602f9cf9bb6d397e4cd855774b3269da447ae344f453b3.png',
              text:
                'Instant Crypto Credit Lines™ from only 5.9% APR - unlock your crypto-wealth tax-efficiently, without selling it. Earn up to 8% interest per year on your Stablecoins, USD, EUR & GBP. $100 million custodial insurance.',
              hrefText: 'Nexo - Better Than Any Bank Account',
              href: 'https://bit.ly/2TkepHH'
            }
          ]
        }
      ],
      isDropDownExpanded: false
    }
  },
  methods: {
    outside() {
      this.isDropDownExpanded = false
    },
    inside() {
      this.isDropDownExpanded = !this.isDropDownExpanded
    }
  }
}
</script>

<style lang="scss" scoped>
.controls {
  margin-top: 20px;
  display: flex;
  &:focus {
    outline: 1px solid red;
  }
}

.dropdown {
  display: flex;
  height: 34px;
  position: relative;
  &__button {
    margin-right: 20px;
    display: flex;
    align-items: center;
    border: none;
    background-color: #7ab52b;
    border-radius: 3px;
    padding: 0 20px;
    text-transform: uppercase;
    color: #fff;
    font-size: 16px;
    transition: 0.2s;
    &:hover {
      color: #4a4a4a;
    }
  }
  &__icon {
    margin-left: 5px;
  }
  &__content {
    position: absolute;
    width: 650px;
    top: 40px;
    left: 0;
    border-radius: 5px;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.15);
  }
  &__title {
    margin: 15px 0px 10px 15px;
    font-size: 14px;
    font-weight: 500;
    color: #4a4a4a;
  }
  &__items {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
  }
  &__item {
    display: flex;
    align-items: center;
    height: 40px;
    width: 33.33%;
    font-size: 14px;
    cursor: pointer;
  }
}

.item {
  &__title {
    margin: 0 15px;
    color: #bebebe;
  }
  &:hover {
    background-color: #f8f8f8;
  }
  &__text {
    color: #4a4a4a;
  }
}

.item:hover .item__text {
  color: #8dc647;
}
</style>
