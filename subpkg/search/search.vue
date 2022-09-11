<template>
  <view>
    <view class="search-box">
    <uni-search-bar radius="20" cancelButton="none" placeholder="请输入搜索内容" @confirm="search" @input="input" @clear="clear" ></uni-search-bar>
    </view>
    <view class="search-list">
      <block v-if="searchResultList.length !== 0">
      <view class="search-list-item" v-for="(item, index) in searchResultList" :key="item.goods_id" @click="goToGoodsDetail(item.goods_id)">
        <text class="search-list-item-name">{{item.goods_name}}</text>
        <uni-icons type="forward" size="24"></uni-icons>
      </view>
      </block>
      <view class="search-list-none" v-show="showNone">暂无数据</view>
    </view>
    <!-- 搜索历史 -->
    <view class="search-history" v-if="!searchResultList.length && !showNone">
      <view class="search-history-title">
        <text class="search-history-title-text">搜索历史</text>
        <uni-icons type="trash-filled" size="24" @click="clearSearchHistory"></uni-icons>
      </view>
      <view class="search-history-list">
        <view class="search-history-list-content" v-for="(item, index) in historyList" :key="index" @click="goToGoodsList(item)">{{item}}</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        searchResultList: [],
        historyList: [],
        timer: null,
        // 是否展示暂无数据
        showNone: false
      };
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('sh')  || '[]')
    },
    methods: {
      search(e) {
        console.log(e, 11)
      },
      input(e) {
        clearTimeout(this.timer)
        this.timer = setTimeout(async () => {
          this.searchResultList = []
          if (!e.trim()) return this.showNone = false
          this.saveSearchHistory(e)
          const { data } = await uni.$http.get('/api/public/v1/goods/qsearch?query=' + e)
          if (data.meta.status !== 200) return uni.$showMsg()
          if (data.message.length === 0) return this.showNone = true
          this.searchResultList = data.message
          this.showNone = false
        }, 500)
      },
     // 清除内容
     clear() {
       this.searchResultList = []
       this.showNone = false
     },
     // 跳转到商品详情页面
     goToGoodsDetail(id) {
       uni.navigateTo({
         url:'/subpkg/goods_detail/goods_detail?goods_id=' + id
       })
     },
     // 保存历史搜索数据
     saveSearchHistory(val) {
       this.historyList = this.historyList.filter(item => {
         return item !== val
       })
       // 搜索历史最多只能保留15条
       if (this.historyList.length >= 15) return this.historyList.pop()
       this.historyList.unshift(val)
       // 将历史记录存储到本地中
       uni.setStorageSync('sh',JSON.stringify(this.historyList))
       
       // 使用Set数据类型, 使用 该方法还需在computed中，用到数组reverse方法，
       // const set = new Set(this.historyList)
       // set.delete(val)
       // set.add(val)
     },
     // 清空历史记录
     clearSearchHistory() {
       this.historyList = [],
       uni.setStorageSync('sh', '[]')
     },
     // 点击历史记录的item, 跳转到商品列表中
     goToGoodsList(item) {
       uni.navigateTo({
         url: '/subpkg/goods_list/goods_list?query=' + item
       })
     }
    }
  }
</script>

<style lang="scss">
.search-box {
  background-color: #C00000;
  padding: 5rpx;
  position: sticky;
  top: 0;
  z-index: 999;
}
.search-list {
  display: flex;
  flex-direction: column;
  &-item {
    display: flex;
    height: 30px;
    width: 100%;
    border-bottom: 1px solid #999;
    padding: 10px;
    &-name {
      width: 90%;
      font-size: 16px;
      line-height: 30px;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
  }
  &-none {
    height: 50px;
    width: 100%;
    font-size: 16px;
    color: #999;
    text-align: center;
    line-height: 50px;
    margin-top: 30px;
  }
}
.search-history {
  &-title {
    display: flex;
    justify-content: space-between;
    margin: 0 10px;
    height: 50px;
    border-bottom: 1px solid #999;
    text {
      font-size: 16px;
      line-height: 50px;
    }
  }
  &-list {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    &-content {
      display: block;
      background-color: #ccc;
      color: #333;
      padding: 10px 20px;
      font-size: 16px;
      margin-left: 10px;
      margin-bottom: 10px;
    }
  }
}
</style>
