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
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-around;
  &__item {
    &__icon {
      color: white;
      background-color: #c62f2f;
      height: 1.2rem;
      width: 1.2rem;
      border-radius: 1.25rem;
      line-height: 1rem;
      .iconfont {
        font-size: 0.7rem;
      }
    }
    &__title {
      color: #2c3e50;
      font-size: 0.35rem;
    }
  }
}
</style>
