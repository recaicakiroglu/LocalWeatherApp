import Vue from "vue";
import App from "./App.vue";

import "./assets/tailwind.css";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/assets/css/leaflet.css";
import "weather-icons/css/weather-icons.min.css";

Vue.config.productionTip = false;
new Vue({
  render: (h) => h(App),
}).$mount("#app");
