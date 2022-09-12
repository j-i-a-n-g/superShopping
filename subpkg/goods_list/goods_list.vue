<template>
  <view>
    <view class="goods_list">
      <view class="goods_list-item" v-for="(item,index) in goodsList" :key="index" @click="goTogoodsDetail(item)">
        <view class="goods_list-item-image">
          <image :src="item.goods_small_logo" mode="widthFix"></image>
        </view>
        <view class="goods_list-item-content">
          <text class="goods_list-item-content-title">{{item.goods_name}}</text>
          <text class="goods_list-item-content-price">￥{{item.goods_price | tofixed}}</text>
        </view>
      </view>
    </view>
    <text class="no-more" v-show="noMore">没有更多了...</text>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        goodsList: [],
        queryObj: {
          // 查询关键词
          query: '',
          // 商品分类id
          cid: '',
          // 每页请求数
          pagesize: 20,
          pagenum: 1
        },
        total: 0,
        // 是否显示”没有更多了“
        noMore: false,
        // 是否正在请求数据
        isLoading: false
      };
    },
    onLoad(options) {
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      this.getGoodsList()
    },
    filters: {
      tofixed(num) {
        return Number(num).toFixed(2)
      }
    },
    onReachBottom() {
      if (this.goodsList.length >= this.total) {
        this.noMore = true
        return
      }
      if (!this.isLoading) {
        this.queryObj.pagenum += 1
        this.getGoodsList()
      }
    },
    // 下拉刷新事件
    onPullDownRefresh() {
      this.queryObj.pagenum = 1
      this.total = 0
      this.isLoading = false
      this.noMore = false
      this.goodsList = []
      // 重新发起数据请求
      this.getGoodsList(() => uni.stopPullDownRefresh())
    },
    methods: {
      async getGoodsList(cb) {
          this.isLoading = true
          const { data } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
            if (data.meta.status !== 200) return uni.$showMsg()
            // console.log(data.message.goods)
            this.goodsList = this.goodsList.concat(...data.message.goods)
            this.total = data.message.total
            this.pagenum = data.message.pagenum
            this.isLoading = false
            cb&&cb()
      },
      // 跳转到商品详情页
      goTogoodsDetail(item) {
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      }
    }
  }
</script>

<style lang="scss">
.goods_list {
  &-item {
    display: flex;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
    padding: 10px 0;
    margin: 0 5px;
    &-image {
      width: 100px;
      height: 100px;
      margin: 0 auto;
      image {
        width: 100px;
      }
    }
    &-content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      margin-left: 10px;
      &-title {
        font-size: 14px;
      }
      &-price {
        font-size: 16px;
        color: #C00000;
        font-weight: bold;
      }
    }
  }
}
.no-more {
  display: block;
  font-size: 14px;
  color: #999;
  line-height: 50px;
  text-align: center;
}
</style>
