/**
 * @Author:Wang Jun
 * @Date:2020/6/22/022 20:12
 * @Description:应用初始动画
 */
<template>
  <div class="start">
    <div class="start__title">
      {{ this.startData }}
    </div>
    <i class="start__logo iconfont icon-start-logo"></i>
  </div>
</template>

<script>
export default {
  name: "start",
  props: ["startInfo"],
  data() {
    return {
      startData: this.startInfo
    };
  }
};
</script>

<style scoped lang="scss">
.start {
  background-color: #c62f2f;
  text-align: center;
  height: 100%;
  width: 100%;
  color: white;
  &__title {
    font-size: 1rem;
    font-family: "Microsoft YaHei";
    padding-top: 35%;
    font-style:italic;
    animation:enter 3s ;
    -webkit-animation:enter 3s;
  }
  &__logo{
    font-size: 3rem;
    position: absolute;
    bottom: 0.1rem;
    right: 33%;
  }
}
@keyframes enter
{
  from {opacity: 0;}
  to {opacity: 1;}
}
@-webkit-keyframes enter
{
  from {opacity: 0;}
  to {opacity: 1;}
}
</style>
