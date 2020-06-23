/**
* @Author:Wang Jun
* @Date:2020/6/22/022 23:44
* @Description:发现音乐
*/
<template>
  <div>
    <swipe></swipe>
    <circle-menu :menuData="findInfo.circleMenuData"></circle-menu>
    <hot-song-list></hot-song-list>
  </div>
</template>

<script>
import swipe from "../components/Find/Swipe";
import circleMenu from "../components/Find/CircleMenu";
import hotSongList from "../components/Find/HotSongList";
import findData from "../../static/findData";
export default {
  name: "",
  data() {
    return {
      findInfo: findData.data,
      load: true
    };
  },
  methods: {},
  components: {
    swipe,
    circleMenu,
   hotSongList
  }
};
</script>

<style scoped lang="scss"></style>
