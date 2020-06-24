/**
 * @Author:Wang Jun
 * @Date:2020/6/24/024 10:44
 * @Description:歌单卡片组件
 */
<template>
  <div class="img-card">
    <span class="img-card__play-count">
      <i class="img-card__play-count__icon iconfont icon-play"></i>
      {{ imgCardPlayCount }}</span>
    <van-image
      :src="imgCardUrl"
      fit="cover"
      radius="0.2rem"
      class="img-card__img"
    ></van-image>
    <slot name="imgTitle"></slot>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["cardUrl","cardPlayCount"],
  data() {
    return {
      imgCardUrl: this.cardUrl,
      imgCardPlayCount:this.cardPlayCount,
    };
  },
  mounted() {
    this.formatNumber();
  },
  methods: {
    formatNumber(){
      let num = this.imgCardPlayCount;
      if (parseInt(num / 10000) != 0) {
        num = num / 10000;
        this.imgCardPlayCount = parseInt(num).toString() + "万";
      }
    }
  },
  watch:{
    'cardUrl'(newVal){
      this.imgCardUrl=newVal
    },
    'cardPlayCount'(newVal){
      this.imgCardPlayCount=newVal;
      this.formatNumber();
    }
  }
};
</script>

<style scoped lang="scss">
.img-card {
  display: flex;
  flex-direction: column;
  height: 4.4rem;
  width: 2.8rem;
  border-radius: 0.5rem;
  &__img{
    border-radius: 0.5rem;
  }
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
