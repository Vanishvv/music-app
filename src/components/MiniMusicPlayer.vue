<template>
  <div class="mini-music-player van-hairline--top">
    <div class="mini-music-player__img" @click="goLarge(songId)">
      <img :src="songData[2]" />
    </div>
    <div class="mini-music-player__name-and-author" @click="goLarge(songId)">
      <span class="mini-music-player__name">{{ songData[1] }}</span>
      <span class="mini-music-player__author">{{ songData[3] }}</span>
    </div>
    <div class="mini-music-player__audio">
      <i :class="iconChange" @click="changeState"></i>
    </div>
  </div>
</template>

<script>
var music = new Audio();
import { mapGetters } from "vuex";
export default {
  name: "",
  data() {
    return {
      songData: this.$store.state.currentSongData,
      iconChange: "",
      songId: this.$store.state.currentSongId,
      playState: ""
    };
  },
  computed: {
    getCurrentSongId() {
      return this.$store.state.currentSongId;
    },
    getCurrentSongData() {
      return this.$store.state.currentSongData;
    },
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
    getterCurrentSongId(msg) {
      this.songId = msg;
    },
    getterCurrentSongData(msg) {
      this.songData = msg;
      music.src = this.songData[0];
    },
    getterPlayState(msg) {
      this.playState = msg;
    }
  },
  mounted() {
    console.log(this.$store.state.currentMusicTime);
    if (this.$store.state.playState == "playing") {
      this.iconChange = "iconfont icon-play-list";
    } else {
      this.iconChange = "iconfont icon-stop";
      music.src = this.$store.state.currentSongData[0];
      music.currentTime = this.$store.state.currentMusicTime;
      music.play();
    }
  },
  destroyed() {
    this.$store.commit("changeCurrentMusicTime", music.currentTime);
  },
  methods: {
    changeState() {
      if (this.$store.state.playState == "playing") {
        this.iconChange = "iconfont icon-stop";
        this.$store.commit("changePlayState", "paused");
        music.play();
      } else {
        this.iconChange = "iconfont icon-play-list";
        this.$store.commit("changePlayState", "playing");
        music.pause();
      }
    },
    goLarge(){
      if(this.$store.state.currentSongId!=""){
        this.$store.commit("changeCurrentMusicTime", music.currentTime);
        music.pause();
        this.$router.push('/musicPlayer');
      }else {
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
