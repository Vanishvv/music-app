import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index"
import CloudVillage from "../views/CloudVillage";
import FindPage from "../views/FindPage";
import PersonalPage from "../views/PersonalPage";
import Video from "../views/Video";

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
  }
];

const router = new VueRouter({
  routes
});

export default router;
