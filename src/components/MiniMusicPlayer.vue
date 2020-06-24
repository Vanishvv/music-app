<template>
  <div class="mini-music-player">
    <div class="mini-music-player__img">
      <img :src="picUrl" />
    </div>
    <div class="mini-music-player__name-and-author">
      <span class="mini-music-player__name">{{ songName }}</span>
      <span class="mini-music-player__author">{{ authorName }}</span>
    </div>
    <div class="mini-music-player__audio">
      <i :class="iconChange" @click="changeState"></i>
    </div>
  </div>
</template>

<script>
import axios from "axios";
var music = new Audio();
export default {
  name: "",
  data() {
    return {
      songName: "",
      picUrl: "",
      authorName: "",
      songUrl: "",
      iconChange: "iconfont icon-play-list"
    };
  },
  mounted() {
    this.getSongDetial();
  },
  methods: {
    async getSongDetial() {
      let res1 = await axios.get("http://localhost:3000/song/url?id=405998841");
      if (res1.status == 200 && res1) {
        this.songUrl = res1.data.data[0].url;
        music.src = this.songUrl;
      }
      let res = await axios.get(
        "http://localhost:3000/song/detail?ids=405998841"
      );
      if (res.status == 200 && res) {
        this.songName = res.data.songs[0].name;
        this.picUrl = res.data.songs[0].al.picUrl;
        this.authorName = res.data.songs[0].ar[0].name;
      }
    },
    changeState() {
      if (this.iconChange == "iconfont icon-play-list") {
        this.iconChange = "iconfont icon-stop";
        music.play();
      } else {
        this.iconChange = "iconfont icon-play-list";
        music.pause();
      }
    }
  }
};
</script>

<style scoped lang="scss">
.mini-music-player {
  position: fixed;
  bottom: 0;
  height: 1.3rem;
  width: 100%;
  background-color: white;
  z-index: 999;
  display: flex;
  justify-items: center;
  padding-top: 0.15rem;
  border-top: 1px solid darkgray;
  padding-left: 0.5rem;
  &__audio {
    margin-left: 3.2rem;
    i {
      font-size: 1rem;
      color: #333333;
    }
  }
  &__img {
    img {
      height: 1.2rem;
      width: 1.2rem;
    }
  }
  &__name {
    font-size: 0.3rem;
  }
  &__author {
    font-size: 0.3rem;
    color: darkgray;
  }
  &__name-and-author {
    width: 3rem;
    height: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-items: center;
    span {
      text-align: left;
    }
    margin-left: 0.3rem;
  }
}
</style>
