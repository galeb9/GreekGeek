import { createStore } from 'vuex';
import { db, auth } from '@/components/firebaseInit.js'

const store = createStore({
    state() {
        return {
            avatarImg: 'greek-geek.png',
            username: 'user404',
            goal: 100,
            pushupsToday: 0
        };
    },
    mutations: { // for functions
        getUserData(state){
            try {
                db.collection("users").doc(auth.currentUser.uid).get()
                .then(user => {
                  state.avatarImg = user.data().userImg
                  state.username = user.data().username
                  state.goal = user.data().goal
                  state.pushupsToday = user.data().pushupsToday
                })    
            } catch (error) {
                console.log(error)
            }
        },
    },
    actions: { // best use of functions
        getUserData(context){
            context.commit('getUserData')
        }
    },
    getters: { // same as computed
        myAvatar(state) {
            return state.avatarImg
        },
        myUsername(state){
            return state.username
        },
        myGoal(state){
            return state.goal
        },
        myPushups(state){
            return state.pushupsToday
        }

    }, 
})

export default store;