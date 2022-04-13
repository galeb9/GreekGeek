<template>
  <div class="base-container" :style="{'text-align' :  textAlign }">
        <div class="content-holder">
            <slot></slot>
        </div>
  </div>
</template>

<script>

export default {
    name: 'BaseContainer',
    components: {
    },
    props: {
        textAlign: {
            type: String,
            default: "left"
        }
    }
}
</script>

<style lang="scss">
@import  '../../assets/scss/_variables.scss';

.base-container{
    //min-height: 100vh;
    border-radius: $radius;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    .content-holder{
        width: 85%;
        margin: 0 auto;
    }
}
</style>