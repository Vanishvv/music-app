/**
* @Author:Wang Jun
* @Date:2020/6/22/022 20:12
* @Description:主页
*/
<template>
  <div class="index">
    <!--载入动画组件-->
    <Start :startInfo="homeData.title" v-if="load"></Start>
    <div class="index__home">
      <van-nav-bar left-arrow @click-left="openSide" @click-right="openSearch">
        <!--打开侧边栏按钮-->
        <template #left>
          <i class="index__home__menu iconfont icon-index-menu"></i>
        </template>
        <!--中心导航栏-->
        <template #title>
          <div class="index__home__nav">
            <router-link
              v-for="(item, index) in homeData.routeData"
              :key="index"
              :to="item.path"
            >
              {{ item.name }}
            </router-link>
          </div>
        </template>
        <!--右侧搜索按钮-->
        <template #right>
          <van-icon name="search" class="index__home__search" />
        </template>
      </van-nav-bar>
      <!--路由切换显示页面-->
      <router-view></router-view>
      <!--侧边栏组件-->
      <van-popup v-model="show" position="left" class="index__home__popup">
        <side-popup></side-popup>
      </van-popup>
    </div>
    <!--mini播放器组件-->
    <mini-music-player v-if="showMini"></mini-music-player>
  </div>
</template>

<script>
import indexData from "../../static/indexData";
import Start from "../components/Start";
import MiniMusicPlayer from "../components/MiniMusicPlayer";
import SidePopup from "../components/SidePopup";
export default {
  name: "home",
  data() {
    return {
      homeData: indexData.data, //主页数据
      load: true, //是否显示载入动画
      show: false, //是否显示侧边滑出框
      showMini: false //是否显示Mini音乐播放器
    };
  },
  components: {
    Start,
    MiniMusicPlayer,
    SidePopup
  },
  methods: {
    /*初始化函数*/
    out: function() {
      setTimeout(() => {
        this.load = false;
        this.showMini = true;
        this.$store.commit("changeStartLoad", false);
      }, 3000);
    },
    /*打开侧边滑出框函数*/
    openSide() {
      this.show = true;
    },
    /*跳转到搜索页面*/
    openSearch() {
      this.$router.push("/search");
    }
  },
  mounted() {
    /*初始化主页*/
    if (this.$store.state.startLoad) {
      this.out();
    } else {
      this.load = false;
      this.showMini = true;
    }
  }
};
</script>

<style scoped lang="scss">
$theme-color: #2c3e50;
.index {
  height: 100%;
  width: 100%;
  a {
    color: $theme-color;
    font-size: 0.35rem;
  }
  &__home {
    &__popup {
      height: 100%;
      width: 80%;
    }
    &__menu,
    &__search {
      color: $theme-color;
      font-size: 0.5rem;
    }
    &__nav {
      display: flex;
      justify-content: space-around;
      align-items: flex-end;
    }
    /deep/ .van-nav-bar__title {
      width: 12rem;
    }
  }
  .router-link {
    &-active {
      text-decoration: none;
      color: #c62f2f;
      font-size: 0.4rem;
    }
  }
}
</style>
