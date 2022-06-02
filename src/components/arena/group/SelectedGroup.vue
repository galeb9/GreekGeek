<template>

 <div 
    class="group-item-selected"
  >
    <GoBack 
      text="Back" 
      type="dark"  
      link="arena"
      @click="$emit('clickBack')"  
    />
    <BaseIcon 
      aligment="top-right"
      icon="trash"
      @click="deleteGroup"
    />
    <div class="group-item-selected__main">
      <GroupItem 
        :name="name"
        :memebers="members"
        :img="img"
      /> 
      <GroupFriends 
        :members="members"
      />
      <RankedList   
        :data="top3"
      />
      <TheScoreboard
        :data="friends"
        heading="Daily Scoreboard"
        :displayTableHead="false"
      />
    </div>

    <!-- o scrollable have to be -->
  </div>

</template>

<script>
import GroupItem from './GroupItem.vue'
import GroupFriends from './GroupFriends.vue'
import RankedList from './ranked/RankedList.vue'

import TheScoreboard from '@/components/home/home-stats/TheScoreboard.vue'
import { db, auth } from '@/components/firebaseInit.js';


export default {
  components: {
    GroupItem,
    GroupFriends,
    TheScoreboard,
    RankedList,
  },
  props: {
    name: { type: String, default: "Group name" },
    img: { type: String, default: "greek-geek.png" },
    members: { type: Array, default: () => [] }
  },
  data(){
    return{
      friends: [],
      top3: []
    }
  },
  methods: {
    getFriends(){
      db.collection("users")
        .orderBy("pushupsToday", "desc")
        .get()
        .then(snapshot => {
          let count = 0
          snapshot.forEach(doc => {
            for(let i = 0; i < this.members.length; i++){
              if(doc.data().username === this.members[i]){
                this.friends.push({
                  img: doc.data().userImg,
                  name: doc.data().username,
                  pushups: doc.data().pushupsToday
                })
                if(count < 3){
                  this.top3.push({
                    img: doc.data().userImg,
                    name: doc.data().username,
                    pushups: doc.data().pushupsToday
                  })
                }
              }
            }
          })
      })
    },
    deleteGroup(){
      if(confirm("Would you like to delete this arena?") == true){
        db.collection("users").doc(auth.currentUser.uid)
          .collection("arenas")
          .doc(this.name)
          .delete()
          //put some notifications here
        this.$emit('clickBack')
      } 
    }
  },
  computed: {
    myUsername(){
      return this.$store.getters.myUsername
    },
    myAvatarImg(){
      return this.$store.getters.myAvatar;
    },
    myGoal(){
      return this.$store.getters.myGoal
    },
    myPushups(){
      return this.$store.getters.myPushups
    }
  },
  created(){
    this.getFriends()
    console.log("friends: " + this.friends)
    setTimeout(() => {
      console.log("friends: " + this.friends)
    },1000) 
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

 .group-item-selected{
    background: $bg;
    position: fixed;
    z-index: 3;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .group-item-selected__main{
      padding: 1rem 1.4rem;
      margin-top: 5rem;
      height: 100%;
      overflow: scroll;
      padding-bottom: 3rem;
    }
  }
</style>