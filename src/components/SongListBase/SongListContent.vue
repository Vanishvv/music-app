/**
 * @Author:Wang Jun
 * @Date:2020/6/24/024 17:34
 * @Description:歌单详情页面
 */
<template>
  <div class="list-content">
    <div
      v-for="(item, index) in songTracks"
      :key="index"
      class="list-content__item"
      @click="playSong(item.id)"
    >
      <span class="list-content__item__num">{{ index + 1 }}</span>
      <div>
        <span class="list-content__item__name">{{ item.name }}</span>
        <span>
          <span
            class="list-content__item__ar"
            v-for="(arItem, index) in item.ar"
            :key="index"
          >
            {{ arItem.name }}
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props:["songTracks"],
  data(){
    return{
      contentTracks:this.songTracks
    }
  },
  methods:{
    playSong(id) {
      console.log(id);
    }
  }
};
</script>

<style scoped lang="scss">
.list-content {
  font-size: 0.2rem;
  margin-top: 0.3rem;
  &__item {
    height: 1.5rem;
    display: flex;
    margin-left: 0.2rem;
    align-items: center;
    &__num {
      font-size: 0.4rem;
      color: darkgray;
      width: 1rem;
      margin-right: 0.2rem;
    }
    &__name {
      font-size: 0.4rem;
      color: #333333;
    }
    div {
      display: flex;
      flex-direction: column;
      color: gray;
      span {
        text-align: left;
      }
    }
  }
}
</style>
