<template>
  <div class="friends">
    <GroupInput 
      icon="loupe" 
      placeholder="Search for new alies"
      v-model="search"
    />
    <div class="users">
      <div class="users__head">
        <h3 class="users__heading"> {{ wordFilter }}</h3>

        <!-- <p>{{ seeAllUsers }}</p> -->

        <div class="users__head__btn" @click="toggleAllUsers">
          <font-awesome-icon 
            class="fa-eye" 
            :icon="['fa', 'eye-low-vision']"
            v-if="seeAllUsers" 
          />
          <font-awesome-icon 
            v-else  
            class="fa-eye" 
            :icon="['fa', 'eye']"
          />
        </div>

      </div>
      <div class="users__list" v-if="search !== ''">
        <FriendCard
          v-for="(el, index) in searchForUser"
          :key="index" 
          :name="el.username"
          :user-img="el.userImg"
          @get-friend-data="getFriendData"
        />
      </div>
      <div v-else class="users__list">
        <FriendCard
          v-for="(el, index) in usersFilter"
          :key="index" 
          :name="el.username"
          :user-img="el.userImg"
          @get-friend-data="getFriendData"
        />
      </div>
    </div>


    <!-- user-profile on popup -->
    <transition name="move-in-bottom">
      <div 
        class="user-profile__popup" 
        v-show="popupVisible"
      >
        <UserProfile
          @close-popup="closePopup"
          :img="img"
          :name="name"
          :goal="goal"

          :id="friendId"
          :request-sent="requestSent"
          :are-we-friends="isFriend"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import { db, auth } from '@/components/firebaseInit.js';
import FriendCard from '@/components/home/friends/FriendCard.vue'
import GroupInput from '@/components/arena/popup/GroupInput.vue'
import UserProfile from '@/components/profile/UserProfile.vue'

export default {
  name: 'TheFriends',
  components:{
    FriendCard,
    GroupInput,
    UserProfile
  },
  data(){
    return {
      usersList: [],
      search: '',
      username: null,

      popupVisible: false,
      name: null, 
      img: "greek-geek.png",
      goal: null,

      users: db.collection("users"),
      friendId: null,

      isFriend: false,
      requestSent: false,
      seeAllUsers: false
    }
  },
  computed: { //somehow do so you cannot find yourself (remove from array)
    searchForUser(){
      return this.allUsers.filter(user => user.username.toLowerCase().indexOf(this.search.toLowerCase()) != -1)
    },
    myUsername(){
      return this.$store.getters.myUsername
    },
    allUsers(){
      return this.$store.getters.allUsers
    },
    sampleUsers(){
      return this.$store.getters.sampleUsers
    },
    usersFilter(){
      if(this.seeAllUsers){
        return this.allUsers
      }
      return this.sampleUsers 
    },
    wordFilter(){
      if(this.search === ''){
        if(this.seeAllUsers){
          return "All users" 
        }
        return "Some users"
      }
      return "Search Result"
    }
  },
  methods: {
    toggleAllUsers(){
      this.seeAllUsers = !this.seeAllUsers
    },
    openPopup(){
      this.popupVisible = true;
      document.body.style.overflow = "hidden";
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    closePopup(){
      this.popupVisible = false
      document.body.style.overflow = ""
    },
    findFriendId(name){
      this.users.where("username", "==", name).get()
        .then(snapshot => {
            snapshot.forEach(user => {
              this.friendId = user.id
              // console.log(this.friendId)
            })
        })
    },
    areFriends(username){ // Checks if we are friends 
      db.collection("users")
        .doc(auth.currentUser.uid)
        .collection("friends")
        .doc(username)
        .get()
        .then(user => {
          if(user.data() === undefined){
            // return null
            this.isFriend = false
            // console.log("are friends? " + this.isFriend)

          }else{
            this.isFriend = user.data().friends
            // console.log("are friends? " + this.isFriend)
          }
        })
    },
    isFriendRequestSent(name){ // Checks if friend request is sent 
      db.collection("users")
        .doc(auth.currentUser.uid)
        .collection("requests-sent")
        .doc(name)
        .get()
        .then(user => {
          if(user.data() != undefined){
            this.requestSent = true
          }
          else{
            this.requestSent = false
          }
          // console.log("is friend request sent? " + this.requestSent)
        })
    },
    getFriendData(name, img, goal){
      this.name = name
      this.img = img
      this.goal = goal

      this.openPopup()
      this.findFriendId(name)
      this.areFriends(name)
      this.isFriendRequestSent(name)
    },
    loadUser() {
      if(this.allUsers.length === 0){
        this.$store.dispatch('getUsers')
      }
    }
  },
  created(){
    this.loadUser()
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/_variables.scss';

  .friends{
    color: $secondary ;
    h2{
      margin-bottom: .5rem;
    }
    .search-user{
      display: flex;
      gap: .5rem;
      border: 2px solid $secondary;
      padding: .5rem ;
      input{
        background: none;
        border: none;
        outline: none;
        width: 100%;
      }
    }
    .users{
      margin-top: 2rem;
      padding-bottom: 5rem;
      min-height: 75vh;
      overflow-x: scroll;
      .users__head{
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        .users__heading{
          font-size: 1.5rem;
        }
        .users__head__btn{
          margin-right: .5rem;
          border: 1px solid black;
          padding: .5rem;
          &:hover{
            cursor: pointer;
          }
        }
      }
      .users__list{
        padding-top: 1rem;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
      }
    }
    .user-profile__popup{
      position: absolute;
      top: 0;
      left: 0;
    }
  }
</style>