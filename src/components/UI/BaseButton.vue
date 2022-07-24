<template>
    <div 
        :class="[ 'base-button-container', align]" 
        :style="{ width: width, margin: getMargin}"
    >
        <button @click="$emit('btnClick')" :class="['base-button', kind, { 'shadow': shadow}]">
            {{ text }}
            <BaseIcon 
                v-if="iconType"
                :icon="iconType"
                kind="in-btn"
                aligment="none"

            />
        </button>
    </div>
</template>

<script>
export default {
    props:{
        text: { type: String, default: "button" },
        kind: { type: String, default: 'kind1' },
        align: { type: String, default: 'center' }, 
        width: { type: String, default: 'auto' },
        shadow: { type: Boolean, default: true },
        margin: { type: String, default: '0' },
        iconType: { type: String, default: '' },
    },
    computed: {
        getMargin () {
            if(this.margin === "auto") {
                return  'auto'
            } else {
                return this.margin + 'px 0'
            }
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/scss/_variables.scss';
.base-button-container{
    .base-button{
        outline: none;
        border: none;
        padding: .8rem 1.6rem;
        transition: all .1s ease-out;
        &:active{
            transform: translateY(1px);
        }
    }

    //button-styles
    .shadow{
        box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.42);
        &:active{
            box-shadow: 0 0 0  rgba(0, 0, 0, 0.42);
        }
    }

    // button types
    .kind1{
        background: black;
        color: white;
        border-radius: 5px;
    }
    .kind2{
        background: transparent ;
        color: black;
        border: black double 10px;
        padding: 1.5rem 3rem;
        font-size: 20px;
        transition: all .3s ease-in-out;
        &:hover{
            background: $black;
            color: white;
        }
    }
    .auth {
        padding: 1em 2em;
        font-size: 14px;
        font-weight: 900;
        color: $secondary;
        background: transparent;
        border-radius: 5px;
        border: 10px double rgba($secondary, 1);
        width: 100%;
        &:focus{
            background: black;
            color: white;
        }
    }
    .close{
        border-radius: $main-radius;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgb(189, 17, 17) !important;
        color: white;
    }
    .icons {
        border-radius: 5px;
        background: $bg;
        font-weight: 800;
        font-size: 16px;
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        gap: .8rem;
        text-align: center;
    }
    .secondary{
        background: $secondary;
    }
}
//aligment
.center{
    display: flex;
    justify-content: center;
    margin: 0 auto;
}
</style>