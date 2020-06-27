/**
* @Author:Wang Jun
* @Date:2020/6/22/022 23:44
* @Description:我的页面
*/
<template>
  <div class="personal-page">
    <div class="personal-page__head">
      {{ username }}
    </div>
    <div class="personal-page__content">
      <div class="personal-page__content__my-music">
        <div class="personal-page__content__my-music__head">
          <span
            ><strong>{{ myMusicTitle }}</strong></span
          >
          <van-button round size="small" @click="goToDetail">{{ this.buttonContent }}</van-button>
        </div>
        <song-list-content :songTracks="myMusic"></song-list-content>
      </div>
      <strong>{{ listTitle }}</strong>
      <div
        class="personal-page__content__list-colletcion"
        v-if="this.$store.state.currentUserName"
      >
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
var traksId=[];
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
    this.getListCollection();
    this.getSongCollection();
  },
  methods: {
    goToDetail(){
      if(this.$store.state.currentUserName!=""){
        this.$router.push('/mySongList');
      }else{
        this.$dialog.alert({
          message: "请先登录账号"
        });
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
    async getListCollection() {
      await axios
        .get("http://localhost:3001/api/getListCollection")
        .then(response => {
          // eslint-disable-next-line no-undef
          app.arr = response.data.data;
          listIdData.length = 0;
          var j = 0;
          // eslint-disable-next-line no-undef
          for (let i = 0; i < app.arr.length; i++) {
            if (
              // eslint-disable-next-line no-undef
              app.arr[i].username == this.$store.state.currentUserName
            ) {
              // eslint-disable-next-line no-undef
              listIdData[j] = app.arr[i].listid;
              j++;
            }
          }
        });
      for (let i = 0; i < listIdData.length; i++) {
        let res = await axios.get(
          "http://localhost:3000/playlist/detail?id=" + listIdData[i]
        );
        if (res.status == 200 && res) {
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
    async getSongCollection() {
      await axios
        .get("http://localhost:3001/api/getSongCollection")
        .then(response => {
          // eslint-disable-next-line no-undef
          app.arr = response.data.data;
          songIdData.length = 0;
          var j = 0;
          // eslint-disable-next-line no-undef
          for (let i = 0; i < app.arr.length; i++) {
            if (
              // eslint-disable-next-line no-undef
              app.arr[i].username == this.$store.state.currentUserName
            ) {
              // eslint-disable-next-line no-undef
              songIdData[j] = app.arr[i].songid;
              j++;
            }
          }
        });
      for(let i=0;i<songIdData.length;i++){
        var obj1={
          id:songIdData[i]
        }
        traksId.push(obj1);
      }
      this.$store.commit("changeCurrentTrackIds", traksId);
      for (let i = 0; i < 3; i++) {
        let res = await axios.get(
          "http://localhost:3000/song/detail?ids=" + songIdData[i]
        );
        if (res.status == 200 && res) {
          var obj={
            id:songIdData[i],
            name:res.data.songs[0].al.name,
            ar:res.data.songs[0].ar
          }
          this.myMusic.push(obj);
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
$font-color: #3f4543;
.personal-page {
  &__head {
    padding-top: 1rem;
    padding-bottom: 1.2rem;
    color: white;
    background-image: linear-gradient(135deg, #6c7b74, $font-color);
    font-size: 0.8rem;
  }
  &__content {
    background-color: white;
    margin-top: -0.5rem;
    height: 8rem;
    border-radius: 0.5rem 0.5rem 0 0;
    text-align: left;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-top: 0.5rem;
    font-size: 0.4rem;
    &__my-music {
      height: 6rem;
      &__head {
        display: flex;
        justify-content: space-between;
      }
    }
    &__list-colletcion {
      display: flex;
      justify-content: space-between;
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
