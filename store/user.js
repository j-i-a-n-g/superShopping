export default {
  namespaced: true,
  state: () => ({
    address: JSON.parse(uni.getStorageSync('addr') || '{}')
  }),
  mutations: {
    updateAddress(state, address) {
      state.address = address
      this.commit('m_user/saveAddressToStorage')
    },
    // 持久化存储
    saveAddressToStorage(state) {
      uni.setStorageSync('addr', JSON.stringify(state.address))
    }
  },
  getters: {
    addr(state) {
      if (!state.address.provinceName) return ''
      return state.address.provinceName + ' ' + state.address.cityName + ' ' + state.address.countyName+ ' ' + state.address.detailInfo
    }
  }
}