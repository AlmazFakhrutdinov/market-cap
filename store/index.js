export const state = () => ({
  coinsId: null,
  overallStats: null,
  domainList: null
})

export const mutations = {
  setCoinsId(state, coins) {
    const coinsId = coins.map((item) => {
      return item.symbol
    })
    state.coinsId = coinsId
  },
  setOverallStats(state, data) {
    state.overallStats = data.data
  },
  setDomainList(state, data) {
    const domainList = data
      .replace(/\s/gm, '|\\.')
      .match(/(?<=UTC\|)[A-Za-z0-9.,|\s\w\\-]*(?=\|)/gm)
      .toString()
      .toLowerCase()
    state.domainList = domainList
  }
}

export const actions = {
  async fetchCoinsId({ commit }) {
    const { data } = await this.$api.getCoinsId()
    commit('setCoinsId', data)
  },
  async fetchOverallStats({ commit }) {
    const { data } = await this.$api.getOverallStats()
    commit('setOverallStats', data)
  },
  async fetchDomainList({ commit }) {
    const { data } = await this.$api.getDomainNameList()
    commit('setDomainList', data)
  }
}
