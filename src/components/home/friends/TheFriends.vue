<template>
  <div class="friends">
    <h2>Explore</h2>
    <div class="search-user">
      <label for="search">
        <font-awesome-icon class="fa" :icon="['fa', 'magnifying-glass']"/>
      </label>
      <input 
        type="text" 
        name="search" 
        id="search" 
        placeholder="Search for a friend" 
        v-model="search"
      >
    </div>

    <div class="all-users">
      <h3>All Users</h3>
      <div class="users-list">
        <FriendCard
          v-for="(el, index) in searchForUser"
          :key="index" 
          :name="el.username"
          :user-img="el.userImg"
          :goal="el.goal"
        />
      </div>
    </div>
  <TheHeader />
  </div>
</template>

<script>
import { db, auth } from '@/components/firebaseInit.js';
import FriendCard from '@/components/home/friends/FriendCard.vue'
import TheHeader from '@/components/layout/TheHeader.vue'


export default {
  components:{
    FriendCard,
    TheHeader
  },
  data(){
    return {
      usersList: [],
      search: '',
      username: null
    }
  },
  computed: { //somehow do so you cannot find yourself (remove from array)
    searchForUser(){
      return this.usersList.filter(user => user.username.toLowerCase().indexOf(this.search.toLowerCase()) != -1)
    },
  },
  methods: {
    getUsername(){ // important so you cannot add yourself as a friend
      db.collection("users").doc(auth.currentUser.uid).get()
        .then(user => {
          // console.log(user.data().username)
          this.username = user.data().username
        })
    },
    getUsers(){
      db.collection("users")
        .where("username", "!=", this.username )
        .orderBy("username","asc")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((user) => {
            this.usersList.push({
              username: user.data().username,
              userImg: user.data().userImg,
              goal: user.data().goal
            })
          });
          console.log(this.usersList[6].userImg)
      });
    }
  },
  created(){
    this.getUsername() // rabiš naštudirat async await !!! pa promises
    setTimeout(this.getUsers(), 3000)
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
    .all-users{
      margin-top: 2rem;
      padding-bottom: 5rem;
      min-height: 75vh;
      overflow-x: scroll;
      .users-list{
        width: 100vw;
        padding-top: 1rem;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
      }
    }
  }
</style>