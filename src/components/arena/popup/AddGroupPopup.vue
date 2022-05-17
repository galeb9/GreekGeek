<template>
  <div class="add-group-popup">
    <PopupHead />


    <GroupInput 
        icon="arena" 
        placeholder="Arena name goes here..."
        v-model="arenaName"
    />

    <PhotoChoice />


    <BaseButton style="margin-top:100%" @click="$emit('closePopup')" text="X" />

  </div>
</template>

<script>
import PopupHead from './PopupHead.vue'
import GroupInput from './GroupInput.vue'
import PhotoChoice from './PhotoChoice.vue'


export default {
    components: {
        PopupHead,
        GroupInput,
        PhotoChoice
    },
    data() {
        return {
            arenaName: ""
        }
    }
}
</script>

<style lang="scss">

    .add-group-popup{
        min-height: 90vh;
        background: rgba(126, 164, 220, 0.27);
        backdrop-filter: blur(25px);
        border-radius: 20px 20px 0 0;
        position: absolute;
        z-index: 1;
        bottom: -10px;
        left: 0;
        right: 0;
        color: white;
        padding: .8rem 2rem;
        .base-button{
            border-radius: 50%;
            width: 60px;
            height: 60px;
            padding: 0;
            background: rgb(189, 17, 17) !important;
        }
  

       
    }
</style>