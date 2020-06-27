import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@vant/touch-emulator";
import "amfe-flexible";
import qs from 'qs'
import {
  Field,
  Form,
  Col,
  Row,
  Button,
  NavBar,
  Icon,
  Swipe,
  SwipeItem,
  Popup,
  Notify,
  Dialog,
  Image as VanImage,
  ShareSheet,
  Cell,
  CellGroup,
  Switch,
  Progress
} from "vant";


Vue.config.productionTip = false;
Vue.prototype.qs = qs;
Vue.use(Col);
Vue.use(Row);
Vue.use(Button);
Vue.use(NavBar);
Vue.use(Icon);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Popup);
Vue.use(VanImage);
Vue.use(ShareSheet);
Vue.use(Form);
Vue.use(Field);
Vue.use(Notify);
Vue.use(Dialog);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Switch);
Vue.use(Progress);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
