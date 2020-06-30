/**
* @Author:Wang Jun
* @Date:2020/6/28/028 14:53
* @Description:搜索歌曲(热搜榜)
*/
<template>
  <div class="search">
    <!--导航栏-->
    <div class="search__head">
      <van-nav-bar left-arrow>
        <!--返回上一页按钮-->
        <template #left>
          <i class="iconfont icon-go-back" @click="goBack"></i>
        </template>
        <!--搜索输入框-->
        <template #title>
          <input
            class="search__head__filed"
            placeholder="输入搜索内容"
            v-model="content"
          />
        </template>
        <!--搜索按钮-->
        <template #right>
          <van-icon
            name="search"
            size="18"
            color="#333333"
            @click="search(content)"
          />
        </template>
      </van-nav-bar>
    </div>
    <div class="search__contain">
      <!--热搜榜/搜索结果标题-->
      <strong>{{ searchTitle }}</strong>
      <!--热搜榜-->
      <div class="search__contain__list" v-if="showRank">
        <div
          v-for="(item, index) in searchRank"
          :key="index"
          class="search__contain__list__item"
          @click="goSearch(item.name)"
        >
          <span class="search__contain__list__item__num">{{ index + 1 }}</span>
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
      <!--搜索结果列表-->
      <song-list-content
        v-if="!showRank"
        :songTracks="searchContent"
      ></song-list-content>
    </div>
    <!--mini播放器组件-->
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
      content: "",
      searchTitle: "热搜榜",
      searchRank: [],
      showRank: true
    };
  },
  methods: {
    /*返回上一页*/
    goBack() {
      this.$router.go(-1);
    },
    /*搜索获取搜索结果*/
    async search(content) {
      this.searchTitle = "搜索结果";
      this.showRank = false;
      let res = await axios.get(
        "http://localhost:3000/search?type=1&keywords=%20" + content
      );
      if (res.status === 200 && res) {
        var tmp = res.data.result.songs;
        let len = tmp.length;
        for (let i = 0; i < len; i++) {
          for (let j = 0; j < tmp[i].artists.length; j++) {
            var author = [];
            var obj1 = {
              name: tmp[i].artists[j].name
            };
            author.push(obj1);
          }
          var obj = {
            id: tmp[i].id,
            name: tmp[i].name,
            ar: author
          };
          this.searchContent.push(obj);
        }
      }
    },
    /*获取热搜榜数据*/
    async showSearchRank() {
      let res = await axios.get("http://localhost:3000/search/hot/detail");
      if (res.status === 200 && res) {
        var tmp = res.data.data;
        let len = tmp.length;
        for (let i = 0; i < len; i++) {
          var obj = {
            name: tmp[i].searchWord,
            description: tmp[i].content
          };
          this.searchRank.push(obj);
        }
      }
    },
    /*点击热搜榜词条到搜索输入框*/
    goSearch(name) {
      this.content = name;
    }
  },
  mounted() {
    /*初始化热搜榜*/
    this.showSearchRank();
  },
  components: {
    SongListContent,
    MiniMusicPlayer
  }
};
</script>

<style scoped lang="scss">
$font-size: 0.4rem;
.search {
  &__head {
    &__filed {
      border: none;
      border-bottom: #6c7b74 0.01rem solid;
      width: 6rem;
      font-size: $font-size;
    }
  }
  &__contain {
    text-align: left;
    padding: 0.8rem 0.6rem 0;
    font-size: $font-size;
    &__list {
      margin: 0.3rem 0 1.5rem;
      font-size: $font-size;
      &__item {
        display: flex;
        align-items: center;
        height: 1.5rem;
        font-size: 0.2rem;
        &__num {
          width: 1rem;
          font-size: $font-size;
          color: darkgray;
          margin-right: 0.1rem;
        }
        &__name {
          font-size: $font-size;
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
