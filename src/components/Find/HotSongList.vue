<template>
  <div class="hot-song-list">
    <div class="hot-song-list__head">
      <span><strong>{{this.title}}</strong></span>
      <van-button round size="mini">{{this.buttonContent}}</van-button>
    </div>
    <div class="hot-song-list__body">
      <img-card v-for="(item, index) in imgCardData" :key="index" :cardItemData="item"></img-card>
    </div>
  </div>
</template>

<script>
  import ImgCard from "../ImgCard";
  import axios from 'axios'
  export default {
    name: "",
    data(){
      return{
        imgCardData:[],
        title:'你的歌单精选站',
        buttonContent:'查看更多'
      }
    },
    components:{
      ImgCard
    },
    mounted() {
      this.getImgCardData();
    },
    methods:{
      async getImgCardData() {
        let res = await axios.get("http://localhost:3000/personalized?limit=9");
        if (res.status == 200 && res) {
          this.imgCardData=res.data.result;
          for(let i=0;i<9;i++){
            // eslint-disable-next-line no-unused-vars
            let num=this.imgCardData[i].playCount;
            if(parseInt(num/100000)!=0){
              num=num/100000;
              this.imgCardData[i].playCount=parseInt(num).toString()+'万';
            }
          }
        }
      },

    }
  }
</script>

<style scoped lang="scss">
.hot-song-list{
  &__head{
    display: flex;
    justify-content: space-between;
    padding-left: 8%;
    padding-right: 6%;
    padding-top: 5%;
    font-size: 14px;
  }
  &__body{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding-left: 7%;
    padding-right: 5%;
  }
}
</style>
