<template>
  <view class="my-search" :style="{'background-color': bgColor}">
    <view class="my-search-content"  @click="searchSmh" :style="{'border-radius': radius + 'px'}">
      <uni-icons type="search" size="30"></uni-icons>
      <text class="search-text">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-search",
    props: {
      bgColor: {
        type: String,
        default: '#C00000'
      },
      radius: {
        type: Number,
        default: 40
      }
    },
    data() {
      return {
        
      };
    },
    methods: {
      searchSmh() {
        this.$emit('search')
      }
    }
  }
</script>

<style lang="scss">
.my-search {
  padding: 10px;
  &-content {
    height: 40px;
    width: 90%;
    background-color: #fff;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    text {
      line-height: 40px;
    }
    .search-text {
      font-size: 16px;
      margin-left: 10px;
    }
  }
}
</style>