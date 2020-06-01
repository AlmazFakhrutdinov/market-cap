import axios from 'axios'

const url = {
  coinList(pageNumber) {
    return `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${pageNumber}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
  },
  coinListById(coinsId) {
    return `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinsId}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
  },
  coinsId() {
    return 'https://api.coingecko.com/api/v3/coins/list'
  },
  coin(id) {
    return `https://api.coingecko.com/api/v3/coins/${id}?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`
  },
  overallStats() {
    return 'https://api.coingecko.com/api/v3/global'
  },
  proxyUrl() {
    return 'https://cors-anywhere.herokuapp.com/'
  },
  exchangesList(itemPerPage, pageNumber) {
    return `https://api.coingecko.com/api/v3/exchanges?per_page=${itemPerPage}&page=${pageNumber}`
  },
  statusUpdates() {
    return 'https://api.coingecko.com/api/v3/status_updates'
  },
  marketsList(coinId, exchangesIdsList, pageNumber) {
    const url = new URL(
      `https://api.coingecko.com/api/v3/coins/${coinId}/tickers`
    )
    url.searchParams.set('exchanges_ids', exchangesIdsList.toString())
    url.searchParams.set('include_exchange_logo', true)
    url.searchParams.set('page', pageNumber.toString())
    return url
  },
  exchangesIdsList() {
    return 'https://api.coingecko.com/api/v3/exchanges/list'
  },
  sentimentVotes(vote) {
    return `https://www.coingecko.com/en/sentiment_votes?coin_id=279&sentiment=${vote}`
  },
  chartData(dateFrom, dateTo) {
    return `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=${dateFrom}&to=${dateTo}`
  },
  domainList() {
    return 'http://data.iana.org/TLD/tlds-alpha-by-domain.txt'
  }
}

const api = {
  getCoinList(pageNumber) {
    const CancelToken = axios.CancelToken
    if (this.source) {
      this.source.cancel('cancel')
    }
    this.source = CancelToken.source()

    return axios.get(url.coinList(pageNumber), {
      cancelToken: this.source.token
    })
  },
  getCoinListById(coinsId) {
    return axios.get(url.coinListById(coinsId))
  },
  getCoinsId() {
    return axios.get(url.coinsId())
  },
  getCoin(id) {
    return axios.get(url.coin(id))
  },
  getOverallStats() {
    return axios.get(url.overallStats())
  },
  getExchagesList(itemPerPage, pageNumber) {
    return axios.get(url.exchangesList(itemPerPage, pageNumber))
  },
  getStatusUpdates() {
    return axios.get(url.statusUpdates())
  },
  getMarketsList(coinId, exchangesIdsList, pageNumber) {
    return axios.get(url.marketsList(coinId, exchangesIdsList, pageNumber))
  },
  getExchangesIdsList() {
    return axios.get(url.exchangesIdsList())
  },
  getChartData(dateFrom, dateTo) {
    return axios.get(url.chartData(dateFrom, dateTo))
  },
  getTest() {
    const CancelToken = axios.CancelToken
    if (this.source) {
      this.source.cancel('cancel')
    }
    this.source = CancelToken.source()

    return axios
      .get('https://api.coingecko.com/api/v3/ping', {
        cancelToken: this.source.token
      })
      .catch(function(thrown) {
        if (axios.isCancel(thrown)) {
          console.log('Request canceled', thrown.message)
        } else {
          // handle error
        }
      })
  },
  getDomainNameList() {
    return axios.get(url.domainList())
  }
}

export default api
