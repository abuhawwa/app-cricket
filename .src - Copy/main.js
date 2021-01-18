import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");

app.config.globalProperties.$filters = {
  strikeRate(item) {
    if (!item.runs) return 0;
    return ((item.runs * 100) / item.balls).toFixed(2);
  },
  economy(item) {
    if (!item.runs) return 0;
    return (item.runs / item.overs).toFixed(2);
  },
};
