<template>
  <view class="cart" v-if="cart.length !== 0">
    <my-address></my-address>
    <!--购物车名字 -->
    <view class="cart-title">
      <uni-icons type="shop" :size="30"></uni-icons>
      <text class="cart-title-name">购物车</text>
    </view>
    <!-- 商品列表 -->
    <view class="cart-list">
      <uni-swipe-action>
        <block  v-for="(item,index) in cart" :key="item.goods_id">
        <uni-swipe-action-item :right-options="options" @click="deleteGoods(item)">
          <view class="cart-list-item">
            <!-- 商品图片 -->
            <view class="cart-list-item-image">
              <radio :checked="item.goods_state" color="#C00000" @click="chooseGoods(item)"></radio>
              <image :src="item.goods_small_logo" mode="widthFix"  @click="goToGoodsDetail(item.goods_id)"></image>
            </view>
            <!-- 商品叙述 -->
            <view class="cart-list-item-content">
              <view class="cart-list-item-content-title"  @click="goToGoodsDetail(item.goods_id)">{{item.goods_name}}</view>
              <view class="cart-list-item-content-num">
                <text>￥{{item.goods_price | tofixed}}</text>
                <uni-number-box :min="1" @change="changeValue($event, item)" :value="item.goods_count" />
              </view>
            </view>
            </view>
        </uni-swipe-action-item>
        </block>
      </uni-swipe-action>
    </view>
    <!-- 结算页面 -->
    <my-pay :isCheckedAll="isCheckedAll" @chooseOrNot="chooseOrNot" :totalCount="totalCount" :totalPay="totalPay"></my-pay>
  </view>
  <!-- 空白区域 -->
  <view class="empty" v-else>
    <image src="../../static/cart_empty@2x.png" mode="widthFix"></image>
    <text>您的心愿清单还是空的，赶紧去看看吧~</text>
  </view>
</template>

<script>
  import { mapState, mapMutations, mapGetters } from 'vuex'
  import tabge from '@/mixins/tabbar-badge.js'
  export default {
    mixins: [tabge],
    computed: {
      ...mapState('m_cart', ['cart']),
      isCheckedAll: {
        get() {
          return this.cart.every(item => item.goods_state)
        },
        set() {}
      },
      // 合计数量
      totalCount() {
        let num = 0
          const choosedGoods = this.cart.filter(item => item.goods_state)
          choosedGoods.forEach(item => {
            num += item.goods_count
          })
          return num
        },
      // 合计支付金额
      totalPay() {
        let num = 0
        const choosedGoods = this.cart.filter(item => item.goods_state)
        choosedGoods.forEach(item => {
          num += (item.goods_count * item.goods_price)
        })
        return num.toFixed(2)
      }
    },
    data() {
      return {
        options: [{
          text: '删除',
          style: {
            backgroundColor: '#C00000'
          }
        }],
      };
    },
    methods: {
      ...mapMutations('m_cart', ['changeGoodsState', 'deleteCartGoods', 'changeAllGoodsState']),
      // 是否选中商品
      chooseGoods(goods) {
        goods.goods_state = !goods.goods_state
        this.changeGoodsState(goods)
      },
      // 商品数量修改
      changeValue(e, goods) {
        console.log(this.cart)
        goods.goods_count = e
        this.changeGoodsState(goods)
      },
      // 删除商品
      deleteGoods(goods) {
        this.deleteCartGoods(goods)
      },
      // 跳转到商品详情页
      goToGoodsDetail(id) {
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?goods_id=' + id
        })
      },
      chooseOrNot() {
        this.changeAllGoodsState(this.isCheckedAll)
      }
    },
    filters: {
      tofixed(num) {
        return Number(num).toFixed(2)
      }
    }
  }
</script>

<style lang="scss">
.cart {
  &-title {
    padding: 10px 5px;
    &-name {
      margin-left: 5px;
      color: #333;
    }
  }
  &-list {
    padding-bottom: 46px;
    &-item {
      display: flex;
      border-bottom: 1px solid #ccc;
      background-color: #fff;
      padding: 10px 0;
      margin: 0 5px;
      &-image {
        width: 120px;
        height: 100px;
        display: flex;
        align-items: center;
        image {
          width: 100px;
          margin: 0 10px;
        }
      }
      &-content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        &-title {
          font-size: 12px;
        }
        &-num {
          display: flex;
          width: 100%;
          margin-right: 10px;
          justify-content: space-between;
          text {
          font-size: 16px;
          color: #C00000;
          font-weight: bold;
        }
        }
      }
    }
  }
}
.empty {
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  image {
    width: 150px;
  }
  text {
    color: #999;
    margin-top: 30px;
    font-size: 16px;
  }
}
</style>
