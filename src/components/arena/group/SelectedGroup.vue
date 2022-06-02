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
    <div class="group-item-selected__main">
      <GroupItem 
        :name="name"
        :memebers="members"
        :img="img"
      /> 
      <GroupFriends 
        :members="members"
      />
    </div>

    <div
      v-for="(member, index) in friends"
      :key="index"
    >
      <h3>{{ member.name }}</h3>
      <p>{{member.img}}</p>
      <p>Pushups done: {{ member.pushups }}</p>
    </div>
<!--  o have to make them in order by pushups
      o scrollable have to be
 -->
    <TheScoreboard
      :data="friends"
    />

    
  </div>

</template>

<script>
import GroupItem from './GroupItem.vue'
import GroupFriends from './GroupFriends.vue'
import TheScoreboard from '@/components/home/home-stats/TheScoreboard.vue'
import { db } from '@/components/firebaseInit.js';


export default {
  components: {
    GroupItem,
    GroupFriends,
    TheScoreboard
  },
  props: {
    name: { type: String, default: "Group name" },
    img: { type: String, default: "greek-geek.png" },
    members: { type: Array, default: () => [] }
  },
  data(){
    return{
      friends: []
    }
  },
  methods: {
    getFriends(){
      db.collection("users")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            for(let i = 0; i < this.members.length; i++){
              if(doc.data().username === this.members[i]){
                this.friends.push({
                  img: doc.data().userImg,
                  name: doc.data().username,
                  pushups: doc.data().pushupsToday
                })
              }
            }
          })
      })

      this.friends.push({
        img: this.myAvatarImg,
        name: this.myUsername,
        pushups: this.myPushups
      })
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
    padding: 1rem 1.4rem;
    .group-item-selected__main{
      margin-top: 5rem;
    }
  }
</style>