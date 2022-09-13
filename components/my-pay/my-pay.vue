<template>
  <view class="my-pay">
    <view class="my-pay-all">
      <radio :checked="isCheckedAll" color="#C00000" @click="chooseAllOrNot"></radio>
      <view>全选</view>
    </view>
    <view class="my-pay-total">
      <view class="my-pay-total-title">合计：</view>
      <text>￥{{totalPay}}</text>
    </view>
    <button size="default">数量（{{totalCount}}）</button>
  </view>
</template>

<script>
  export default {
    name:"my-pay",
    props: {
      // 是否全选
      isCheckedAll: {
        type: Boolean,
        default: true
      },
      // 商品总价格
      totalPay: {
        type: String,
        default: '0.00'
      },
      // 商品总数
      totalCount: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        
      };
    },
    methods: {
      // 是否选择全部
      chooseAllOrNot() {
        this.$emit('chooseOrNot')
      }
    }
  }
</script>

<style lang="scss">
.my-pay {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  padding:0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  &-all {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
  }
  &-total {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    &-title {
      font-size: 14px;
    }
    text {
      color: #C00000;
      font-size: 16px;
    }
  }
  button {
    margin: 0;
    background-color: #C00000;
    color: #fff;
  }
}
</style>