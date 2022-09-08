<template>
  <view>
    <!-- 轮播图 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="1000" circular="true" indicator-color="#999" indicator-active-color="white">
      <swiper-item v-for="(item, index) in swiperList" :key="index">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
          <image :src="item.image_src" mode=""></image>
        </navigator>
      </swiper-item>
    </swiper>
  <!-- 分类列表 -->
  <view class="nav">
    <view class="nav-item" v-for="(item, index) in navList" :key=index @click="navClickHandler(item)">
      <image :src="item.image_src" mode=""></image>
    </view>
  </view>
  <!-- 楼层展示 -->
  <view class="floor">
    <view class="floor-item" v-for="(item, index) in floorList" :key="index">
      <!-- 标题 -->
      <image class="floor-item-title" :src="item.floor_title.image_src" alt="">
        <!-- 图片布局 -->
      <view class="floor-item-image">
        <!-- 左侧大图 -->
        <navigator class="floor-item-image-left" :url = "item.product_list[0].url">
          <image :style="{width: item.product_list[0].image_width + 'rpx'}" :src="item.product_list[0].image_src" mode="widthFix"></image>
        </navigator>
        <!-- 右侧图片 -->
        <view class="floor-item-image-right">
          <view v-for="(item2, j) in item.product_list" :key="j">
            <navigator  v-if="j !== 0" :url = "item2.url">
              <image :src="item2.image_src" :style="{width: item2.image_width + 'rpx'}" mode="widthFix"></image>
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        swiperList: [],
        navList: [],
        floorList: []
      };
    },
    onLoad() {
      this.getSwiperList()
      this.getNavList()
      this.getFloorList()
    },
    methods: {
      // 获取轮播图数据
      async getSwiperList() {
        const { data } = await uni.$http.get('/api/public/v1/home/swiperdata')
        if(data.meta.status !== 200) {
          return uni.$showMsg()
        }
        this.swiperList = data.message
      },
     // 获取分类导航数据
     async getNavList() {
       const { data } = await uni.$http.get('/api/public/v1/home/catitems')
       if (data.meta.status !== 200) return uni.$showMsg()
       this.navList = data.message
     },
     navClickHandler(item) {
       if (item.name === '分类') {
         uni.switchTab({
           url:"/pages/cate/cate"
         })
       }
     },
     // 获取楼层数据
     async getFloorList() {
       const { data } = await uni.$http.get('/api/public/v1/home/floordata')
       if ( data.meta.status !== 200 ) return uni.$showMsg()
       data.message.forEach(item => {
         item.product_list.forEach(i => {
           i.url = '/subpkg/goods_list/goods_list?' + i.navigator_url.split('?')[1]
         })
       })
       this.floorList = data.message
     }
    }
  }
</script>

<style lang="scss" scoped>
swiper {
  height: 330rpx;
  .swiper-item, image {
    width: 100%;
    height: 100%;
  }
}
.nav {
  display: flex;
  justify-content: space-around;
  margin: 15px 0;
  &-item {
    image {
      width: 128rpx;
      height: 140rpx;
    }
  }
}
.floor {
  &-item {
    &-title {
      width: 100%;
      height: 60rpx;
    }
    &-image {
      display: flex;
      padding-left: 10rpx;
      &-right {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
      }
    }
  }
}
</style>
