<template>
  <button :class="['base-button', type]">{{ text }}</button>
</template>

<script>
export default {
    props:{
        text: {
            type: String,
            default: "button"
        },
        type: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables.scss';
.base-button{
    outline: none;
    border: none;
    background: black;
    color: white;
    padding: .8rem 1.6rem;
    border-radius: 4px;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.42);
    transition: all .1s ease-in;
    // background: $secondary;
    // font-weight: 900;
    // padding: 1rem 3rem;
    // border-radius: $radius;
    // margin: 1rem 0;
    &:active{
        transform: translateY(3px);
        box-shadow: 0 0 0  rgba(0, 0, 0, 0.42);
    }
}
.secondary{
    background: $secondary;
}
</style>