/**
 * @Author:Wang Jun
 * @Date:2020/6/23/023 14:46
 * @Description:圆形菜单按钮
 */
<template>
  <div class="circle-menu">
    <div
      class="circle-menu__item"
      v-for="(item, index) in menuInfo"
      :key="index"
    >
      <div class="circle-menu__item__icon" @click="goPage(item.path)">
        <i :class="item.iconName"></i>
      </div>
      <span class="circle-menu__item__title">{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["menuData"],
  data() {
    return {
      menuInfo: this.menuData
    };
  },
  methods: {
    goPage(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style scoped lang="scss">
.circle-menu {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  &__item {
    &__icon {
      color: white;
      background-color: #c62f2f;
      height: 40px;
      width: 40px;
      border-radius: 20px;
      line-height: 40px;
      .iconfont {
        font-size: 23px;
      }
    }
    &__title {
      color: #2c3e50;
      font-size: 12px;
    }
  }
}
</style>
