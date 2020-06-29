/**
* @Author:Wang Jun
* @Date:2020/6/29/029 15:36
* @Description:排行榜组件
*/
<template>
  <div class="learder-board">
    <base-nav class="learder-board__nav" :title="title"></base-nav>
    <div class="learder-board__official">
      <board-card
        v-for="(item, index) in cardData"
        :key="index"
        :cardInfo="item"
        class="learder-board__official__item"
      >
      </board-card>
    </div>
    <mini-music-player></mini-music-player>
  </div>
</template>

<script>
import BaseNav from "../components/BaseNav";
import MiniMusicPlayer from "../components/MiniMusicPlayer";
import BoardCard from "../components/BoardCard";
import axios from "axios";
export default {
  name: "",
  data() {
    return {
      title: "排行榜",
      cardData: []
    };
  },
  components: {
    BaseNav,
    MiniMusicPlayer,
    BoardCard
  },
  methods: {
    /*异步获取排行榜数据*/
    async getOfficial() {
      let res = await axios.get("http://localhost:3000/toplist/detail");
      if (res.status === 200 && res) {
        var tmp = res.data.list;
        for (let i = 0; i < 4; i++) {
          var obj = {
            picUrl: tmp[i].coverImgUrl,
            title: tmp[i].updateFrequency,
            track: tmp[i].tracks,
            id: tmp[i].id
          };
          this.cardData.push(obj);
        }
      }
    }
  },
  mounted() {
    /*初始化排行榜页面*/
    this.getOfficial();
  }
};
</script>

<style scoped lang="scss">
.learder-board {
  padding: 0 0.5rem 0;
  &__nav {
    color: #333333;
    margin-bottom: 0.5rem;
  }
  &__official {
    display: flex;
    flex-direction: column;
    &__item {
      margin-top: 0.5rem;
    }
  }
}
</style>
