<template>
  <div class="side-popup">
    <div class="side-popup__head">
      <span v-if="showUserName">{{ userName }}</span>
      <van-button
        round
        type="info"
        color="#c62f2f"
        size="small"
        v-if="showLogin"
        @click="goLogin"
        >登录</van-button
      >
    </div>
    <div class="side-popup__icons  van-hairline--bottom">
      <div
        class="side-popup__icons__item"
        v-for="(item, index) in sidePopupInfo.iconsData"
        :key="index"
      >
        <i :class="item.iconName"></i>
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div class="side-popup__list van-hairline--bottom">
      <div
        class="side-popup__list__item"
        v-for="(item, index) in sidePopupInfo.listData"
        :key="index"
      >
        <i :class="item.iconName"></i>
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div class="side-popup__footer">
      <div
        class="side-popup__footer__item"
        v-for="(item, index) in sidePopupInfo.footerData"
        :key="index"
      >
        <i :class="item.iconName"></i>
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
      userName: "WangJun",
      showUserName: false,
      showLogin: true,
      sidePopupInfo: sidePopupData.data
    };
  },
  methods: {
    goLogin() {
      this.$router.push("/login");
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.side-popup {
  display: flex;
  flex-direction: column;
  text-align: left;
  font-size: 0.7rem;
  padding-left: 0.55rem;
  padding-top: 0.8rem;
  &__icons {
    margin-top: 0.4rem;
    padding-bottom: 0.5rem;
    padding-right: 0.5rem;
    font-size: 0.3rem;
    display: flex;
    justify-content: space-between;
    &__item {
      display: flex;
      flex-direction: column;
      text-align: center;
      color: #6c7b74;
      i {
        font-size: 0.7rem;
        color: #c62f2f;
      }
    }
  }
  &__list {
    margin-top: 0.5rem;
    color: #333333;
    padding-bottom: 0.4rem;
    &__item {
      display: flex;
      justify-items: center;
      height: 1.3rem;
    }
    i {
      font-size: 0.6rem;
      line-height: 1.3rem;
    }
    span {
      line-height: 1.3rem;
      font-size: 0.4rem;
      margin-left: 0.2rem;
    }
  }
  &__head {
    color: #333333;
    padding-left: 0.1rem;
  }
  &__footer {
    color: #333333;
    display: flex;
    padding-right: 0.5rem;
    justify-content: space-between;
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
    &__item {
      line-height: 1rem;
      display: flex;
      justify-items: center;
    }
    i {
      font-size: 0.6rem;
      line-height: 1rem;
    }
    span {
      font-size: 0.4rem;
      line-height: 1rem;
    }
  }
}
</style>
