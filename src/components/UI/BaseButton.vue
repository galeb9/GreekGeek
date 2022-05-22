<template>
    <div :class="[ 'base-button-container', align]">
        <button :class="['base-button', kind, { 'shadow': shadow}]">{{ text }}</button>
    </div>
</template>

<script>
export default {
    props:{
        text: {
            type: String,
            default: "button"
        },
        kind: {
            type: String,
            default: 'kind1'
        },
        align: {
            type: String,
            default: 'center'
        },
        shadow: {
            type: Boolean,
            default: true
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables.scss';
.base-button-container{
    .base-button{
        outline: none;
        border: none;
    
        transition: all .1s ease-in;
        &:active{
            transform: translateY(3px);
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
        padding: .8rem 1.6rem;
    }
    .kind2{
        background: transparent ;
        color: black;
        padding: .8rem 1.6rem;
        border: black double 10px;
        padding: 1.5rem 3rem;
        font-size: 20px;
        transition: all .3s ease-in-out;
        &:hover{
            background: $black;
            color: white;
        }
    }
    .close{
        border-radius: $main-radius;
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        background: rgb(189, 17, 17) !important;
        position: absolute;
        top: 1rem;
        right: 1rem;
        color: white;
    }
    .secondary{
        background: $secondary;
    }
}
//aligment
.center{
    display: flex;
    justify-content: center;
}
</style>