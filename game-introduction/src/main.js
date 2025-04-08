import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { firestorePlugin } from "vuefire";
import { firebaseDb } from "./firebase/firebaseInit"; // Firebaseの初期化

const app = createApp(App);

app.use(router);
app.use(firestorePlugin); // VueFire プラグインを登録
app.mount("#app");
