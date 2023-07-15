<template>
  <div class="friends">
    <GroupInput
      icon="loupe"
      placeholder="Search for new alies"
      v-model="search"
    />
    <div class="users">
      <div class="users__head">
        <h3 class="users__heading">{{ wordFilter }}</h3>
        <div class="users__head__btn" @click="toggleAllUsers">
          <font-awesome-icon
            class="fa-eye"
            :icon="['fa', 'eye-low-vision']"
            v-if="seeAllUsers"
          />
          <font-awesome-icon v-else class="fa-eye" :icon="['fa', 'eye']" />
        </div>
      </div>
      <div class="users__list-container" v-if="search === ''">
        <TransitionGroup name="list" tag="div" class="users__list">
          <FriendCard
            v-for="(el, index) in usersFilter"
            :key="index"
            :name="el.username"
            :user-img="el.userImg"
            @get-friend-data="getFriendData"
          />
        </TransitionGroup>
      </div>
      <div v-else-if="search !== ''" class="users__list-container">
        <TransitionGroup
          v-if="searchForUser"
          name="list"
          tag="div"
          class="users__list"
        >
          <FriendCard
            v-for="(el, index) in searchForUser"
            :key="index"
            :name="el.username"
            :user-img="el.userImg"
            @get-friend-data="getFriendData"
          />
        </TransitionGroup>
      </div>
    </div>
    <!-- user-profile on popup -->
    <transition name="move-in-bottom">
      <div class="user-profile__popup" v-show="popupVisible">
        <UserProfile
          @close-popup="closePopup"
          :img="img"
          :name="name"
          :goal="friendGoal"
          :id="friendId"
          :request-sent="requestSent"
          :are-we-friends="isFriend"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import FriendCard from "@/components/friends/FriendCard.vue";
import GroupInput from "@/components/arena/popup/GroupInput.vue";
import UserProfile from "@/components/profile/UserProfile.vue";
import { db, auth } from "@/scripts/firebaseInit.js";

import { getUserDataState } from "@/mixins/pinia/main/getUserData";
import {
  userFriendsAction,
  userFriendsState,
} from "@/mixins/pinia/friends/userFriends";

export default {
  name: "TheFriends",
  mixins: [getUserDataState, userFriendsAction, userFriendsState],
  components: {
    FriendCard,
    GroupInput,
    UserProfile,
  },
  data() {
    return {
      usersList: [],
      search: "",
      popupVisible: false,
      name: null,
      friendGoal: null,
      img: "greek-geek.png",
      users: db.collection("users"),
      friendId: null,
      isFriend: false,
      requestSent: false,
      seeAllUsers: false,
    };
  },
  computed: {
    //somehow do so you cannot find yourself (remove from array)
    searchForUser() {
      return this.allUsers.filter(
        (user) =>
          user.username.toLowerCase().indexOf(this.search.toLowerCase()) != -1
      );
    },
    usersFilter() {
      if (this.seeAllUsers) {
        return this.allUsers;
      }
      return this.sampleUsers;
    },
    wordFilter() {
      if (this.search === "") {
        if (this.seeAllUsers) {
          return "All users";
        }
        return "Some users";
      }
      return "Search Result";
    },
  },
  methods: {
    toggleAllUsers() {
      this.seeAllUsers = !this.seeAllUsers;
    },
    openPopup() {
      this.popupVisible = true;
      document.body.style.overflow = "hidden";
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    closePopup() {
      this.popupVisible = false;
      document.body.style.overflow = "";
    },
    findFriendId(name) {
      this.users
        .where("username", "==", name)
        .get()
        .then((snapshot) => {
          snapshot.forEach((user) => {
            this.friendId = user.id;
            // console.log(this.friendId)
          });
        });
    },
    areFriends(username) {
      // Checks if we are friends
      db.collection("users")
        .doc(auth.currentUser.uid)
        .collection("friends")
        .doc(username)
        .get()
        .then((user) => {
          if (user.data() === undefined) {
            this.isFriend = false;
          } else {
            this.isFriend = user.data().friends;
          }
        });
    },
    isFriendRequestSent(name) {
      // Checks if friend request is sent
      db.collection("users")
        .doc(auth.currentUser.uid)
        .collection("requests-sent")
        .doc(name)
        .get()
        .then((user) => {
          if (user.data() != undefined) {
            this.requestSent = true;
          } else {
            this.requestSent = false;
          }
        });
    },
    getFriendData(name, img, goal) {
      this.name = name;
      this.img = img;
      this.friendGoal = goal;

      this.openPopup();
      this.findFriendId(name);
      this.areFriends(name);
      this.isFriendRequestSent(name);
    },
    loadInitialData() {
      this.getUsers(this.username);
    },
  },
  created() {
    this.loadInitialData();
  },
};
</script>
<style lang="scss">
.friends {
  h2 {
    margin-bottom: 0.5rem;
  }
  .search-user {
    display: flex;
    gap: 0.5rem;
    border: 2px solid var(--complementary);
    padding: 0.5rem;
  }
  .users {
    margin-top: 2rem;
    padding-bottom: 5rem;
    min-height: 75vh;
    overflow-x: scroll;
    .users__head {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      .users__heading {
        font-size: 1.5rem;
      }
      &__btn {
        margin-right: 1rem;
        box-shadow: var(--boxShadow);
        border-radius: 4px;
        padding: 0.5rem;
        &:hover {
          cursor: pointer;
        }
      }
    }
    .users__list {
      padding-top: 1rem;
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
  .user-profile__popup {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
