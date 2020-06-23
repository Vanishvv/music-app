import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@vant/touch-emulator";
import { Col, Row, Button, NavBar, Icon, Swipe, SwipeItem ,Popup,Image as VanImage} from "vant";

Vue.config.productionTip = false;
Vue.use(Col);
Vue.use(Row);
Vue.use(Button);
Vue.use(NavBar);
Vue.use(Icon);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Popup);
Vue.use(VanImage);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
