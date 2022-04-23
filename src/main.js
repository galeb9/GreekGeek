import { createApp } from 'vue'
import router from './scripts/router.js'
import App from './App.vue'
//fontawsome
import './scripts/fa_icons.js'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
//import { auth } from '@/components/firebaseInit.js'
//import './components/firebaseInit'

const app = createApp(App)

// component imports
import BaseButton from './components/UI/BaseButton.vue'
import BaseContainer from './components/UI/BaseContainer.vue'
import BaseInput from './components/UI/BaseInput.vue'
import BaseIconLink from './components/UI/BaseIconLink.vue'
import BaseNotification from './components/UI/BaseNotification.vue'



// add components
app.component("font-awesome-icon", FontAwesomeIcon)
    .component('BaseButton', BaseButton)
    .component('BaseContainer', BaseContainer)
    .component('BaseInput', BaseInput)
    .component("BaseIconLink", BaseIconLink)
    .component("BaseNotification", BaseNotification)
    
app.use(router);
app.mount('#app')