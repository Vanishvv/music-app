/**
* @Author:Wang Jun
* @Date:2020/6/23/023 14:03
* @Description:发现页面轮播图
*/
<template>
  <div class="swipe">
    <van-swipe :autoplay="5000" indicator-color="#dd001b">
      <van-swipe-item v-for="(item, index) in swiperList" :key="index">
        <!--轮播图片-->
        <img class="swipe__img" :src="item.pic" alt />
        <!--右下角信息-->
        <span class="swipe__title" :style="{ background: item.titleColor }">{{
          item.typeTitle
        }}</span>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  data() {
    return {
      swiperList: []
    };
  },
  mounted() {
    /*初始化轮播图数据*/
    this.getSwipeImages();
  },
  methods: {
    /*异步获取轮播图数据并赋值给swiperList*/
    async getSwipeImages() {
      let res = await axios.get("http://localhost:3000/banner?type=2");
      if (res.status === 200 && res) {
        this.swiperList = res.data.banners;
      }
    }
  }
};
</script>

<style scoped lang="scss">
@mixin img-size($width) {
  height: 3.8rem;
  border-radius: 0.2rem 0.2rem;
  width: $width;
}
.swipe {
  @include img-size(100%);
  &__img {
    @include img-size(90%);
  }
  &__title {
    position: absolute;
    right: 5%;
    bottom: 0.15rem;
    color: white;
    font-size: 0.35rem;
    padding: 0.1rem 0.3rem;
    opacity: 0.8;
    border-radius: 0.1rem 0 0.1rem 0;
  }
}
</style>
