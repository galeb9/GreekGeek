<template>
    <div class="add-arena__container">
        <div class="add-arena-btn">
            <img class="add-arena__image-svg" src="@/assets/icons/add-arena.svg" alt="">
        </div>
    </div>
</template>

<script>
export default {
    methods: {

    }   

}
</script>

<style lang="scss">
    .add-arena__container{
        // border: 1px solid black;
        position: absolute;
        bottom: 100px;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        .add-arena-btn{
            background: black;
            width: 70px;
            height:  70px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>