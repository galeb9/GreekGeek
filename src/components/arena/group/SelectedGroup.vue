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


    
  </div>

</template>

<script>
import GroupItem from './GroupItem.vue'
import GroupFriends from './GroupFriends.vue'

export default {
  components: {
    GroupItem,
    GroupFriends
  },
  props: {
    name: { type: String, default: "Group name" },
    img: { type: String, default: "greek-geek.png" },
    members: { type: Array, default: () => [] }
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