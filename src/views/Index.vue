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
      <van-nav-bar left-arrow>
        <template #left>
          <i class="index__home__menu iconfont icon-index-menu"></i>
        </template>
        <template #title>
          <div class="index__home__nav">
            <router-link
                    v-for="item in homeData.routeData"
                    :key="item"
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
      load: true
    };
  },
  components: {
    Start
  },
  methods: {
    out: function() {
      setTimeout(() => {
        this.load = false;
      }, 3000);
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
    font-size: 15px;
  }
  &__home {
    &__search {
      color: $theme-color;
      font-size: 18px;
    }
    &__menu {
      color: $theme-color;
      font-size: 18px;
    }
    &__nav {
      display: flex;
      justify-content: space-around;
      align-items: flex-end;
    }
    /deep/ .van-nav-bar__title {
      width: 200px;
    }
  }
  .router-link {
    &-active {
      text-decoration: none;
      color: #c62f2f;
      font-size: 18px;
    }
  }
}
</style>
