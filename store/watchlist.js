export const state = () => ({
  watchListCoinList: null,
  coinsId: null
})

export const mutations = {
  setCoinList(state, coinList) {
    state.watchListCoinList = coinList
  },
  removeCoin(state, coinId) {
    state.watchListCoinList = state.watchListCoinList.filter((item) => {
      return item.id !== coinId
    })
  }
}

export const actions = {
  async fetchCoinList({ commit }, coinsId) {
    const { data } = await this.$api.getCoinListById(coinsId)
    commit('setCoinList', data)
  }
}
