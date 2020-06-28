/**
 * @Author:Wang Jun
 * @Date:2020/6/28/028 16:17
 * @Description:排行榜卡片
 */
<template>
  <div class="board-card">
    <div class="board-card__img">
      <img :src="cardData.picUrl" @click="goToDetail(cardData.id)"/>
      <span class="board-card__img__title">{{cardData.title}}</span>
    </div>
    <div class="board-card__song-list">
      <div class="board-card__song-list__item" v-for="(item,index) in cardData.track" :key="index">
        {{index+1+'. '+item.first+'-'+item.second}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    props:["cardInfo"],
    data(){
      return{
        cardData:this.cardInfo
      }
    },
    methods:{
      goToDetail(id){
        this.$router.push({
          name: "songListDetail",
          query: {
            id: id
          }
        });
      }
    }
  }
</script>

<style scoped lang="scss">
.board-card{
  height: 3rem;
  border-radius: 0.2rem;
  display: flex;
  &__img{
    width: 3.3rem;
    img{
      height:3rem;
      width: 3rem;
      border-radius: 0.2rem;
    }
    &__title{
      color: white;
      font-size: 0.1rem;
      text-align: left;
      padding-left: 0.2rem;
    }
  }
  &__song-list{
    font-size:0.35rem;
    display: flex;
    flex-direction: column;
    &__item{
      text-align: left;
      width: 4rem;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      line-height: 1rem;
      color: #6c7b74;
    }
  }
}
</style>
