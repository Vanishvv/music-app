/**
 * @Author:Wang Jun
 * @Date:2020/6/24/024 17:09
 * @Description:歌单详情中的详细介绍
 */
<template>
  <div class="song-list-info">
    <span class="song-list-info__name">
      {{ infoName }}
    </span>
    <span class="song-list-info__author">
      <van-image round :src="infoIcon" width="0.6rem" height="0.6rem" />
      <span>{{ infoAuthor }}</span>
    </span>
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
      infoName: this.listName,
      infoIcon: this.listIcon,
      infoAuthor: this.listAuthor,
      infoDescription: this.listDescription
    };
  }
};
</script>

<style scoped lang="scss">
.song-list-info {
  display: flex;
  flex-direction: column;
  width: 4rem;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  padding-top: 0.3rem;
  text-align: left;
  &__name {
    font-size: 0.42rem;
    color: white;
    height: 1.8rem;
  }
  &__author {
    display: flex;
    align-items: center;
    color: #e2e3de;
    font-size: 0.35rem;
    margin-bottom: 0.4rem;
    span {
      margin-left: 0.2rem;
    }
  }
  &__description {
    color: #e2e3de;
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
