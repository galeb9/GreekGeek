import { createApp } from 'vue'
import router from './scripts/router.js'
import App from './App.vue'

const app = createApp(App)

// component imports
import BaseButton from './components/UI/BaseButton.vue'
import BaseContainer from './components/UI/BaseContainer.vue'
import BaseInput from './components/UI/BaseInput.vue'
import BaseIconLink from './components/UI/BaseIconLink.vue'
import BaseNotification from './components/UI/BaseNotification.vue'

//fontawsome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBullseye, faHouse, faFireFlameCurved, faChartPie, faGear, faCircleCheck, faCheck, faArrowRightToBracket, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faBullseye);
library.add(faHouse);
library.add(faFireFlameCurved);
library.add(faChartPie);
library.add(faGear);
library.add(faCircleCheck);
library.add(faCheck);
library.add(faArrowRightToBracket);
library.add(faRightFromBracket);


// add components
app.component("font-awesome-icon", FontAwesomeIcon)
    .component('BaseButton', BaseButton)
    .component('BaseContainer', BaseContainer)
    .component('BaseInput', BaseInput)
    .component("BaseIconLink", BaseIconLink)
    .component("BaseNotification", BaseNotification)

    

    
app.use(router);
app.mount('#app')