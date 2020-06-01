export default async function({ store, route, redirect }) {
  if (store.state.main_page.coinList) {
    return
  }
  const page = route.query.page || 1
  await store.dispatch('fetchOverallStats')
  await store.dispatch('main_page/fetchCoinList', page)
}
