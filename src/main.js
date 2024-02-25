import Vue from "vue";
import App from "./App.vue";
import Vuesax from "vuesax";
import "material-icons/iconfont/material-icons.css";
import "vuesax/dist/vuesax.css";
import "font-awesome/css/font-awesome.min.css";
import VueTimepicker from "vue-time-picker";
Vue.use(Vuesax, {
  theme: {
    colors: {
      primary: "#292929",
      success: "rgb(23, 201, 100)",
      danger: "rgb(242, 19, 93)",
      warning: "rgb(255, 130, 0)",
      dark: "rgb(36, 33, 69)",
    },
  },
});

import vSelect from "vue-select";
Vue.component("v-select", vSelect);
Vue.component("vue-timepicker", VueTimepicker);

Vue.use(Vuesax);
export const eventBus = new Vue();
Vue.prototype.$domain = "http://13.36.1.224";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000";
Vue.prototype.$http = axios;
Vue.use(axios);
import Vuex from "vuex";
Vue.use(Vuex);
import Print from "vue-print-nb";
Vue.use(Print);
import "../themeConfig.js";
import "@/firebase/firebaseConfig";
import AuthPlugin from "./plugins/auth";
Vue.use(AuthPlugin);
import acl from "./acl/acl";
import "./globalComponents.js";

import "./optifood/assets/css/style-signin.css";
import "./optifood/assets/css/nucleo-icons.css";
import "./optifood/assets/css/nucleo-svg.css";

styles: [
  '<link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">',
  "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
  "https://unpkg.com/kidlat-css/css/kidlat.css",
  "https://kit.fontawesome.com/42d5adcbca.js",
  "https://fonts.googleapis.com/icon?family=Material+Icons+Round",
  "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900|Roboto+Slab:400,700",
  '<link href="yourpath/vuejs-timepicker/dist/vue2-timepicker.min.css" rel="stylesheet"></link>',
];

const options = {
  name: "_blank",
  specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],

  styles: [
    `https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css`,
    `/bootstrap.min.css`,
    `/kidlat.css`,
    `/style.css`,
  ],
};

import "./assets/scss/main.scss";
import "@/assets/css/main.css";
import router from "./router";
import store from "./store/store";
import i18n from "./i18n/i18n";
import "./filters/filters";
import VueClipboard from "vue-clipboard2";

Vue.use(VueClipboard);

import VueTour from "vue-tour";
Vue.use(VueTour);
require("vue-tour/dist/vue-tour.css");

import VeeValidate from "vee-validate";
Vue.use(VeeValidate);

import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faSpinner);

library.add(faSpinner);
Vue.component("font-awesome-icon", FontAwesomeIcon);

import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: {
    key: "YOUR_API_KEY",
    libraries: "places",
  },
});

import { VueHammer } from "vue2-hammer";
Vue.use(VueHammer);

import "prismjs";
import "prismjs/themes/prism-tomorrow.css";

require("./assets/css/iconfont.css");
import globalAccess from "./layouts/mixins/globalAccess";
Vue.mixin(globalAccess);

Vue.config.productionTip = false;

new Vue({
  store,
  i18n,
  acl,
  render: (h) => h(App),
  router,
}).$mount("#app");
