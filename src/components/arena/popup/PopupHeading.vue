<template>
    <h3 
        class="popup__heading"
        :style="{ margin: topMargin + ' 0 ' + bottomMargin + ' 0' }"
    >{{ text }}</h3>
</template>

<script>
export default {
    props: {
        text: {type: String, default: 'Title'},
        topMargin: {type: String, default: '0'},
        bottomMargin: {type: String, default: '0'}
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