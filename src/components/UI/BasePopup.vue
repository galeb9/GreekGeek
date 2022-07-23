<template>
    <transition name="move-from-bottom"> 
        <div 
            v-if="isVisible" 
            :class="['base-popup', 'popup--' + type]"
        >
            <PopupHead :heading="heading" />
            <div :class="['base-popup__body', align]">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script>
import PopupHead from '@/components/arena/popup/PopupHead.vue'
export default {
    components : {
        PopupHead
    },
    props: {
        heading: { type: String, default: "Title"},
        isVisible: { type: Boolean, default: false},
        align: { type: String, default: ""},
        type: { type: String, default: ""},
    }
}
</script>

<style lang="scss">
    .base-popup{
        min-width: 321px;
        max-height: max-content;
        background: black;
        position: fixed;
        z-index: 101;
        bottom: 0;
        left: 0;
        right: 0;
        color: white;
        display: flex;
        flex-direction: column;
        border-radius: 15px 15px 0px 0px ;
        .base-popup__body {
            height: max-content;
            overflow-y: scroll;
            padding: 0 1.8rem 3rem;
        }
        // aligment of body items
        .center {
        }
    }
    // type of popup
    .popup--blured {
        background: rgba(172, 171, 171, 0.358);
        -webkit-backdrop-filter: blur(5px);
        backdrop-filter: blur(5px);
        border-top: 1px solid white;
        border-bottom: none;
    }
</style>