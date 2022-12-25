import { createStore } from 'vuex';
import { db, auth } from '@/scripts/firebaseInit.js'

// const usersModule = {
//     state() {
//         return {
           
//         }
//     },
//     mutations: {

//     },
//     actions: {
   
//     },
//     getters: {

//     }
// }


const store = createStore({
    // modules: {
    //     users: usersModule
    // },
    state() {
        return {
            avatarImg: 'greek-geek.png',
            username: 'user404',
            goal: 100,
            pushupsToday: 0,
            allUsers: [],
            sampleUsers: [],
            areProfileNotifications: false,
            myFriendsCount: 0
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
                console.log("Napaka iz vuex-a")
            }
        },
        getUsers(state){
            db.collection("users")
                .where("username", "!=", state.username)
                .orderBy("username","asc")
                .get()
                .then((querySnapshot) => {
                let count = 0;
                querySnapshot.forEach((user) => {
                    state.allUsers.push({ // the real list user will search for friends
                        username: user.data().username,
                        userImg: user.data().userImg,
                        goal: user.data().goal
                    })
                    // console.log(user.data())
                    if(count < 6){ // makes a sample list
                        state.sampleUsers.push({
                            username: user.data().username,
                            userImg: user.data().userImg,
                            goal: user.data().goal
                        })
                        count++;
                    }
                });
            });
        },
        profileNotificationsCheck(state) {
            db.collection("users")
              .doc(auth.currentUser.uid)
              .collection("friend-requests")
              .get()
              .then(snapshot => {
                snapshot.forEach(doc => {
                    if(doc.data()) {
                        state.areProfileNotifications = true;
                    }
                })
              })
      
            db.collection("users")
              .doc(auth.currentUser.uid)
              .collection("arena-requests")
              .get()
              .then(snapshot => {
                  snapshot.forEach(doc => {
                    if(doc.data()) {
                        state.areProfileNotifications = true;
                    }
                  })
              })
        },
        getMyFriendsCount(state){
            db.collection("users")
            .doc(auth.currentUser.uid)
            .collection("friends")
            .get()
            .then(snapshot => {
              snapshot.forEach(() => {
                state.myFriendsCount++
              })
            })
        },
    },
    actions: { // best use of functions
        getUserData(context){
            context.commit('getUserData') // used like ->  this.$store.dispatch("getUserData")
        },
        getUsers(context){
            context.commit('getUsers')
        },
        profileNotificationsCheck(context) {
            context.commit('profileNotificationsCheck')
        },
        getMyFriendsCount(context) {
            context.commit('getMyFriendsCount')
        } 
    },
    getters: { // same as computed
        /* call as in computed:
            myUsername(){
                return this.$store.getters.myUsername
            },
        */
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
        },
        allUsers(state){
            return state.allUsers
        },
        sampleUsers(state){
            return state.sampleUsers
        },
        areProfileNotifications(state) {
            return state.areProfileNotifications
        },
        myFriendsCount(state) {
            return state.myFriendsCount
        }
    }, 
})

export default store;