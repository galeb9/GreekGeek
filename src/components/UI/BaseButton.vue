<template>
  <button class="base-button">{{ text }}</button>
</template>

<script>
export default {
    props:{
        text: {
            type:String,
            default: "button"
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables.scss';
.base-button{
    outline: none;
    border: none;
    background: $secondary;
    color: $fontColorInvert;
    font-weight: 900;
    padding: .8rem 1.6rem;
    border-radius: $radius;
    margin: 1rem 0;
}
</style>