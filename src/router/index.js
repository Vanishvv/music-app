import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index"
import CloudVillage from "../views/CloudVillage";
import FindPage from "../views/FindPage";
import PersonalPage from "../views/PersonalPage";
import Video from "../views/Video";
import SongList from "../views/SongList";
import LeaderBoard from "../views/LeaderBoard";
import DailyList from "../views/DailyList";
import DJ from "../views/DJ";
import Search from "../views/Search";
import SongListDetail from "../views/SongListDetail";
import MusicPlayer from "../views/MusicPlayer";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: Index,
    redirect:'/findPage',
    children:[
      {
        path: "cloudVillage",
        name: "cloudVillage",
        component: CloudVillage
      },
      {
        path: "findPage",
        name: "findPage",
        component: FindPage
      },
      {
        path: "personalPage",
        name: "personalPage",
        component: PersonalPage
      },
      {
        path: "video",
        name: "video",
        component: Video
      }
    ]
  },
  {
    path: "/songList",
    name: "songList",
    component: SongList,
  },
  {
    path: "/dj",
    name: "dj",
    component: DJ,
  },
  {
    path: "/leaderBoard",
    name: "leaderBoard",
    component: LeaderBoard,
  },
  {
    path: "/dailyList",
    name: "dailyList",
    component: DailyList,
  },
  {
    path: "/search",
    name: "search",
    component: Search,
  },
  {
    path: "/songListDetail",
    name: "songListDetail",
    component: SongListDetail,
  },
  {
    path: "/musicPlayer",
    name: "musicPlayer",
    component: MusicPlayer,
  },
];

const router = new VueRouter({
  routes
});

export default router;
