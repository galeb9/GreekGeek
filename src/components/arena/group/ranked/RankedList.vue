<template>
    <div class="ranked-list__container">
        <PopupHeading 
            color="rgba(0,0,0, 0.6)"
            text="Top Ranked"
        />
        <div :class="['ranked-list', { 'space-between' : data.length > 2 }]" >
            <RankedUser 
                v-for="(el, index) in data" 
                :key="index"
                :img="el.img"
                :name="el.name"
            />
           
        </div>
    </div>
    
</template>

<script>
import PopupHeading from '@/components/arena/popup/PopupHeading.vue'
import RankedUser from './RankedUser.vue'

export default {
    components: {
        PopupHeading,
        RankedUser
    },
    props: {
        data: { type: Array, default: () => [] }
    },
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

    .ranked-list{
        display: flex;
        align-items: flex-end;
        gap: 1rem;
        margin: .8rem 0 1.5rem 0;
        max-width: 380px;
        padding-bottom: 1rem;
        @media only screen and (max-width: 353px) {
            overflow-x: auto;
        }
    }
    .space-between{
        justify-content: space-between ;
    }

</style>