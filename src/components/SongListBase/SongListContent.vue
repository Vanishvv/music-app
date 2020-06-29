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
      <!--条目编号-->
      <span class="list-content__item__num">{{ index + 1 }}</span>
      <div>
        <!--歌曲名-->
        <span class="list-content__item__name">{{ item.name }}</span>
        <span>
          <!--演唱者名-->
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
import axios from "axios";
export default {
  name: "",
  props: ["songTracks"], //歌单列表数据
  data() {
    return {};
  },
  methods: {
    /*播放歌曲函数，传递id，异步获取数据并上传到vuex状态管理*/
    async playSong(id) {
      this.$store.commit("changeCurrentSongId", id + "");
      let cSongId = this.$store.state.currentSongId;
      let songData = [];
      let res1 = await axios.get(
        "http://localhost:3000/song/url?id=" + cSongId
      );
      if (res1.status === 200 && res1) {
        songData[0] = res1.data.data[0].url;
      }
      let res = await axios.get(
        "http://localhost:3000/song/detail?ids=" + cSongId
      );
      if (res.status === 200 && res) {
        songData[1] = res.data.songs[0].name;
        songData[2] = res.data.songs[0].al.picUrl;
        songData[3] = res.data.songs[0].ar[0].name;
      }
      this.$store.commit("changeCurrentSongData", songData);
    }
  }
};
</script>

<style scoped lang="scss">
$font-size: 0.4rem;
.list-content {
  font-size: 0.2rem;
  margin: 0.3rem 0 1.5rem 0;
  &__item {
    height: 1.5rem;
    display: flex;
    margin-left: 0.2rem;
    align-items: center;
    &__num {
      font-size: $font-size;
      color: darkgray;
      width: 1rem;
      margin-right: 0.2rem;
    }
    &__name {
      font-size: $font-size;
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
