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
import Login from "../views/Login";
import Register from "../views/Register";
import Settings from "../views/Settings";
import EditPassword from "../views/EditPassword";
import MySongList from "../views/MySongList";

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
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings,
  },
  {
    path: "/editPassword",
    name: "editPassword",
    component: EditPassword,
  },
  {
    path: "/mySongList",
    name: "mySongList",
    component: MySongList,
  }
];

const router = new VueRouter({
  routes
});

export default router;
