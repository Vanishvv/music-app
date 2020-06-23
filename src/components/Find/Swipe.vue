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
  height: 150px;
  &__img {
    width: 100%;
    height: 150px;
  }
  &__title {
    position: absolute;
    right: 0;
    bottom: 4px;
    color: #fff;
    font-size: smaller;
    padding: 3px 6px;
    opacity: 0.8;
  }
}
</style>
