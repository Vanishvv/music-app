/**
 * @Author:Wang Jun
 * @Date:2020/6/29/029 15:04
 * @Description:vue-router路由配置文件
 */
import Vue from "vue";
import VueRouter from "vue-router";
const Index = resolve => require(["../views/Index"], resolve);
const CloudVillage = resolve =>
  require(["../views/unmadePages/CloudVillage"], resolve);
const FindPage = resolve => require(["../views/FindPage"], resolve);
const PersonalPage = resolve => require(["../views/PersonalPage"], resolve);
const Video = resolve => require(["../views/unmadePages/Video"], resolve);
const SongList = resolve => require(["../views/SongList"], resolve);
const LeaderBoard = resolve => require(["../views/LeaderBoard"], resolve);
const DailyList = resolve =>
  require(["../views/unmadePages/DailyList"], resolve);
const DJ = resolve => require(["../views/unmadePages/DJ"], resolve);
const Search = resolve => require(["../views/Search"], resolve);
const SongListDetail = resolve => require(["../views/SongListDetail"], resolve);
const MusicPlayer = resolve => require(["../views/MusicPlayer"], resolve);
const Login = resolve => require(["../views/Login"], resolve);
const Register = resolve => require(["../views/Register"], resolve);
const Settings = resolve => require(["../views/Settings"], resolve);
const EditPassword = resolve => require(["../views/EditPassword"], resolve);
const MySongList = resolve => require(["../views/MySongList"], resolve);

Vue.use(VueRouter);

const routes = [
  {
    /*主页*/
    path: "/",
    name: "index",
    component: Index,
    redirect: "/findPage",
    children: [
      /*云村页面*/
      {
        path: "cloudVillage",
        name: "cloudVillage",
        component: CloudVillage
      },
      /*发现页面*/
      {
        path: "findPage",
        name: "findPage",
        component: FindPage
      },
      /*我的页面*/
      {
        path: "personalPage",
        name: "personalPage",
        component: PersonalPage
      },
      /*视频页面*/
      {
        path: "video",
        name: "video",
        component: Video
      }
    ]
  },
  /*歌单广场页面*/
  {
    path: "/songList",
    name: "songList",
    component: SongList
  },
  /*电台页面*/
  {
    path: "/dj",
    name: "dj",
    component: DJ
  },
  /*排行榜页面*/
  {
    path: "/leaderBoard",
    name: "leaderBoard",
    component: LeaderBoard
  },
  /*日推页面*/
  {
    path: "/dailyList",
    name: "dailyList",
    component: DailyList
  },
  /*搜索页面*/
  {
    path: "/search",
    name: "search",
    component: Search
  },
  /*歌单详情页面*/
  {
    path: "/songListDetail",
    name: "songListDetail",
    component: SongListDetail
  },
  /*音乐播放页面*/
  {
    path: "/musicPlayer",
    name: "musicPlayer",
    component: MusicPlayer
  },
  /*登录页面*/
  {
    path: "/login",
    name: "login",
    component: Login
  },
  /*注册页面*/
  {
    path: "/register",
    name: "register",
    component: Register
  },
  /*设置页面*/
  {
    path: "/settings",
    name: "settings",
    component: Settings
  },
  /*修改密码页面*/
  {
    path: "/editPassword",
    name: "editPassword",
    component: EditPassword
  },
  /*我喜欢的音乐页面*/
  {
    path: "/mySongList",
    name: "mySongList",
    component: MySongList
  }
];

const router = new VueRouter({
  routes
});

export default router;
