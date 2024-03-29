import { createApp } from "vue";
import router from "./scripts/router.js";
import App from "./App.vue";
// Fontawesome
import "./scripts/fa_icons.js";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Firebase
import { auth } from "@/scripts/firebaseInit.js";
import "./scripts/firebaseInit";

// Vuex
import store from "./scripts/stores/parent-vuex.js";

// Pinia
import { createPinia } from "pinia";
// import { useRootnStore } from "./scripts/stores/parent-pinia.js";

// PWA
import "./registerServiceWorker";

// Component imports
import BaseButton from "./components/UI/BaseButton.vue";
import BaseContainer from "./components/UI/BaseContainer.vue";
import BaseInput from "./components/UI/BaseInput.vue";
import BaseIconLink from "./components/UI/BaseIconLink.vue";
import BaseNotification from "./components/UI/BaseNotification.vue";
import HomeSection from "./components/UI/HomeSection.vue";
import BaseNotif from "@/components/UI/BaseNotif.vue";
import GoBack from "@/components/UI/GoBack.vue";
import BaseIcon from "@/components/UI/BaseIcon.vue";
import BasePopup from "@/components/UI/BasePopup.vue";
import BaseOverlay from "@/components/UI/BaseOverlay.vue";
import TheHeader from "@/components/layout/TheHeader.vue";
import BaseProgress from "@/components/UI/BaseProgress.vue";
import Loader from "@/components/UI/LoaderThingy.vue";
import BaseProductSlider from "@/components/UI/BaseProductSlider.vue";

let app;
auth.onAuthStateChanged(() => {
  // console.log(user); // was as arg, maybe futur problems??
  if (!app) {
    app = createApp(App);
    // global register of components:
    app
      .component("font-awesome-icon", FontAwesomeIcon)
      .component("BaseButton", BaseButton)
      .component("BaseContainer", BaseContainer)
      .component("BaseInput", BaseInput)
      .component("BaseIconLink", BaseIconLink)
      .component("BaseNotification", BaseNotification)
      .component("TheHeader", TheHeader)
      .component("HomeSection", HomeSection)
      .component("BaseNotif", BaseNotif)
      .component("GoBack", GoBack)
      .component("BaseIcon", BaseIcon)
      .component("BasePopup", BasePopup)
      .component("BaseOverlay", BaseOverlay)
      .component("BaseProgress", BaseProgress)
      .component("BaseProductSlider", BaseProductSlider)
      .component("Loader", Loader);

    const pinia = createPinia();
    app.use(pinia);
    // pinia.use(useRootnStore);

    app.use(store);
    app.use(router);
    app.mount("#app");
  }
});

// add components
