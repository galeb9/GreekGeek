<template>
    <h3 class="popup__heading">{{ text }}</h3>
</template>

<script>
export default {
    props: {
        text: {type: String, default: 'Title'}
    }

}
</script>

<style>
    .popup__heading{
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;
        color: rgba(255, 255, 255, 0.97);
    }
</style>