/**
* @Author:Wang Jun
* @Date:2020/6/24/024 16:44
* @Description:歌单详情页面
*/
<template>
  <div class="list-detail">
    <mini-music-player></mini-music-player>
    <div class="list-detail__head">
      <!--通用页面导航头-->
      <base-nav :title="navTitle"></base-nav>
      <div class="list-detail__head__info">
        <!--歌单卡片-->
        <img-card
          :card-play-count="songListDetail.playCount"
          :card-url="songListDetail.coverImgUrl"
          class="list-detail__head__info__img-card"
        ></img-card>
        <!--歌单详情介绍-->
        <song-list-info
          v-if="songListDetail.creator"
          :list-name="songListDetail.name"
          :list-author="songListDetail.creator.nickname"
          :list-icon="songListDetail.creator.avatarUrl"
          :list-description="songListDetail.description"
        >
        </song-list-info>
      </div>
      <!--歌单详情功能选项-->
      <song-list-choice></song-list-choice>
    </div>
    <div class="list-detail__list">
      <div class="list-detail__list__head">
        <i class="iconfont icon-play-list"></i>
        <span>{{ playName }}</span>
        <van-button
          round
          size="mini"
          type="danger"
          class="list-detail__list__head__add"
          @click="addToCollection"
          >{{ add }}</van-button
        >
      </div>
      <!--歌单播放列表-->
      <song-list-content
        :songTracks="songListDetail.tracks"
      ></song-list-content>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ImgCard from "../components/ImgCard";
import BaseNav from "../components/BaseNav";
import SongListInfo from "../components/SongListBase/SongListInfo";
import SongListChoice from "../components/SongListBase/SongListChoice";
import SongListContent from "../components/SongListBase/SongListContent";
import MiniMusicPlayer from "../components/MiniMusicPlayer";
export default {
  name: "",
  data() {
    return {
      listId: "",
      songListDetail: [],
      navTitle: "歌单",
      playName: "播放全部",
      add: "收藏歌单"
    };
  },
  mounted() {
    /*初始化歌单详情*/
    this.getListDetail();
    /*初始化歌单id*/
    this.getListId();
    /*格式化歌单收藏*/
    this.getListCollection();
  },
  methods: {
    /*获取路由传递过来的歌单Id*/
    getListId() {
      this.listId = this.$route.query.id;
    },
    /*异步获取歌单详情数据*/
    async getListDetail() {
      let res = await axios.get(
        "http://localhost:3000/playlist/detail?id=" + this.$route.query.id
      );
      if (res.status === 200 && res) {
        this.songListDetail = res.data.playlist;
      }
      this.$store.commit("changeCurrentTrackIds", res.data.playlist.trackIds);
    },
    /*获取歌单收藏状态*/
    getListCollection() {
      axios
        .get("http://localhost:3001/api/getListCollection")
        .then(response => {
          let res = response.data.data;
          let len=res.length;
          for (let i = 0; i < len; i++) {
            if (
              res[i].listid === this.$route.query.id &&
              res[i].username === this.$store.state.currentUserName
            ) {
              this.add = "取消收藏";
              break;
            }
          }
        });
    },
    /*收藏歌单*/
    addToCollection() {
      if (this.$store.state.currentUserName !== "") {
        if (this.add === "收藏歌单") {
          axios
            .post("http://localhost:3001/api/addListCollection", {
              username: localStorage.getItem("currentUserName"),
              listid: this.$route.query.id
            })
            .then(response => {
              let msg = response.data.message;
              if (msg === "收藏歌单成功") {
                this.add = "取消收藏";
                this.$notify({
                  message: "收藏歌单成功",
                  type: "success",
                  duration: 1000
                });
              } else {
                this.$notify({
                  message: "收藏歌单失败",
                  type: "danger",
                  duration: 1000
                });
              }
            });
        } else if (this.add === "取消收藏") {
          axios
            .post("http://localhost:3001/api/deleteListCollection", {
              username: localStorage.getItem("currentUserName"),
              listid: this.$route.query.id
            })
            .then(response => {
              let msg = response.data.message;
              if (msg === "取消收藏成功") {
                this.add = "收藏歌单";
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
    }
  },
  components: {
    ImgCard,
    BaseNav,
    SongListInfo,
    SongListChoice,
    SongListContent,
    MiniMusicPlayer
  }
};
</script>

<style scoped lang="scss">
@mixin flex() {
  display: flex;
  align-items: center;
}
$font-color: #3f4543;
.list-detail {
  &__list {
    background-color: white;
    margin-top: -0.5rem;
    height: 8rem;
    border-radius: 0.5rem 0.5rem 0 0;
    &__head {
      @include flex();
      padding: 0.3rem 0.5rem 0;
      color: white;
      i {
        font-size: 0.7rem;
        color: $font-color;
      }
      span {
        @include flex();
        color: $font-color;
        font-size: 0.4rem;
        margin-left: 0.2rem;
      }
      &__add {
        span {
          color: white;
          font-size: 0.35rem;
          padding: 0 0.3rem 0 0.13rem;
        }
        margin-left: 4.3rem;
      }
    }
  }
  &__head {
    background-image: linear-gradient(135deg, #6c7b74, $font-color);
    height: 8rem;
    padding: 0 0.5rem 0;
    font-size: 0.3rem;
    &__info {
      margin-top: 0.4rem;
      display: flex;
      &__img-card {
        width: 4rem;
        height: 4.2rem;
      }
    }
  }
}
</style>
