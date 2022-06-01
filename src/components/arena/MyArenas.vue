<template>
  <div class="my-arenas">
    <GoBack text="Home" type="dark" />
    <h3 class="my-arenas__title">Your Arenas</h3>
    <div class="groups">
      <GroupItem 
        v-for="(group, index) in data" 
        :key="index"
        :img="group.img"
        :name="group.name"
        :memebers="group.memebers"
        @show-selected-group="showGroup"
      />
    </div>

    <transition name="move-from-bottom"> 
      <SelectedGroup 
        :name="name"
        :memebers="memebers"
        :img="img"
        @click-back="hideGroup"
        v-if="groupSelected"
      />
    </transition>

    <transition name="move-from-bottom">
      <AddGroupPopup 
        v-if="isPopupVisible" 
        @new-arena-data="getData" 
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

export default {
  components: {
    AddArenaBtn,
    GroupItem,
    AddGroupPopup,
    SelectedGroup
  },
  data() {
    return {
      data: [
        { img: "group02.png", name: "Bros69", memebers: 12 },
        { img: "group01.png", name: "Los Locos", memebers: 4 }
      ],
      isPopupVisible: false,
      groupSelected: false,
      // groupSelected: true,
      name: null,
      img: null,
      memebers: null
    }
  },
  computed: {

  },
  methods: {
    showPopup(){
      this.isPopupVisible = !this.isPopupVisible
    },
    closePopup(){
      this.isPopupVisible = false
    },
    getData(newArenaData){
      this.data.push(newArenaData)
      console.log("new data added", newArenaData)
      this.closePopup()
    },

    showGroup(name, img, memebers){
      this.groupSelected = true;
      this.name = name;
      this.img = img;
      this.memebers = memebers
    },
    hideGroup(){
      this.groupSelected = false;
    }
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


    // .group-item-selected{
    //   background: $bg;
    //   position: fixed;
    //   z-index: 3;
    //   top: 0;
    //   left: 0;
    //   right: 0;
    //   bottom: 0;
    //   padding: 1rem 1.4rem;
    //   .group-item-selected__main{
    //     margin-top: 5rem;
    //   }
    // }
  }
  
</style>