<template>
  <div class="group-item-selected">
    <GoBack 
      text="Back" 
      type="dark"  
      link="arena"
      @click="$emit('clickBack')"  
    />
    <!-- admin btns -->
    <div v-if="isAdmin" class="admin__btns group-control__btns">
      <BaseIcon 
        aligment="top-right"
        icon="settings"
        @click="showAdminPopup = true"
      />
      <BasePopup 
        heading="Admin rights" 
        :isVisible="showAdminPopup"
        type="blured"
      >
        <div class="group-control__btns">
          <BaseButton 
            text="Leave arena"
            kind="icons"
            margin="auto"
            width="80%"
            icon-type="exit"
            @btn-click="leaveGroup"
          />
          <!-- <BaseButton 
            text="Leave arena"
            kind="icons"
            margin="auto"
            width="80%"
            icon-type="trash"
          /> -->
        </div>
      </BasePopup>
      <BaseOverlay v-if="showAdminPopup" @close="closePopup" />
    </div>
    <!-- not admin btns-->
    <div v-else class="not-admin__btns">
       <BaseIcon 
        aligment="top-right"
        icon="settings"
        @click="showMemberPopup = true"
      />
      <BasePopup 
        heading="Member rights" 
        :isVisible="showMemberPopup"
        type="blured"
      >
        <BaseButton 
          text="Leave arena"
          kind="icons"
          margin="auto"
          width="80%"
          icon-type="trash"
          @click="leaveGroup"
        />
      </BasePopup>
      <BaseOverlay v-if="showMemberPopup" @close="closePopup" />
    </div>

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
      top3: [],
      showMemberPopup: false,
      isAdmin: null,
      showAdminPopup: false,
    }
  },
  methods: {
    closePopup(value) {
      this.showAdminPopup = value
      this.showMemberPopup = value
    },
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
                  count++;
                }
              }
            }
          })
      })
    },
    leaveGroup(){ // leave group
      if(confirm("Would you like to delete this arena?") == true){
        db.collection("users").doc(auth.currentUser.uid)
          .collection("arenas")
          .doc(this.name)
          .delete()
        this.$emit('clickBack')
      } 
      this.closePopup()
    },
    getSelectedGroupAdmin() {
      db.collection("users").doc(auth.currentUser.uid)
        .collection("arenas")
        .doc(this.name)
        .get()
        .then(user => {
          if(user.data().admin === this.myUsername) {
            this.isAdmin = true
          } else {
            this.isAdmin = false
          }
          
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
    this.getSelectedGroupAdmin()
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
      height: 100vh;
      overflow: scroll;
      padding-bottom: 3rem;
    }
    .group-control__btns {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
</style>