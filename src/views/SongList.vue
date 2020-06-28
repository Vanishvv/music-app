/**
 * @Author:Wang Jun
 * @Date:2020/6/28/028 13:01
 * @Description:歌单广场
 */
<template>
  <div class="song-list">
    <base-nav class="song-list__nav" :title="title"></base-nav>
    <van-tabs v-model="active" animated>
      <van-tab
        v-for="(listItem, index) in listData"
        :key="index"
        :title="listItem.name"
        :name="listItem.name"
      >
        <div class="song-list__content">
          <img-card
            v-for="(item, index) in listItem.imgCardData"
            :key="index"
            :card-url="item.picUrl"
            :card-play-count="item.playCount"
            @click.native="goListDetial(item.id)"
          >
            <template v-slot:imgTitle>
              <span class="song-list__content__title">{{ item.name }}</span>
            </template>
          </img-card>
        </div>
      </van-tab>
    </van-tabs>
    <mini-music-player></mini-music-player>
  </div>
</template>

<script>
import BaseNav from "../components/BaseNav";
import ImgCard from "../components/ImgCard";
import MiniMusicPlayer from "../components/MiniMusicPlayer";
import axios from "axios";
export default {
  name: "",
  data() {
    return {
      title: "歌单广场",
      active: 0,
      listData: [
        {
          name: "华语",
          imgCardData: []
        },
        {
          name: "电子",
          imgCardData: []
        },
        {
          name: "轻音乐",
          imgCardData: []
        },
        {
          name: "民谣",
          imgCardData: []
        },
        {
          name: "摇滚",
          imgCardData: []
        },
        {
          name: "欧美",
          imgCardData: []
        },
        {
          name: "日语",
          imgCardData: []
        }
      ]
    };
  },
  components: {
    BaseNav,
    ImgCard,
    MiniMusicPlayer
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      for (let i = 0; i < this.listData.length; i++) {
        let res = await axios.get(
          "http://localhost:3000/top/playlist?cat=" + this.listData[i].name
        );
        if (res.status == 200 && res) {
          var list = res.data.playlists;
          for (let j = 0; j < list.length; j++) {
            var datas = {
              picUrl: list[j].coverImgUrl,
              playCount: list[j].playCount,
              id: list[j].id,
              name: list[j].name
            };
            this.listData[i].imgCardData.push(datas);
          }
        }
      }
    },
    goListDetial(id) {
      this.$router.push({
        name: "songListDetail",
        query: {
          id: id
        }
      });
    },
  }
};
</script>

<style scoped lang="scss">
.song-list {
  &__nav {
    color: #333333;
    margin-bottom: 0.5rem;
    padding-left: 0.5rem;
  }
  &__content {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    margin-bottom: 1.5rem;
    &__title {
      font-size: 0.32rem;
      text-align: left;
      overflow: hidden;
    }
  }
}
</style>
