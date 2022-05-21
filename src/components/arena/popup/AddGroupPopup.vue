<template>
  <div class="add-group-popup">
    <PopupHead />
    <GroupInput 
        icon="arena" 
        placeholder="Arena name goes here..."
        v-model="arenaName"
    />
    <PhotoChoice />
    <div class="memebers-list">
        <PopupHeading text="Added so far:" />
        <p class="memebers-list__people">Medo007, Šaman69, Medo007, Šaman69, Medo007, Šaman69, Medo007, Šaman69</p>
    </div>
    <GroupInput 
        icon="loupe" 
        placeholder="Search for memebers"
        v-model="member"
    />
  </div>
</template>

<script>
import PopupHead from './PopupHead.vue'
import GroupInput from './GroupInput.vue'
import PhotoChoice from './PhotoChoice.vue'
import PopupHeading from './PopupHeading.vue'


export default {
    components: {
        PopupHead,
        GroupInput,
        PhotoChoice,
        PopupHeading

    },
    data() {
        return {
            arenaName: ""
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

    .add-group-popup{
        min-width: 321px;
        max-height: 90vh;
        height: 100%;
        overflow-y: scroll;
        background: rgba(126, 164, 220, 0.27);
        backdrop-filter: blur(25px);
        border-radius: 20px 20px 0 0;
        position: fixed;
        z-index: 101;
        bottom: -10px;
        left: 0;
        right: 0;
        color: white;
        padding: .8rem 2rem;
        .memebers-list{
            background: black;
            margin: 1rem 0;
            padding: 1rem ;
            border-radius: $main-radius;
            .memebers-list__people{
                margin-top: .5rem;
            }
        }
    }
    @media only screen and (max-width: 350px) {
        
    }
</style>