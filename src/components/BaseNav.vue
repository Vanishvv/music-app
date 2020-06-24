/**
 * @Author:Wang Jun
 * @Date:2020/6/24/024 17:09
 * @Description:各个页面中的返回导航组件
 */
<template>
  <div class="base-nav">
    <i class="iconfont icon-go-back" @click="goback"></i>
    <span>{{navTitle}}</span>
  </div>
</template>

<script>
  export default {
  props:["title"],
    name: "",
    data(){
    return{
      navTitle:this.title
    }
    },
    methods:{
      goback() {
        this.$router.go(-1);
      },
    }
  }
</script>

<style scoped lang="scss">
  .base-nav {
    color: white;
    text-align: left;
    font-size: 0.5rem;
    padding-top: 0.4rem;
    i {
      font-size: 0.5rem;
      margin-right: 0.5rem;
    }
  }
</style>
