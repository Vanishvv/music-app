<template>
  <div class="img-card" @click="goListDetial(cardItemInfo.id)">
    <span class="img-card__play-count">
       <i class="img-card__play-count__icon iconfont icon-play"></i>
      {{cardItemInfo.playCount}}</span>
      <van-image
              :src="cardItemInfo.picUrl"
              fit="cover"
              height="100px"
              width="100px"
              radius="10px"
              class="img-card__img"
      ></van-image>
    <span class="img-card__title">{{cardItemInfo.name}}</span>
  </div>
</template>

<script>
  export default {
    name: "",
    props:["cardItemData"],
    data(){
      return{
        cardItemInfo:this.cardItemData
      }
    },
    methods:{
      goListDetial(id){
        console.log(id);
        this.$router.push({
          name: 'songListDetail',
          query: {
            id: id
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .img-card{
    display: flex;
    flex-direction: column;
    width: 100px;
    &__title{
      font-size: 12px;
      text-align: left;
      overflow: hidden;
    }
    &__play-count{
      color: white;
      font-size: 5px;
      position: relative;
      top: 15px;
      right: 5px;
      z-index: 999;
      text-align: right;
      &__icon{
        font-size: 12px;
      }
    }
  }
</style>
