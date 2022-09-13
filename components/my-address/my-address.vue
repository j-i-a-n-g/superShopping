<template>
  <view>
    <!-- 选择收获地址按钮 -->
    <view class="address-choose" v-if="JSON.stringify(address) === '{}'">
      <button type="primary" size="mini" @click="chooseAddress" class="address-choose-btn">请选择收获地址</button>
    </view>
    <!-- 收获信息展示 -->
    <view class="address-info" v-else @click="chooseAddress">
      <view class="row1">
        <view class="row1-left">
          <view class="username">收货人：{{address.userName}}</view>
        </view>
        <view class="row1-right">
          <view class="phone">电话：{{address.telNumber}}</view>
          <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>
      <view class="row2">
        <view class="row2-left">收货地址：</view>
        <view class="row2-right">{{addr}}</view>
      </view>
    </view>
    
    <image src="/static/cart_border@2x.png" class="address-border"></image>
  </view>
</template>

<script>
  import { mapMutations, mapState, mapGetters } from 'vuex'
  export default {
    name:"my-address",
    data() {
      return {
        // address: {}
      };
    },
    methods: {
      ...mapMutations('m_user', ['updateAddress']),
      async chooseAddress() {
        const [err, succ] = await uni.chooseAddress().catch(err => err)
        if (err === null && succ.errMsg === 'chooseAddress:ok') {
          console.log(succ)
          // this.address = succ
          this.updateAddress(succ)
          
        }
        // 如果用户没有授权
        if (err && err.errMsg === 'chooseAddress:fail auth deny' || err.errMsg === 'chooseAddress:fail authorize no response') {
          // 让用户重新授权
          this.reAuth()
        }
      },
      // 让用户重新授权，提供通讯地址
      async reAuth() {
        const [err2, confirmResult] = await uni.showModal({
          content: '检测到您未打开地址权限，是否设置打开？',
          confirmText: '确认',
          cancelText: '取消'
        })
        if(err2) return
        if(confirmResult.cancel) return uni.$showMsg('未授权，无法读取通讯地址')
        if(confirmResult.confirm) return uni.openSetting({
          success: (settingResult) => {
            if(!settingResult.authSetting['scope.address']) return uni.$showMsg('授权失败')
            if(settingResult.authSetting['scope.address']) return uni.$showMsg('授权成功，请选择收货地址')
          }
        })
      }
    },
    computed: {
      ...mapState('m_user', ['address']),
      ...mapGetters('m_user', ['addr'])
    }
  }
</script>

<style lang="scss">
.address-border {
  display: block;
  width: 100%;
  height: 5px;
}
.address-choose {
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.address-info {
  font-size: 12px;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5px;
  .row1 {
    display: flex;
    justify-content: space-between;
    .row1-right {
      display: flex;
      justify-content: space-between;
    }
  }
  .row2 {
    display: flex;
    // justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    .row2-left {
      white-space: nowrap;
    }
  }
}
</style>