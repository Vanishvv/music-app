/**
 * @Author:Wang Jun
 * @Date:2020/6/24/024 10:44
 * @Description:歌单卡片组件
 */
<template>
  <div class="img-card" @click="goListDetial(cardItemInfo.id)">
    <span class="img-card__play-count">
      <i class="img-card__play-count__icon iconfont icon-play"></i>
      {{ cardItemInfo.playCount }}</span
    >
    <van-image
      :src="cardItemInfo.picUrl"
      fit="cover"
      height="4em"
      width="4em"
      radius="0.5em"
      class="img-card__img"
    ></van-image>
    <slot name="imgTitle"></slot>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["cardItemData"],
  data() {
    return {
      cardItemInfo: this.cardItemData
    };
  },
  methods: {
    goListDetial(id) {
      console.log(id);
      this.$router.push({
        name: "songListDetail",
        query: {
          id: id
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.img-card {
  display: flex;
  flex-direction: column;
  width: 4em;
  &__play-count {
    color: white;
    font-size: 0.2rem;
    position: relative;
    top: 0.4rem;
    right: 0.2rem;
    z-index: 999;
    text-align: right;
    &__icon {
      font-size: 0.2rem;
    }
  }
}
</style>
