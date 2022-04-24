import { createApp } from 'vue'
import router from './scripts/router.js'
import App from './App.vue'
// fontawsome
import './scripts/fa_icons.js'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// firebase
import { auth } from '@/components/firebaseInit.js'
import './components/firebaseInit'
// component imports
import BaseButton from './components/UI/BaseButton.vue'
import BaseContainer from './components/UI/BaseContainer.vue'
import BaseInput from './components/UI/BaseInput.vue'
import BaseIconLink from './components/UI/BaseIconLink.vue'
import BaseNotification from './components/UI/BaseNotification.vue'
import WorkInProgress from './components/UI/WorkInProgress.vue'


let app;
//const app = createApp(App)
auth.onAuthStateChanged( user => {
    console.log(user)
    if(!app) {
        app = createApp(App)
        app.component("font-awesome-icon", FontAwesomeIcon)
            .component('BaseButton', BaseButton)
            .component('BaseContainer', BaseContainer)
            .component('BaseInput', BaseInput)
            .component("BaseIconLink", BaseIconLink)
            .component("BaseNotification", BaseNotification)
            .component("WorkInProgress", WorkInProgress)
            
        app.use(router);
        app.mount('#app')
    }
})







// add components
