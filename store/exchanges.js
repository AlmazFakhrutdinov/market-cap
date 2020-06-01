export const state = () => ({
  exchangesList: null
})

export const mutations = {
  setExchangesList(state, exchangesList) {
    if (state.exchangesList) {
      state.exchangesList = state.exchangesList.concat(exchangesList)
    } else {
      state.exchangesList = exchangesList
    }
  }
}

export const actions = {
  async fetchExhangesList({ commit }, [itemPerPage, pageNumber]) {
    const { data } = await this.$api.getExchagesList(itemPerPage, pageNumber)
    commit('setExchangesList', data)
    return data
  }
}
