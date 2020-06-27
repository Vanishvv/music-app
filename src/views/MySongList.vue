<template>
  <div class="my-song">
    <base-nav class="my-song__nav" :title="title"></base-nav>
    <song-list-content :songTracks="myMusic"></song-list-content>
    <mini-music-player></mini-music-player>
  </div>
</template>

<script>
import axios from 'axios'
var songIdData = [];
var traksId=[];
import BaseNav from "../components/BaseNav";
import SongListContent from "../components/SongListBase/SongListContent";
import MiniMusicPlayer from "../components/MiniMusicPlayer";
export default {
  name: "",
  data(){
    return{
      myMusic: [],
      title:'我喜欢的音乐'
    }
  },
  methods:{
    async getSongCollection() {
      await axios
        .get("http://localhost:3001/api/getSongCollection")
        .then(response => {
          // eslint-disable-next-line no-undef
          app.arr = response.data.data;
          songIdData.length = 0;
          var j = 0;
          // eslint-disable-next-line no-undef
          for (let i = 0; i < app.arr.length; i++) {
            if (
              // eslint-disable-next-line no-undef
              app.arr[i].username == this.$store.state.currentUserName
            ) {
              // eslint-disable-next-line no-undef
              songIdData[j] = app.arr[i].songid;
              j++;
            }
          }
        });
      for (let i = 0; i < songIdData.length; i++) {
        let res = await axios.get(
          "http://localhost:3000/song/detail?ids=" + songIdData[i]
        );
        if (res.status == 200 && res) {
          var obj={
            id:songIdData[i],
            name:res.data.songs[0].al.name,
            ar:res.data.songs[0].ar
          }
          this.myMusic.push(obj);
        }
      }
      for(let i=0;i<songIdData.length;i++){
        var obj1={
          id:songIdData[i]
        }
        traksId.push(obj1);
      }
    }
  },
  mounted() {
    this.getSongCollection();
  },
  components: {
    BaseNav,
    SongListContent,
    MiniMusicPlayer
  }
};
</script>

<style scoped lang="scss">
.my-song {
  &__nav {
    padding-left: 0.5rem;
    color: #333333;
    margin-bottom: 0.3rem;
  }
}
</style>
