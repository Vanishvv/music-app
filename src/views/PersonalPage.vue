/**
* @Author:Wang Jun
* @Date:2020/6/22/022 23:44
* @Description:我的页面
*/
<template>
  <div class="personal-page">
    <!--用户名称-->
    <div class="personal-page__head">
      {{ username }}
    </div>
    <div class="personal-page__content">
      <div class="personal-page__content__my-music">
        <div class="personal-page__content__my-music__head">
          <!--我喜欢的音乐标题-->
          <span
            ><strong>{{ myMusicTitle }}</strong></span
          >
          <!--查看更多按钮-->
          <van-button round size="small" @click="goToDetail">{{
            this.buttonContent
          }}</van-button>
        </div>
        <!--我喜欢的音乐列表摘要-->
        <song-list-content :songTracks="myMusic"></song-list-content>
      </div>
      <!--我收藏的歌单标题-->
      <strong>{{ listTitle }}</strong>
      <div
        class="personal-page__content__list-colletcion"
        v-if="this.$store.state.currentUserName"
      >
        <!--歌单展示卡片-->
        <img-card
          v-for="(item, index) in imgCardData"
          :key="index"
          :card-url="item.picUrl"
          :card-play-count="item.playCount"
          @click.native="goListDetial(item.id)"
        >
          <template v-slot:imgTitle>
            <span class="personal-page__content__list-colletcion__title">{{
              item.name
            }}</span>
          </template>
        </img-card>
      </div>
    </div>
  </div>
</template>

<script>
var listIdData = [];
var songIdData = [];
var traksId = [];
import SongListContent from "../components/SongListBase/SongListContent";
import axios from "axios";
import ImgCard from "../components/ImgCard";
export default {
  name: "",
  data() {
    return {
      username: this.$store.state.currentUserName,
      myMusicTitle: "我喜欢的音乐",
      listTitle: "我收藏的歌单",
      buttonContent: "查看更多",
      myMusic: [],
      imgCardData: []
    };
  },
  components: {
    SongListContent,
    ImgCard
  },
  mounted() {
    /*初始化我的页面的收藏歌单*/
    this.getListCollection();
    /*初始化我的页面的喜欢的歌曲*/
    this.getSongCollection();
  },
  methods: {
    /*跳转到我喜欢的音乐页面*/
    goToDetail() {
      if (this.$store.state.currentUserName !== "") {
        this.$router.push("/mySongList");
      } else {
        this.$dialog.alert({
          message: "请先登录账号"
        });
      }
    },
    /*查看歌单详情*/
    goListDetial(id) {
      this.$router.push({
        name: "songListDetail",
        query: {
          id: id
        }
      });
    },
    /*获取我收藏的歌单数据*/
    async getListCollection() {
      await axios
        .get("http://localhost:3001/api/getListCollection")
        .then(response => {
          let res = response.data.data;
          listIdData.length = 0;
          var j = 0;
          let len = res.length;
          for (let i = 0; i < len; i++) {
            if (res[i].username === this.$store.state.currentUserName) {
              listIdData[j] = res[i].listid;
              j++;
            }
          }
        });
      for (let i = 0; i < listIdData.length; i++) {
        let res = await axios.get(
          "http://localhost:3000/playlist/detail?id=" + listIdData[i]
        );
        if (res.status === 200 && res) {
          var obj = {
            picUrl: res.data.playlist.coverImgUrl,
            playCount: res.data.playlist.playCount,
            name: res.data.playlist.name,
            id: listIdData[i]
          };
          this.imgCardData.push(obj);
        }
      }
    },
    /*获取我喜欢的音乐数据*/
    async getSongCollection() {
      await axios
        .get("http://localhost:3001/api/getSongCollection")
        .then(response => {
          let res = response.data.data;
          songIdData.length = 0;
          var j = 0;
          let len=res.length;;
          for (let i = 0; i < len; i++) {
            if (
              res[i].username === this.$store.state.currentUserName
            ) {
              songIdData[j] = res[i].songid;
              j++;
            }
          }
        });
      let l=songIdData.length;
      for (let i = 0; i < l; i++) {
        var obj1 = {
          id: songIdData[i]
        };
        traksId.push(obj1);
      }
      this.$store.commit("changeCurrentTrackIds", traksId);
      for (let i = 0; i < 3; i++) {
        let res = await axios.get(
          "http://localhost:3000/song/detail?ids=" + songIdData[i]
        );
        if (res.status === 200 && res) {
          var obj = {
            id: songIdData[i],
            name: res.data.songs[0].al.name,
            ar: res.data.songs[0].ar
          };
          this.myMusic.push(obj);
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
@mixin flex() {
  display: flex;
  justify-content: space-between;
}
.personal-page {
  &__head {
    background-image: linear-gradient(135deg, #6c7b74, #3f4543);
    padding: 1rem 0 1.2rem 0;
    color: white;
    font-size: 0.8rem;
  }
  &__content {
    background-color: white;
    margin-top: -0.5rem;
    border-radius: 0.5rem 0.5rem 0 0;
    padding: 0.5rem 0.5rem 0;
    height: 8rem;
    text-align: left;
    font-size: 0.4rem;
    &__my-music {
      height: 6rem;
      &__head {
        @include flex();
      }
    }
    &__list-colletcion {
      @include flex();
      flex-wrap: wrap;
      margin-bottom: 1.5rem;
      &__title {
        font-size: 0.32rem;
        text-align: left;
        overflow: hidden;
      }
    }
  }
}
</style>
