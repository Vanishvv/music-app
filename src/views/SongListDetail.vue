<template>
  <div class="list-detail">
    <div class="list-detail__head">
      <div class="list-detail__head__nav">
        <i class="iconfont icon-go-back" @click="goback"></i>
        <span>歌单</span>
      </div>
      <div class="list-detail__head__info">
        <img-card
          :card-play-count="songListDetail.playCount"
          :card-url="songListDetail.coverImgUrl"
          class="list-detail__head__info__img-card"
        ></img-card>
        <div class="list-detail__head__info__detail">
          <span class="list-detail__head__info__detail__name">
            {{ songListDetail.name }}
          </span>
          <span class="list-detail__head__info__detail__author">
            <van-image
              round
              :src="songListDetail.creator.avatarUrl"
              width="0.6rem"
              height="0.6rem"
            />
            <span>{{ songListDetail.creator.nickname }}</span>
          </span>
          <span class="list-detail__head__info__detail__description">
            {{ songListDetail.description }}
          </span>
        </div>
      </div>
      <div class="list-detail__head__choice">
        <div class="list-detail__head__choice__item">
          <i class="iconfont icon-comment"></i>
          <span>评论</span>
        </div>
        <div class="list-detail__head__choice__item">
          <i class="iconfont icon-share"></i>
          <span>分享</span>
        </div>
        <div class="list-detail__head__choice__item">
          <i class="iconfont icon-download"></i>
          <span>下载</span>
        </div>
        <div class="list-detail__head__choice__item">
          <i class="iconfont icon-multi-choice"></i>
          <span>多选</span>
        </div>
      </div>
    </div>
    <div class="list-detail__list">
      <div class="list-detail__list__head">
        <i class="iconfont icon-play-list"></i>
        <span>播放全部</span>
        <van-button
          round
          size="mini"
          type="danger"
          class="list-detail__list__head__add"
          >收藏歌单</van-button
        >
      </div>
      <div class="list-detail__list__content">
        <div
          v-for="(item, index) in songListDetail.tracks"
          :key="index"
          class="list-detail__list__content__item"
          @click="playSong(item.id)"
        >
          <span class="list-detail__list__content__item__num">{{
            index + 1
          }}</span>
          <div>
            <span class="list-detail__list__content__item__name">{{
              item.name
            }}</span>
            <span>
              <span
                class="list-detail__list__content__item__ar"
                v-for="(arItem, index) in item.ar"
                :key="index"
              >
                {{ arItem.name }}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ImgCard from "../components/ImgCard";
export default {
  name: "",
  data() {
    return {
      listId: "",
      songListDetail: []
    };
  },
  mounted() {
    this.getListDetail();
    this.getListId();
  },
  methods: {
    getListId() {
      this.listId = this.$route.query.id;
    },
    async getListDetail() {
      let res = await axios.get(
        "http://localhost:3000/playlist/detail?id=" + this.$route.query.id
      );
      if (res.status == 200 && res) {
        this.songListDetail = res.data.playlist;
      }
    },
    goback() {
      this.$router.go(-1);
    },
    /*播放歌曲*/
    playSong(id){
      console.log(id);
    }
  },
  components: {
    ImgCard
  }
};
</script>

<style scoped lang="scss">
.list-detail {
  &__list {
    background-color: white;
    margin-top: -0.5rem;
    height: 8rem;
    border-radius: 0.5rem 0.5rem 0 0;
    &__content {
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
        &__name{
          font-size: 0.4rem;
          color: #333333;
        }
        div {
          display: flex;
          flex-direction: column;
          color: gray;
          span{
            text-align: left;
          }
        }
      }
    }
    &__head {
      display: flex;
      align-items: center;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      padding-top: 0.3rem;
      color: white;
      i {
        font-size: 0.7rem;
        color: #3f4543;
      }
      span {
        color: #3f4543;
        font-size: 0.4rem;
        margin-left: 0.2rem;
        display: flex;
        align-items: center;
      }
      &__add {
        span {
          color: white;
          font-size: 0.35rem;
          padding-left: 0.13rem;
          padding-right: 0.4rem;
        }
        margin-left: 4.1rem;
      }
    }
  }
  &__head {
    background-image: linear-gradient(135deg, #6c7b74, #3f4543);
    height: 8rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    font-size: 0.3rem;
    &__choice {
      display: flex;
      justify-content: space-around;
      color: white;
      margin-top: 0.5rem;
      &__item {
        display: flex;
        flex-direction: column;
        i {
          font-size: 0.6rem;
        }
      }
    }
    &__info {
      margin-top: 0.4rem;
      display: flex;
      &__detail {
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
      &__img-card {
        width: 4rem;
        height: 4.2rem;
      }
    }
    &__nav {
      color: white;
      text-align: left;
      font-size: 0.5rem;
      padding-top: 0.4rem;
      i {
        font-size: 0.5rem;
        margin-right: 0.5rem;
      }
    }
  }
}
</style>
