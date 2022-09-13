export default {
  namespaced: true,
  
  state: () => ({
    // goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),
  
  mutations: {
    // 添加商品到购物车
    addGoodsToCart(state, goods) {
      const result = state.cart.find(item => item.goods_id === goods.goods_id)
      if(!result) {
        state.cart.push(goods)
      } else {
        result.goods_count ++
      }
      this.commit('m_cart/addToStroage')
    },
    // 持久化存储
    addToStroage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    // 修改商品的勾选状态、商品数量
    changeGoodsState(state, goods) {
      const result = state.cart.find(item => {
        return item.goods_id === goods.goods_id
      })
      result.goods_state = goods.goods_state
      result.goods_count = goods.goods_count
      this.commit('m_cart/addToStroage')
    },
    // 删除商品
    deleteCartGoods(state, goods) {
      state.cart = state.cart.filter(item => item.goods_id !== goods.goods_id )
      this.commit('m_cart/addToStroage')
    },
    // 改变所有商品的勾选状态
    changeAllGoodsState(state, bol) {
        state.cart.forEach(item => {
          item.goods_state = !bol
        })
      this.commit('m_cart/addToStroage')
    }
  },
  getters: {
    total(state) {
      let num = 0
      state.cart.forEach(item => {
        num += item.goods_count
      })
      return num
    }
  }
}