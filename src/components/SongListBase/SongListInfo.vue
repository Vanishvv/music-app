/**
* @Author:Wang Jun
* @Date:2020/6/24/024 17:09
* @Description:歌单详情中的详细介绍
*/
<template>
  <div class="song-list-info">
    <!--歌单名称-->
    <span class="song-list-info__name">
      {{ infoName }}
    </span>
    <!--歌单创建者信息-->
    <span class="song-list-info__author">
      <!--歌单创建者头像-->
      <van-image round :src="infoIcon" width="0.6rem" height="0.6rem" />
      <!--歌单创建者名称-->
      <span>{{ infoAuthor }}</span>
    </span>
    <!--歌单详情描述-->
    <span class="song-list-info__description">
      {{ infoDescription }}
    </span>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["listName", "listIcon", "listAuthor", "listDescription"],
  data() {
    return {
      infoName: this.listName, //歌单名
      infoIcon: this.listIcon, //创建者头像
      infoAuthor: this.listAuthor, //创建者名称
      infoDescription: this.listDescription //歌单描述
    };
  }
};
</script>

<style scoped lang="scss">
$font-color: #e2e3de;
.song-list-info {
  display: flex;
  flex-direction: column;
  width: 4rem;
  padding: 0.3rem 0.4rem 0;
  text-align: left;
  &__name {
    font-size: 0.42rem;
    color: white;
    height: 1.8rem;
  }
  &__author {
    display: flex;
    align-items: center;
    color: $font-color;
    font-size: 0.35rem;
    margin-bottom: 0.4rem;
    span {
      margin-left: 0.2rem;
    }
  }
  &__description {
    color: $font-color;
    font-size: 0.2rem;
    height: 1rem;
    width: 3rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
}
</style>
