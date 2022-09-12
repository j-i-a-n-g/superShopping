<template>
  <view class="goods_detail">
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="2000" duration="1000" :circular="true">
      <swiper-item v-for="(item, index) in goods_info.pics" :key="index">
        <image :src="item.pics_big" @click="preview(index)"></image>
      </swiper-item>
    </swiper>
    <!-- 商品信息区域 -->
    <view class="goods_detail-msg">
      <!-- 价格 -->
      <view class="goods_detail-msg-price">￥{{goods_info.goods_price}}</view>
      <!-- 产品信息 -->
      <view class="goods_detail-msg-dec">
        <view class="goods_detail-msg-dec-title">{{goods_info.goods_name}}</view>
        <view class="goods_detail-msg-dec-favi">
          <uni-icons type="star" :size="18" color="grey"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 快递 -->
      <view class="goods_detail-msg-courier">快递：免运费</view>
    </view>
    <!-- 商品性能图片展示 -->
    <rich-text :nodes="goods_info.goods_introduce"></rich-text>
    <!-- 商品导航区域 -->
    <view class="goods-carts">
    	<uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        goods_info: {},
        options: [{
        					icon: 'shop',
        					text: '店铺',
        				}, {
        					icon: 'cart',
        					text: '购物车',
        					info: 2
        				}],
        				buttonGroup: [{
        						text: '加入购物车',
        						backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
        						color: '#fff'
        					},
        					{
        						text: '立即购买',
        						backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
        						color: '#fff'
        					}
        				]
      };
    },
    onLoad(options) {
      const goods_id = options.goods_id
      this.getGoodsDetail(goods_id)
    },
    methods: {
      async getGoodsDetail(goods_id) {
        const { data } = await uni.$http.get('/api/public/v1/goods/detail', { goods_id })
        if(data.meta.status !== 200) return uni.$showMsg()
        data.message.goods_introduce = data.message.goods_introduce.replace(/<img /g, '<img style="display: block;"').replace(/.webp/, '.jpg')
        this.goods_info = data.message
        console.log(this.goods_info)
      },
      // 放大轮播图中的图片
      preview(i) {
        uni.previewImage({
          current: i,
          urls: this.goods_info.pics.map(item => item.pics_big)
        })
      },
      onClick(e) {
        if (e.content.text === '购物车') {
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
      }
    }
  }
</script>

<style lang="scss">
.goods_detail {
  background-color: #fff;
  padding-bottom: 50px;
}
swiper {
  height: 750rpx;
  image {
    width: 100%;
    height: 100%;
  }
}
.goods_detail-msg {
  margin: 10px;
  &-price {
    font-size: 20px;
    color: #C00000;
    line-height: 40px;
  }
  &-dec {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    &-title {
      font-size: 12px;
      margin-right: 5px;
    }
    &-favi {
      display: flex;
      flex-direction: column;
      align-items: center;
      border-left: 1px solid #ccc;
      width: 100px;
      text {
        font-size: 14px;
        margin-top: 5px;
      }
    }
  }
  &-courier {
    color: #999;
    font-size: 12px;
    margin-top: 5px;
  }
}
.goods-carts {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		position: fixed;
		left: 0;
		right: 0;
		/* #ifdef H5 */
		left: var(--window-left);
		right: var(--window-right);
		/* #endif */
		bottom: 0;
	}
</style>
