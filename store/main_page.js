export const state = () => ({
  coinList: null,
  pageNumber: null
})

export const mutations = {
  setCoinList(state, [data, pageNumber]) {
    state.coinList = data
    state.pageNumber = pageNumber
  }
}

export const actions = {
  async fetchCoinList({ commit }, pageNumber = 1) {
    try {
      const { data } = await this.$api.getCoinList(pageNumber)
      commit('setCoinList', [data, pageNumber])
    } catch (err) {
      return err
    }
  }
}
