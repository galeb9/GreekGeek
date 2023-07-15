import { defineStore } from "pinia";
import { db, auth } from "@/scripts/firebaseInit.js";

// How to add states and use actions (methods)?
// -> call actions in views to get data that you need in components
// -> use states in components where needed

// export const useRootnStore = defineStore("root", {
//   state: () => ({
//     dbUser: db.collection("users").doc(auth.currentUser.uid),
//     username: "", // should get username somehow global
//   }),
//   actions: {
//     //     // Shared actions can be defined here
//     optionalApiCall(condition, cb) {
//       if (condition) cb();
//     },
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
//   },
// });

export const useMainStore = defineStore("main", {
  // a function that returns a fresh state aka data of the store
  state: () => ({
    // test
    counter: 0,
    name: "Matej",
    // app
    dbUser: db.collection("users").doc(auth.currentUser.uid),
    avatarImg: "404-avatar-img.png",
    username: "",
    goal: null,
    attempts: 0,
    pushupsToday: null,
  }),
  // like computed properties
  getters: {
    doubleCounter: (state) => state.counter * 2,
    // use getters in other getters
  },
  // methods
  actions: {
    // main functions
    getUserData(getType = "") {
      // if data is loaded and you only want to update pushups value
      if (getType === "pushups" && this.username) this.getUserPushups();
      if (getType === "goal" && this.username) this.getUserGoal();

      // if no username get all basic usr data
      if (!this.username) this.getAllUserData();
    },
    async getUserGoal() {
      // get newsest userGoal
      await this.dbUser.get().then((user) => {
        this.goal = user.data().goal;
      });
    },
    async getUserPushups() {
      await this.dbUser.get().then((user) => {
        this.pushupsToday = user.data().pushupsToday;
        this.attempts = user.data().attempts;
      });
    },
    async getAllUserData() {
      await this.dbUser.get().then((user) => {
        let u = user.data();
        this.avatarImg = u.userImg;
        this.username = u.username;
        this.goal = u.goal;
        this.pushupsToday = u.pushupsToday;
        this.attempts = u.attempts;
      });
      // temp
      // console.log(
      //   "getAllUserData",
      //   this.goal,
      //   this.attempts,
      //   this.pushupsToday
      // );
    },
  },
});

export const useFriendsStore = defineStore("friends", {
  state: () => ({
    dbUser: db.collection("users").doc(auth.currentUser.uid),
    allUsers: [],
    sampleUsers: [],
  }),
  getters: {},
  actions: {
    // could remove self in code not here
    getUsers(userName) {
      if (this.allUsers.length < 1) this.getAllUsers(userName);
    },
    getAllUsers(userName) {
      db.collection("users")
        .where("username", "!=", userName)
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
      if (!this.myFriendsCount) this.fbGetMyFriendsCount();
    },
    fbGetMyFriendsCount() {
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
