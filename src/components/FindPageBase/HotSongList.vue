/**
* @Author:Wang Jun
* @Date:2020/6/24/024 10:44
* @Description:发现页推荐歌单
*/
<template>
  <div class="hot-song-list">
    <div class="hot-song-list__head">
      <!--模块标题-->
      <span
        ><strong>{{ this.title }}</strong></span
      >
      <!--查看更多按钮-->
      <van-button round size="small" @click="goToMore">{{
        this.buttonContent
      }}</van-button>
    </div>
    <div class="hot-song-list__body">
      <!--歌单图片组件-->
      <img-card
        v-for="(item, index) in imgCardData"
        :key="index"
        :card-url="item.picUrl"
        :card-play-count="item.playCount"
        @click.native="goListDetial(item.id)"
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
      imgCardData: [], //歌单列表的数据
      title: "你的歌单精选站", //模块标题
      buttonContent: "查看更多" //按钮内容
    };
  },
  components: {
    ImgCard
  },
  mounted() {
    /*初始化歌单精选列表的数据*/
    this.getImgCardData();
  },
  methods: {
    /*异步加载精选歌单的数据并赋值给imgCardData*/
    async getImgCardData() {
      let res = await axios.get("http://localhost:3000/personalized?limit=9");
      if (res.status == 200 && res) {
        this.imgCardData = res.data.result;
      }
    },
    /*查看歌单详情，路由跳转的同时传递歌单id*/
    goListDetial(id) {
      this.$router.push({
        name: "songListDetail",
        query: {
          id: id
        }
      });
    },
    /*点击查看更多跳转到歌单广场*/
    goToMore() {
      this.$router.push("/songList");
    }
  }
};
</script>

<style scoped lang="scss">
@mixin box-flex {
  display: flex;
  justify-content: space-between;
}
.hot-song-list {
  &__head {
    @include box-flex();
    padding: 5% 0.6rem 0;
    font-size: 0.45rem;
  }
  &__body {
    @include box-flex();
    flex-wrap: wrap;
    padding: 0 0.6rem 0;
    margin-bottom: 1.5rem;
    &__title {
      font-size: 0.32rem;
      text-align: left;
      overflow: hidden;
    }
  }
}
</style>
