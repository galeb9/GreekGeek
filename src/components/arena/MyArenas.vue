<template>
  <div class="my-arenas">
    <GoBack text="Home" type="dark" />
    <h3 class="my-arenas__title">Your Arenas</h3>


    <Loader v-if="data.length === 0 && loadActive"  />

    <div class="groups" v-if="data.length > 0">
      <GroupItem 
        v-for="(group, index) in data" 
        :key="index"
        :img="group.img"
        :name="group.name"
        :memebers="group.memebers"
        @show-selected-group="showGroup"
      />
    </div>
    
    <GroupNotFound v-if="data.length === 0 && loadActive === false" />


    <transition name="move-from-bottom"> 
      <SelectedGroup 
        :name="name"
        :members="memebers"
        :img="img"
        @click-back="hideGroup"
        v-if="groupSelected"
      />
    </transition>

    <transition name="move-from-bottom">
      <AddGroupPopup 
        v-if="isPopupVisible" 
        @close-popup="closePopup"  
      />
    </transition>


    <AddArenaBtn @click="showPopup" />
  </div>
</template>

<script>
import AddArenaBtn from '@/components/arena/items/AddArenaBtn.vue'
import GroupItem from '@/components/arena/group/GroupItem.vue'
import AddGroupPopup from '@/components/arena/popup/AddGroupPopup.vue'
import SelectedGroup from '@/components/arena/group/SelectedGroup.vue'
import GroupNotFound from '@/components/arena/group/GroupNotFound.vue'
import Loader from '@/components/UI/LoaderThingy.vue'


import { db, auth } from '@/components/firebaseInit.js';

export default {
  components: {
    AddArenaBtn,
    GroupItem,
    AddGroupPopup,
    SelectedGroup,
    GroupNotFound,
    Loader
  },
  data() {
    return {
      data: [],
      isPopupVisible: false,
      groupSelected: false,
      // groupSelected: true,
      name: null,
      img: null,
      memebers: null,
      loadActive: true
    }
  },
  methods: {
    removeOne(arr, index){
      const oldArr = arr;
      oldArr.splice(index, 1)
      return oldArr
    },
    addOne(arr, data){
      arr.push(data)
    },
    showPopup(){
      this.isPopupVisible = !this.isPopupVisible
    },
    closePopup(){
      this.isPopupVisible = false
      // this.getData(); //so it refreshes
    },
    getData(){
      db.collection("users").doc(auth.currentUser.uid)
        .collection("arenas")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.data.push({
              img: doc.data().img,
              name: doc.data().name,
              memebers: doc.data().memebers
            })
          })
        })
      // this.data.push(newArenaData)
      // console.log("new data added", newArenaData)
      this.closePopup()
    },

    showGroup(name, img, memebers){ // gets group data from group item
      this.groupSelected = true;

      this.name = name;
      this.img = img;
      this.memebers = memebers
      console.log("Members: " + this.memebers)
    },
    hideGroup(){
      this.groupSelected = false;
      // this.getData(); //so it refreshes
    }
  },
  created(){
    this.getData();
    setTimeout(() => this.loadActive = false, 1600)

  }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

  .my-arenas{
    min-height: 80vh;
    margin: 65px 0.5rem 0 0.5rem;

    .my-arenas__title{
      font-weight: 400;
      font-size: 18px;
      line-height: 22px;
      color: rgba(0, 0, 0, 0.6);
      margin: 1rem 0;
    }
    .base-button__close .base-button{
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 50px;
      height: 50px;
      padding: 0;
    }

    // move-from-bottom
    .move-from-bottom-enter-active{
      animation: move-from-bottom .3s ease-in-out 
    }
    .move-from-bottom-leave-active {
      animation: move-from-bottom .3s ease-in-out reverse
    }
    @keyframes move-from-bottom {
      from{
        transform: translateY(100%);
      }
      to{
        transform: translateY(0);
      }
    }
  }
  
</style>