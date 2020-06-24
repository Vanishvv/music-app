<template>
  <div class="list-detail">
    <van-row>

    </van-row>
    <van-row></van-row>
    <van-row></van-row>
    <van-row></van-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  data() {
    return {
      listId: "",
      songListDetail: []
    };
  },
  mounted() {
    this.getListId();
    this.getListDetail();
  },
  methods: {
    getListId() {
      this.listId = this.$route.query.id;
    },
    async getListDetail() {
      let res = await axios.get(
        "http://localhost:3000/playlist/detail?id=" + this.listId
      );
      if (res.status == 200 && res) {
        this.songListDetail = res.data.playlist;
        console.log(this.songListDetail);
      }
    }
  }
};
</script>

<style scoped></style>
