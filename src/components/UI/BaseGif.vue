<template>
  <div class="base__gif">
     <div v-if="!Object.keys(gif).length">
        <div class="load-spinner">
            <BaseLoadSpinner />
        </div>
    </div>
    <div v-else>
        <transition name="fade-in">
            <img  @click="loadGif()" :src="getQuery" alt="">
        </transition>
    </div>
</div>
</template>

<script>
import { GiphyFetch } from '@giphy/js-fetch-api';
import BaseLoadSpinner from '@/components/UI/BaseLoadSpinner'
export default {
    components:{
        BaseLoadSpinner
    },
    props: {
        gifTag: {
            type: String,
            default: 'welcome-back'
        }
    },
    data(){
        return {
            gif: {},
            tagProp: this.gifTag,
        }
    },
    computed:{
        getQuery(){
            return this.gif.images.fixed_height.url
        }
    },
    methods:{
        async loadGif(){
            const gf = new GiphyFetch('C6wZlbcqWPQf5wKAnpQTgS3ORTLh5RYN')
            let { data: gif } = await gf.random({ tag: this.tagProp });
            if(gif.images.fixed_height.width < 250){
                const { data: newGif } = await gf.random({ tag: this.tagProp });
                gif = newGif;
            }
            this.gif = gif;
        },

    },
    created(){
        this.loadGif();
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';
    .base__gif{
        max-width: 100%;
        max-height: 100%;
        img{
            border-radius: $radius;
        }
    }
</style>