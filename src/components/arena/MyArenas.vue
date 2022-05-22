<template>
  <div class="my-arenas">
    <GoBack text="Home" type="dark" />

    <transition name="fade-in" mode="in-out">
      <BaseButton 
        class="base-button__close" 
        align="" 
        v-if="isPopupVisible"  
        @click="closePopup" 
        text="X" 
        kind="close"
      />
    </transition>

    <h3 class="my-arenas__title">Your Arenas</h3>
    <div class="groups">
      <GroupItem 
        v-for="(group, index) in data" 
        :key="index"
        :img="group.img"
        :name="group.name"
        :members="group.members"
      />
    </div>

    <transition name="move-from-bottom">
      <AddGroupPopup v-if="isPopupVisible" @close-popup="closePopup" />
    </transition>


    <AddArenaBtn @click="showPopup" />
  </div>
</template>

<script>
import AddArenaBtn from '@/components/arena/items/AddArenaBtn.vue'
import GroupItem from '@/components/arena/group/GroupItem.vue'
import AddGroupPopup from '@/components/arena/popup/AddGroupPopup.vue'
export default {
  components: {
    AddArenaBtn,
    GroupItem,
    AddGroupPopup
  },
  data() {
    return {
      data: [
        { img: "group02.png", name: "Bros69", members: 12 },
        { img: "group01.png", name: "Los Locos", members: 4 }
      ],
      // isPopupVisible: false
      isPopupVisible: true

    }
  },
  methods: {
    showPopup(){
      this.isPopupVisible = !this.isPopupVisible
    },
    closePopup(){
      this.isPopupVisible = false
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