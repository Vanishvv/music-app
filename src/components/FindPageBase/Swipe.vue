/**
 * @Author:Wang Jun
 * @Date:2020/6/23/023 14:03
 * @Description:发现页面轮播图
 */
<template>
  <div class="swipe">
    <van-swipe :autoplay="5000" indicator-color="#dd001b">
      <van-swipe-item v-for="(item, index) in swiperList" :key="index">
        <img class="swipe__img" :src="item.pic" alt />
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
    this.getSwipeImages();
  },
  methods: {
    async getSwipeImages() {
      let res = await axios.get("http://localhost:3000/banner?type=2");
      if (res.status == 200 && res) {
        this.swiperList = res.data.banners;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.swipe {
  width: 100%;
  height: 4rem;
  border-radius: 0.2rem 0.2rem;
  &__img {
    width: 90%;
    height: 3.8rem;
    border-radius: 0.2rem 0.2rem;
  }
  &__title {
    position: absolute;
    right: 5%;
    bottom: 0.15rem;
    color: #fff;
    font-size: 0.35rem;
    padding: 0.1rem 0.3rem;
    opacity: 0.8;
    border-radius: 0.1rem 0 0.1rem 0;
  }
}
</style>
