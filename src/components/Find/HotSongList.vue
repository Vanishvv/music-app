/**
 * @Author:Wang Jun
 * @Date:2020/6/24/024 10:44
 * @Description:发现页推荐歌单
 */
<template>
  <div class="hot-song-list">
    <div class="hot-song-list__head">
      <span
        ><strong>{{ this.title }}</strong></span
      >
      <van-button round size="small">{{ this.buttonContent }}</van-button>
    </div>
    <div class="hot-song-list__body">
      <img-card
        v-for="(item, index) in imgCardData"
        :key="index"
        :cardItemData="item"
      >
        <template v-slot:imgTitle>
          <span class="hot-song-list__body__title">{{ item.name }}</span>
        </template>
      </img-card>
    </div>
  </div>
</template>

<script>
import ImgCard from "../ImgCard";
import axios from "axios";
export default {
  name: "",
  data() {
    return {
      imgCardData: [],
      title: "你的歌单精选站",
      buttonContent: "查看更多"
    };
  },
  components: {
    ImgCard
  },
  mounted() {
    this.getImgCardData();
  },
  methods: {
    async getImgCardData() {
      let res = await axios.get("http://localhost:3000/personalized?limit=9");
      if (res.status == 200 && res) {
        this.imgCardData = res.data.result;
        for (let i = 0; i < 9; i++) {
          // eslint-disable-next-line no-unused-vars
          let num = this.imgCardData[i].playCount;
          if (parseInt(num / 10000) != 0) {
            num = num / 10000;
            this.imgCardData[i].playCount = parseInt(num).toString() + "万";
          }
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.hot-song-list {
  &__head {
    display: flex;
    justify-content: space-between;
    padding-left: 0.6rem;
    padding-right: 0.6rem;
    padding-top: 5%;
    font-size: 0.5rem;
  }
  &__body {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    &__title {
      font-size: 0.32rem;
      text-align: left;
      overflow: hidden;
    }
  }
}
</style>
