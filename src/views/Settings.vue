/**
* @Author:Wang Jun
* @Date:2020/6/27/027 15:05
* @Description:设置页面
*/
<template>
  <div class="settings">
    <!--导航栏-->
    <base-nav class="settings__nav"></base-nav>
    <div class="settings__gap"></div>
    <!--网络模块-->
    <van-cell-group class="settings__cell" title="网络">
      <van-cell
        v-for="(netItem, index) in settingsData.networkData"
        :key="index"
        :title="netItem.title"
      >
        <template #right-icon>
          <van-switch
            v-model="netItem.check"
            size="0.5rem"
            active-color="#c62f2f"
          />
        </template>
      </van-cell>
    </van-cell-group>
    <div class="settings__gap"></div>
    <!--播放和下载模块-->
    <van-cell-group class="settings__cell" title="播放和下载">
      <van-cell
        v-for="(playItem, index) in settingsData.playData"
        :key="index"
        :title="playItem.title"
        :value="playItem.value"
      >
      </van-cell>
    </van-cell-group>
    <div class="settings__gap"></div>
    <!--关于模块-->
    <van-cell-group class="settings__cell" title="关于">
      <van-cell
        :key="index"
        v-for="(aboutItem, index) in settingsData.aboutData"
        :title="aboutItem.title"
      >
      </van-cell>
    </van-cell-group>
    <div class="settings__gap"></div>
    <!--修改密码-->
    <div class="settings__edit" @click="edit">{{ settingsData.edit }}</div>
    <!--退出登录-->
    <div class="settings__quit" @click="quit">{{ settingsData.quit }}</div>
  </div>
</template>

<script>
import BaseNav from "../components/BaseNav";
import settingsInfo from "../../static/settingsInfo";
export default {
  name: "",
  data() {
    return {
      settingsData: settingsInfo.data
    };
  },
  components: {
    BaseNav
  },
  methods: {
    /*进入修改密码页面*/
    edit() {
      if (this.$store.state.currentUserName !== "") {
        this.$router.push("/editPassword");
      } else {
        this.$dialog.alert({
          message: "请先登录账号"
        });
      }
    },
    /*退出登陆页面*/
    quit() {
      this.$store.commit("changeCurrentUserName", "");
      this.$dialog.alert({
        message: "退出账号成功"
      });
    }
  }
};
</script>

<style scoped lang="scss">
.settings {
  text-align: left;
  &__nav {
    padding-left: 0.5rem;
    color: #333333;
    margin-bottom: 0.3rem;
  }
  &__cell {
    text-align: left;
  }
  &__gap {
    background-color: #cccccc;
    opacity: 0.2;
    width: 100%;
    height: 0.2rem;
  }
  &__quit,
  &__edit {
    height: 1.2rem;
    color: #c62f2f;
    text-align: center;
    line-height: 1.2rem;
    font-size: 0.45rem;
  }
  &__edit {
    border-bottom: #e2e3de 0.01rem solid;
  }
}
</style>
