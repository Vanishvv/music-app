/**
 * @Author:Wang Jun
 * @Date:2020/6/27/027 21:27
 * @Description:音乐播放页面
 */
<template>
  <div class="music-player">
    <div class="music-player__nav">
      <i class="iconfont icon-go-back" @click="goback"></i>
    </div>
    <div class="music-player__pic">
      <img class="music-player__pic__turn" :src="songData[2]" v-if="isRotate" />
      <img
        class="music-player__pic__static"
        :src="songData[2]"
        v-if="!isRotate"
      />
    </div>
    <div class="music-player__name">{{songData[1]}}</div>
    <div class="music-player__author">{{songData[3]}}</div>
    <div class="music-player__choice">
      <i
        class="iconfont icon-like"
        @click="like"
        :style="{ color: likeColor }"
      ></i>
      <i class="iconfont icon-download"></i>
      <i class="iconfont icon-share"></i>
      <i class="iconfont icon-mic"></i>
    </div>
    <div class="music-player__progress">
      <span class="music-player__progress__start">{{startTime}}</span>
      <div class="music-player__progress__bar"></div>
      <span class="music-player__progress__start">{{endTime}}</span>
    </div>
    <div class="music-player__control">
      <i class="iconfont icon-last-song" @click="changeSong(1)"></i>
      <div class="music-player__control__center" @click="changeState">
        <i :class="iconChange"></i>
      </div>
      <i class="iconfont icon-next-song" @click="changeSong(2)"></i>
    </div>
  </div>
</template>

<script>
var music = new Audio();
import axios from "axios";
export default {
  name: "",
  props: ["songListInfo"],
  data() {
    return {
      isRotate: false,
      songData: this.$store.state.currentSongData,
      iconChange: "",
      likeColor: "white",
      startTime:"00:00",
      endTime:"00:00"
    };
  },
  methods: {
    goback(){
      this.$store.commit("changeCurrentMusicTime", music.currentTime);
      music.pause();
      this.$router.go(-1);
    },
    /*切换并播放歌曲的函数*/
    playSong(){
      this.songData = this.$store.state.currentSongData;
      music.src = this.songData[0];
      this.isRotate = true;
      music.play();
      this.iconChange = "iconfont icon-pause-music ";
      this.$store.commit("changePlayState", "paused");
    },
    /*点击切换歌曲的函数*/
    async changeSong(num) {
      let tracksIds = this.$store.state.currentTrackIds;
      for (let i = 0; i < tracksIds.length; i++) {
        if (tracksIds[i].id == this.$store.state.currentSongId&&i!=0&&i!=tracksIds.length-1) {
          if(num==1){
            this.$store.commit("changeCurrentSongId", tracksIds[i - 1].id);
          }else if(num==2){
            this.$store.commit("changeCurrentSongId", tracksIds[i + 1].id);
          }
          let cSongId = this.$store.state.currentSongId;
          let songData = [];
          let res1 = await axios.get(
            "http://localhost:3000/song/url?id=" + cSongId
          );
          if (res1.status == 200 && res1) {
            songData[0] = res1.data.data[0].url;
          }
          let res = await axios.get(
            "http://localhost:3000/song/detail?ids=" + cSongId
          );
          if (res.status == 200 && res) {
            songData[1] = res.data.songs[0].name;
            songData[2] = res.data.songs[0].al.picUrl;
            songData[3] = res.data.songs[0].ar[0].name;
          }
          music.pause();
          this.$store.commit("changePlayState", "paused");
          this.$store.commit("changeCurrentSongData", songData);
          break;
        }
      }
      this.playSong();
      this.getSongCollection();
    },
    /*改变播放状态的函数*/
    changeState() {
      if (this.$store.state.playState == "playing") {
        this.iconChange = "iconfont icon-pause-music";
        this.$store.commit("changePlayState", "paused");
        this.isRotate = true;
        music.play();
      } else {
        this.iconChange = "iconfont icon-play-music";
        this.$store.commit("changePlayState", "playing");
        this.isRotate = false;
        music.pause();
      }
    },
    /*获取歌曲收藏状态*/
    getSongCollection() {
      axios
        .get("http://localhost:3001/api/getSongCollection")
        .then(response => {
          // eslint-disable-next-line no-undef
          app.arr = response.data.data;
          // eslint-disable-next-line no-undef
          for (let i = 0; i < app.arr.length; i++) {
            if (
              // eslint-disable-next-line no-undef
              app.arr[i].songid == this.$store.state.currentSongId &&
              // eslint-disable-next-line no-undef
              app.arr[i].username == this.$store.state.currentUserName
            ) {
              this.likeColor = "red";
              break;
            }
          }
        });
    },
    /*收藏歌曲或取消收藏歌曲的函数*/
    like() {
      if (this.$store.state.currentUserName != "") {
        if (this.likeColor == "white") {
          axios
            .post("http://localhost:3001/api/addSongCollection", {
              username: this.$store.state.currentUserName,
              songid: this.$store.state.currentSongId
            })
            .then(response => {
              // eslint-disable-next-line no-undef
              app.message = response.data.message;
              if (response.data.message == "收藏歌曲成功") {
                this.likeColor = "red";
                this.$notify({
                  message: "收藏歌曲成功",
                  type: "success",
                  duration: 1000
                });
              } else {
                this.$notify({
                  message: "收藏歌曲失败",
                  type: "danger",
                  duration: 1000
                });
              }
            });
        } else if (this.likeColor == "red") {
          axios
            .post("http://localhost:3001/api/deleteSongCollection", {
              username: this.$store.state.currentUserName,
              songid: this.$store.state.currentSongId
            })
            .then(response => {
              // eslint-disable-next-line no-undef
              console.log(response.data.message);
              if (response.data.message == "取消收藏成功") {
                this.likeColor = "white";
                this.$notify({
                  message: "取消收藏成功",
                  type: "success",
                  duration: 1000
                });
              } else {
                this.$notify({
                  message: "取消收藏失败",
                  type: "danger",
                  duration: 1000
                });
              }
            });
        }
      } else {
        this.$notify({
          message: "请先登录",
          type: "danger",
          duration: 1000
        });
      }
    },
    /*转换音乐时长格式*/
    timeToMinute(time) {
      var t;
      if(time > -1){
        var hour = Math.floor(time/3600);
        var min = Math.floor(time/60) % 60;
        var sec = time % 60;
        if(hour < 10) {
          t = '0'+ hour + ":";
        } else {
          t = hour + ":";
        }

        if(min < 10){t += "0";}
        t += min + ":";
        if(sec < 10){t += "0";}
        t += sec.toFixed(2);
      }
      if(t){
        t=t.substring(0,t.length-3);
      }
      return t;
    }
  },
  /*初始化播放器页面的函数*/
  mounted() {
    music.src = this.$store.state.currentSongData[0];
    music.currentTime = this.$store.state.currentMusicTime;
    if (this.$store.state.playState == "playing") {
      this.isRotate = false;
      music.pause();
      this.iconChange = "iconfont icon-play-music";
    } else {
      this.isRotate = true;
      music.play();
      this.iconChange = "iconfont icon-pause-music ";
    }
    this.getSongCollection();
    setInterval(() => {
      this.startTime=this.timeToMinute(music.currentTime);
      this.endTime=this.timeToMinute(music.duration);
    },500)
  }
};
</script>

<style scoped lang="scss">
$font-color: #3f4543;
@mixin pic {
  border-radius: 6rem;
  height: 6rem;
  width: 6rem;
}
.music-player {
  background-image: linear-gradient(135deg, #6c7b74, $font-color);
  height: 100%;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  &__nav{
    color: white;
    text-align: left;
    font-size: 0.5rem;
    padding-top: 0.4rem;
    i {
      font-size: 0.5rem;
      margin-right: 0.5rem;
    }
  }
  &__name{
    color: #e2e3de;
    font-size: 0.5rem;
    margin-top: 0.2rem;
  }
  &__author{
    color: #e2e3de;
    font-size: 0.3rem;
    margin-top: 0.2rem;
  }
  &__pic {
    background-color: white;
    margin-left: 1.5rem;
    margin-top: 2.5rem;
    @include pic();
    &__static {
      @include pic();
    }
    &__turn {
      @include pic();
      animation: turn 10s linear infinite;
    }
  }
  &__choice {
    margin-top: 1.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    color: white;
    display: flex;
    justify-content: space-around;
    i {
      font-size: 0.7rem;
    }
  }
  &__control {
    margin-top: 1rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    color: white;
    display: flex;
    justify-content: space-around;
    justify-items: center;
    line-height: 1.5rem;
    i {
      font-size: 0.8rem;
    }
    &__center {
      i {
        font-size: 1.5rem;
      }
    }
  }
  &__progress {
    display: flex;
    height: 0.1rem;
    margin-top: 0.8rem;
    line-height: 0.1rem;
    padding-left: 0.9rem;
    width: 80%;
    span{
      font-size: 0.2rem;
      color: white;
    }
    &__bar{
      width: 6rem;
      height: 0.05rem;
      margin-left: 0.15rem;
      margin-right: 0.15rem;
      background-color: #cccccc;
    }
  }
}
@keyframes turn {
  0% {
    -webkit-transform: rotate(0deg);
  }
  25% {
    -webkit-transform: rotate(90deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  75% {
    -webkit-transform: rotate(270deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>
