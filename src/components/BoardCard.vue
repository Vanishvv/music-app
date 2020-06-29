/**
* @Author:Wang Jun
* @Date:2020/6/28/028 16:17
* @Description:排行榜卡片
*/
<template>
  <div class="board-card">
    <div class="board-card__img">
      <!--排行榜封面-->
      <img :src="cardData.picUrl" @click="goToDetail(cardData.id)" />
    </div>
    <div class="board-card__song-list">
      <!--排行榜前三名歌曲信息-->
      <div
        class="board-card__song-list__item"
        v-for="(item, index) in cardData.track"
        :key="index"
      >
        {{ index + 1 + ". " + item.first + "-" + item.second }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["cardInfo"],
  data() {
    return {
      cardData: this.cardInfo //排行榜卡片数据
    };
  },
  methods: {
    /*查看排行榜详情(实际跳转到歌单详情并传递id)*/
    goToDetail(id) {
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
@mixin img() {
  height: 3rem;
  border-radius: 0.2rem;
}

.board-card {
  @include img();
  display: flex;
  &__img {
    img {
      @include img();
      width: 3rem;
    }
  }
  &__song-list {
    margin-left: 0.3rem;
    font-size: 0.35rem;
    display: flex;
    flex-direction: column;
    &__item {
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
