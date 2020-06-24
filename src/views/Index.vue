/**
* @Author:Wang Jun
* @Date:2020/6/22/022 20:12
* @Description:主页
*/
<template>
  <div class="index">
    <!--载入动画-->
    <Start :startInfo="homeData.title" v-if="load"></Start>
    <div class="index__home">
      <van-nav-bar left-arrow @click-left="openSide" @click-right="openSearch">
        <template #left>
          <i class="index__home__menu iconfont icon-index-menu"></i>
        </template>
        <template #title>
          <div class="index__home__nav">
            <router-link
                    v-for="(item,index) in homeData.routeData"
                    :key="index"
                    :to="item.path">
              {{item.name}}
            </router-link>
          </div>
        </template>
        <template #right>
          <van-icon name="search" class="index__home__search" />
        </template>
      </van-nav-bar>
      <router-view></router-view>
      <van-popup v-model="show" position="left" class="index__home__popup">
        <!--待加入弹出框的内容-->
      </van-popup>
    </div>
  </div>
</template>

<script>
import indexData from "../../static/indexData";
import Start from "../components/Start";
export default {
  name: "home",
  data() {
    return {
      homeData: indexData.data,
      load: true,
      show:false
    };
  },
  components: {
    Start
  },
  methods: {
    out: function() {
      setTimeout(() => {
        this.load = false;
      }, 4000);
    },
    openSide(){
      this.show=true
    },
    openSearch(){
      this.$router.push("/search");
    }
  },
  mounted() {
    this.out();
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
    &__popup{
      height: 100%;
      width: 80%;
    }
    &__search {
      color: $theme-color;
      font-size: 0.5rem;
    }
    &__menu {
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
