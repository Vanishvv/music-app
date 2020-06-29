/**
 * @Author:Wang Jun
 * @Date:2020/6/29/029 15:00
 * @Description:侧边栏组件
 */
<template>
  <div class="side-popup">
    <div class="side-popup__head">
      <!--登录成功后显示用户名-->
      <span v-if="userName">{{ userName }}</span>
      <!--未登录显示登录按钮-->
      <van-button
        round
        type="info"
        color="#c62f2f"
        size="small"
        v-if="!userName"
        @click="goLogin"
        >登录</van-button
      >
    </div>
    <!--侧边顶部按钮栏-->
    <div class="side-popup__icons  van-hairline--bottom">
      <div
        class="side-popup__icons__item"
        v-for="(item, index) in sidePopupInfo.iconsData"
        :key="index"
      >
        <!--按钮icon的class名-->
        <i :class="item.iconName"></i>
        <!--按钮的名称-->
        <span>{{ item.name }}</span>
      </div>
    </div>
    <!--侧边功能列表-->
    <div class="side-popup__list van-hairline--bottom">
      <div
        class="side-popup__list__item"
        v-for="(item, index) in sidePopupInfo.listData"
        :key="index"
      >
        <!--功能列表条目的图标class名-->
        <i :class="item.iconName"></i>
        <!--功能列表条目名称-->
        <span>{{ item.name }}</span>
      </div>
    </div>
    <!--侧边底部按钮栏-->
    <div class="side-popup__footer">
      <div
        class="side-popup__footer__item"
        v-for="(item, index) in sidePopupInfo.footerData"
        :key="index"
        @click="goSetting(item.name)"
      >
        <!--按钮图标class名-->
        <i :class="item.iconName"></i>
        <!--按钮名称-->
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import sidePopupData from "../../static/sidePopupData";
export default {
  name: "",
  data() {
    return {
      userName: this.$store.state.currentUserName, //当前用户名
      sidePopupInfo: sidePopupData.data //侧边栏数据
    };
  },
  methods: {
    /*跳转到登录页面*/
    goLogin() {
      this.$router.push("/login");
    },
    /*跳转到设置页面*/
    goSetting(name) {
      if (name === "设置") {
        this.$router.push("/settings");
      }
    }
  }
};
</script>

<style scoped lang="scss">
@mixin flex($text-align) {
  display: flex;
  flex-direction: column;
  text-align: $text-align;
}
@mixin icons-flex($padding) {
  display: flex;
  justify-content: space-between;
  padding: $padding;
}
@mixin height-and-size($line-height, $font-size) {
  line-height: $line-height;
  font-size: $font-size;
}
@mixin item($line-height) {
  display: flex;
  justify-items: center;
  line-height: $line-height;
}
$font-color: #333333;
.side-popup {
  @include flex(left);
  font-size: 0.7rem;
  padding: 0.8rem 0 0 0.55rem;
  &__icons {
    @include icons-flex(0 0.5rem 0.5rem 0);
    font-size: 0.3rem;
    margin-top: 0.4rem;
    &__item {
      @include flex(center);
      color: #6c7b74;
      i {
        font-size: 0.7rem;
        color: #c62f2f;
      }
    }
  }
  &__list {
    color: $font-color;
    margin-top: 0.5rem;
    padding-bottom: 0.4rem;
    &__item {
      @include item(1.3rem);
    }
    i {
      @include height-and-size(1.3rem, 0.6rem);
    }
    span {
      @include height-and-size(1.3rem, 0.4rem);
      margin-left: 0.2rem;
    }
  }
  &__head {
    color: $font-color;
    padding-left: 0.1rem;
  }
  &__footer {
    @include icons-flex(0.1rem 0.5rem 0.1rem 0);
    color: $font-color;
    &__item {
      @include item(1rem);
    }
    i {
      @include height-and-size(1rem, 0.6rem);
    }
    span {
      @include height-and-size(1rem, 0.4rem);
    }
  }
}
</style>
