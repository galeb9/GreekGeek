<template>
    <div class="popup__head">
        <div class="popup__line"></div>
        <h2 class="popup__title">Add new Arena</h2>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
    .popup__head{
        padding: 1.5rem 0.5rem 3rem 0.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        .popup__line{
            width: 30%;
            height: 6px;
            border-radius: 20px;
            background: white;
            margin-bottom: 1rem;
        }
    }
</style>