/**
 * @Author:Wang Jun
 * @Date:2020/6/28/028 14:53
 * @Description:搜索歌曲(热搜榜)
 */
<template>
  <div class="search">
    <div class="search__head">
      <van-nav-bar left-arrow>
        <template #left>
          <i class="iconfont icon-go-back" @click="goBack"></i>
        </template>
        <template #title>
          <input
            class="search__head__filed"
            placeholder="输入搜索内容"
            v-model="content"
          />
        </template>
        <template #right>
          <van-icon name="search" size="18" color="#333333" @click="search(content)" />
        </template>
      </van-nav-bar>
    </div>
    <div class="search__contain">
      <strong>{{ searchTitle }}</strong>
      <div class="search__contain__list" v-if="showRank">
        <div
          v-for="(item, index) in searchRank"
          :key="index"
          class="search__contain__list__item"
          @click="goSearch(item.name)"
        >
          <span class="search__contain__list__item__num">{{
            index + 1
          }}</span>
          <div>
            <span class="search__contain__list__item__name">{{
              item.name
            }}</span>
            <span>
              <span class="search__contain__list__item__ar">
                {{ item.description }}
              </span>
            </span>
          </div>
        </div>
      </div>
      <song-list-content v-if="!showRank" :songTracks="searchContent"></song-list-content>
    </div>
    <mini-music-player></mini-music-player>
  </div>
</template>

<script>
import axios from "axios";
import SongListContent from "../components/SongListBase/SongListContent";
import MiniMusicPlayer from "../components/MiniMusicPlayer";
export default {
  name: "",
  data() {
    return {
      searchContent: [],
      content:'',
      searchTitle: "热搜榜",
      searchRank: [],
      showRank:true
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async search(content) {
      this.searchTitle='搜索结果'
      this.showRank=false;
      let res = await axios.get("http://localhost:3000/search?type=1&keywords=%20"+content);
      if (res.status == 200 && res) {
        var tmp = res.data.result.songs;
        for (let i = 0; i < tmp.length; i++) {
          for(let j=0;j<tmp[i].artists.length;j++){
            var author=[];
            var obj1={
              name:tmp[i].artists[j].name
            }
            author.push(obj1);
          }
          var obj = {
            id:tmp[i].id,
            name: tmp[i].name,
            ar:author
          };
          this.searchContent.push(obj);
        }
      }
    },
    async showSearchRank() {
      let res = await axios.get("http://localhost:3000/search/hot/detail");
      if (res.status == 200 && res) {
        var tmp = res.data.data;
        for (let i = 0; i < tmp.length; i++) {
          var obj = {
            name: tmp[i].searchWord,
            description: tmp[i].content
          };
          this.searchRank.push(obj);
        }
      }
    },
    goSearch(name) {
      this.content=name;
    }
  },
  mounted() {
    this.showSearchRank();
  },
  components:{
    SongListContent,
    MiniMusicPlayer
  }
};
</script>

<style scoped lang="scss">
.search {
  &__head {
    &__filed {
      border: none;
      border-bottom: #6c7b74 0.01rem solid;
      width: 6rem;
      font-size: 0.4rem;
    }
  }
  &__contain {
    text-align: left;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-top: 0.8rem;
    font-size: 0.4rem;
    padding-left: 0.6rem;
    &__list {
      font-size: 0.4rem;
      margin-top: 0.3rem;
      margin-bottom: 1.5rem;
      &__item {
        font-size: 0.2rem;
        height: 1.5rem;
        display: flex;
        align-items: center;
        &__num {
          font-size: 0.4rem;
          color: darkgray;
          width: 1rem;
          margin-right: 0.1rem;
        }
        &__name {
          font-size: 0.4rem;
          color: #333333;
        }
        div {
          display: flex;
          flex-direction: column;
          color: gray;
          span {
            text-align: left;
          }
        }
      }
    }
  }
}
</style>
