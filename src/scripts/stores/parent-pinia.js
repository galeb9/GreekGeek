import { defineStore } from "pinia";
import { db, auth } from "@/scripts/firebaseInit.js";

// export const useRootnStore = defineStore("root", {
//   state: () => ({
//     dbUser: db.collection("users").doc(auth.currentUser.uid),
//     username: "" // should get username somehow global
//   }),
//   actions: {
//     // Shared actions can be defined here
//   },
// });

export const useMainStore = defineStore("main", {
  // a function that returns a fresh state aka data of the store
  state: () => ({
    // test
    counter: 0,
    name: "Matej",
    // api calls
    dbUser: db.collection("users").doc(auth.currentUser.uid),
    // app
    // -> must get info from api at the load/reload of app
    avatarImg: "404-avatar-img.png",
    username: "",
    goal: null,
    pushupsToday: null,
    // -> must get when you get to a certain page and save it to a variable so you do not need to call api no more
    // add friends
    allUsers: [],
    sampleUsers: [],
    // profile
    areProfileNotifications: false,
    myFriendsCount: 0,
  }),
  // like computed properties
  getters: {
    doubleCounter: (state) => state.counter * 2,
    // use getters in other getters
  },
  // methods
  actions: {
    // main functions
    async getUserData() {
      await this.dbUser.get().then((user) => {
        let u = user.data();
        this.avatarImg = u.userImg;
        this.username = u.username;
        this.goal = u.goal;
        this.pushupsToday = u.pushupsToday;
      });
    },
    logToConsole(item) {
      console.log(item);
    },
    // universal functions
    // use for (getMyFriendsCount, ... )
    // goThroughCollection(collectionName, action, condition = true) {
    //   this.dbUser
    //     .collection(collectionName)
    //     .get()
    //     .then((documents) => {
    //       documents.forEach(() => {
    //         if (condition) action;
    //       });
    //     });
    // },
  },
});

export const useFriendsStore = defineStore("friends", {
  state: () => ({
    dbUser: db.collection("users").doc(auth.currentUser.uid),
    username: "", // must get from global/root
    allUsers: [],
    sampleUsers: [],
  }),
  getters: {},
  actions: {
    // could remove self in code not here
    getUsers() {
      db.collection("users")
        .where("username", "!=", this.username)
        .orderBy("username", "asc")
        .get()
        .then((snapshot) => {
          let count = 0;
          snapshot.forEach((user) => {
            let u = user.data();
            let item = {
              username: u.username,
              userImg: u.userImg,
              goal: u.goal,
            };
            // the real list user will search for friends
            this.allUsers.push(item);

            // makes a sample list
            if (count < 6) {
              this.sampleUsers.push(item);
              count++;
            }
          });
        });
    },
  },
});

export const useNotificationsStore = defineStore("notifications", {
  state: () => ({
    dbUser: db.collection("users").doc(auth.currentUser.uid),
    hasNotifications: false,
  }),
  getters: {},
  actions: {
    goThroughNotifications(collectionName) {
      this.dbUser
        .collection(collectionName)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            if (doc.data()) this.hasNotifications = true;
          });
        });
    },
    profileNotificationsCheck() {
      this.goThroughNotifications("friend-requests");
      if (!this.hasNotifications) this.goThroughNotifications("arena-requests");
      // maybe should change that on app init it checks for notifications and also gets them in the same go?
    },
  },
});

export const useMyProfileStore = defineStore("myProfile", {
  state: () => ({
    dbUser: db.collection("users").doc(auth.currentUser.uid),
    myFriendsCount: 0,
  }),
  getters: {},
  actions: {
    getMyFriendsCount() {
      this.dbUser
        .collection("friends")
        .get()
        .then((snapshot) => {
          snapshot.forEach(() => {
            this.myFriendsCount++;
          });
        });
    },
  },
});

// sample store
export const useSampleStore = defineStore("sample", {
  state: () => ({}),
  getters: {},
  actions: {},
});
