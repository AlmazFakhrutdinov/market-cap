export const state = () => ({
  coin: null,
  statusUpdates: null,
  marketsList: null,
  exchangesIdsList: null
})

export const mutations = {
  setCoin(state, coin) {
    state.coin = coin
  },
  setStatusUpdates(state, statusUpdates) {
    state.statusUpdates = statusUpdates
  },
  setMarketsList(state, marketsList) {
    state.marketsList = marketsList.tickers
  },
  setExchangesIdsList(state, exchangesIdsAndNames) {
    const exchangesIdsList = exchangesIdsAndNames.map((item) => {
      return item.id
    })
    state.exchangesIdsList = exchangesIdsList
  }
}

export const actions = {
  async fetchCoin({ commit }, id) {
    const { data } = await this.$api.getCoin(id)
    commit('setCoin', data)
  },
  async fetchStatusUpdates({ commit }) {
    const { data } = await this.$api.getStatusUpdates()
    const { status_updates: statusUpdates } = data
    commit('setStatusUpdates', statusUpdates)
  },
  async fetchMarketsList({ commit }, [coinId, exchangesIdsList, pageNumber]) {
    const { data } = await this.$api.getMarketsList(
      coinId,
      exchangesIdsList,
      pageNumber
    )
    commit('setMarketsList', data)
  },
  async fetchExchangesIdsList({ commit }) {
    const { data } = await this.$api.getExchangesIdsList()
    const filteredExchangesIdsList = data.filter((item, index) => {
      if (index % 6 === 0) {
        return item
      }
    })
    commit('setExchangesIdsList', filteredExchangesIdsList)
  }
}
