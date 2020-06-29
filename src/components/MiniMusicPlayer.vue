/**
* @Author:Wang Jun
* @Date:2020/6/29/029 14:32
* @Description:mini播放器组件
*/
<template>
  <div class="mini-music-player van-hairline--top">
    <!--当前播放歌曲的图片-->
    <div class="mini-music-player__img" @click="goLarge(songId)">
      <img :src="songData[2]" />
    </div>
    <div class="mini-music-player__name-and-author" @click="goLarge(songId)">
      <!--当前播放歌曲的歌曲名称-->
      <span class="mini-music-player__name">{{ songData[1] }}</span>
      <!--当前播放歌曲的歌曲演唱者名称-->
      <span class="mini-music-player__author">{{ songData[3] }}</span>
    </div>
    <!--播放/暂停按钮-->
    <div class="mini-music-player__audio">
      <i :class="iconChange" @click="changeState"></i>
    </div>
  </div>
</template>

<script>
/*新建一个Audio对象*/
var music = new Audio();
import { mapGetters } from "vuex";
export default {
  name: "",
  data() {
    return {
      iconChange: "", //播放图标
      playState: "", //播放状态
      songData: this.$store.state.currentSongData,
      songId: this.$store.state.currentSongId
    };
  },
  computed: {
    /*实时计算当前歌曲Id*/
    getCurrentSongId() {
      return this.$store.state.currentSongId;
    },
    /*实时计算当前歌曲的信息*/
    getCurrentSongData() {
      return this.$store.state.currentSongData;
    },
    /*实时计算当前歌曲的播放状态*/
    getPlaySate() {
      return this.$store.state.playState;
    },
    ...mapGetters([
      "getterCurrentSongId",
      "getterCurrentSongData",
      "getterPlayState"
    ])
  },
  watch: {
    /*实时监听获取当前歌曲的id*/
    getterCurrentSongId(msg) {
      this.songId = msg;
    },
    /*实时监听获取当前歌曲的信息*/
    getterCurrentSongData(msg) {
      this.songData = msg;
      music.src = this.songData[0];
    },
    /*实时监听获取当前歌曲的播放状态*/
    getterPlayState(msg) {
      this.playState = msg;
    }
  },
  mounted() {
    /*初始化音乐播放器*/
    console.log(this.$store.state.currentMusicTime);
    if (this.$store.state.playState === "playing") {
      this.iconChange = "iconfont icon-play-list";
    } else {
      this.iconChange = "iconfont icon-stop";
      music.src = this.$store.state.currentSongData[0];
      music.currentTime = this.$store.state.currentMusicTime;
      music.play();
    }
  },
  destroyed() {
    /*销毁组件时先存储当前播放的时间*/
    this.$store.commit("changeCurrentMusicTime", music.currentTime);
  },
  methods: {
    /*改变播放状态的函数*/
    changeState() {
      if (this.$store.state.playState === "playing") {
        this.iconChange = "iconfont icon-stop";
        this.$store.commit("changePlayState", "paused");
        music.play();
      } else {
        this.iconChange = "iconfont icon-play-list";
        this.$store.commit("changePlayState", "playing");
        music.pause();
      }
    },
    /*前往歌曲播放页面的函数*/
    goLarge() {
      if (this.$store.state.currentSongId !== "") {
        this.$store.commit("changeCurrentMusicTime", music.currentTime);
        music.pause();
        this.$router.push("/musicPlayer");
      } else {
        this.$notify({
          message: "当前没有播放歌曲",
          type: "danger",
          duration: 1000
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
$img-size: 1.2rem;
.mini-music-player {
  position: fixed;
  bottom: 0;
  height: 1.3rem;
  width: 100%;
  background-color: white;
  z-index: 999;
  display: flex;
  justify-items: center;
  padding: 0.15rem 0 0 0.5rem;
  &__audio {
    margin-left: 1rem;
    i {
      font-size: 1rem;
      color: #333333;
    }
  }
  &__img {
    img {
      height: $img-size;
      width: $img-size;
    }
  }
  &__name {
    font-size: 0.4rem;
  }
  &__author {
    font-size: 0.3rem;
    color: darkgray;
  }
  &__name-and-author {
    width: 5rem;
    height: 1.5rem;
    display: flex;
    flex-direction: column;
    margin-left: 0.3rem;
    span {
      text-align: left;
    }
  }
}
</style>
