<template>
  <view>
  <my-search @search="goToSearch"></my-search>
  <view class="cate">
    <!-- 左侧滑动区 -->
    <scroll-view class="cate-left" scroll-y="true" :style="{height: scrollHeight + 'px'}">
      <view :class="['cate-left-list', choosedList === index ? 'active' : '']" v-for="(item, index) in cateList" :key="item.cat_id" @click="activeChange(index)">{{item.cat_name}}</view>
    </scroll-view>
    <!-- 右侧滑动区域 -->
   <scroll-view class="cate-right" scroll-y="true" :style="{height: scrollHeight + 'px'}" :scroll-top="scrollTop">
     <!-- 二级分类 -->
     <block v-for="(item2, index2) in cateList[choosedList].children" :key="index2">
       <text class="cate-right-title">/ {{item2.cat_name}} /</text>
       <!-- 三级分类 -->
       <view class="cate-right-list">
        <view class="cate-right-list-box"  v-for="itemChild in item2.children" :key="itemChild.cat_id" @click="goToGoodsList(itemChild.cat_id)">
          <image :src="'/static/uni.png' || itemChild.cat_icon" class="cate-right-list-box-image" mode=""></image>
          <text class="cate-right-list-box-name">{{itemChild.cat_name}}</text>
        </view>
       </view>
     </block>
   </scroll-view> 
  </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        scrollHeight: '',
        cateList: [],
        choosedList: 0,
        // 点击左侧导航栏后，能重置滚动条
        scrollTop: 0
      };
    },
    onLoad() {
      this.getSystemHeight()
      this.getCateList()
    },
    methods: {
      // 获取滚动区域高度
      async getSystemHeight() {
        const result = await uni.getSystemInfo()
        this.scrollHeight = result[1].windowHeight - 60
      },
      // 获取左侧列表数据
      async getCateList() {
        const { data } = await uni.$http.get('/api/public/v1/categories')
        if (data.meta.status !== 200) return uni.$showMsg()
        this.cateList = data.message
      },
      // 左侧选项点击切换事件
      activeChange(index) {
        this.choosedList = index
        // 如果赋值相同，则不会重新赋值进行调整滚动条
        this.scrollTop = this.scrollTop === 0 ? 1 : 0
      },
      // 点击商品跳转到商品详情页面
      goToGoodsList(id) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?cid=' + id
        })
      },
      // 搜索
      goToSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .cate {
    display: flex;
    flex-wrap: nowrap;
    &-left {
      min-width: 100px;
      max-width: 100px;
      &-list {
        background-color: #F7F7F7;
        line-height: 60px;
        font-size: 14px;
        text-align: center;
        &.active {
          background-color: #fff;
          position: relative;
          &::before {
            content: "";
            display: block;
            width: 3px;
            height: 30px;
            position: absolute;
            top: 50%;
            left: 0;
            background-color: #C00000;
            transform: translateY(-50%);
          }
        }
      }
    }
    &-right {
      &-title {
        display: block;
        font-size: 16px;
        font-weight: 700;
        text-align: center;
        line-height: 60px;
      }
      &-list {
        display: flex;
        flex-wrap: wrap;
        &-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 10px;
          width: 33.3%;
          &-image {
            width: 60px;
            height: 60px;
          }
          &-name {
            font-size: 14px;
            margin-top: 5px;
          }
        }
      }
    }
  }
</style>
