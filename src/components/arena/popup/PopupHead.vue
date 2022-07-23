<template>
    <div class="popup__head">
        <div class="popup__line"></div>
        <h2 class="popup__title">{{ heading }}</h2>
    </div>
</template>

<script>
export default {
    props: {
        heading: { type: String, default: "Title"}
    }
}
</script>

<style lang="scss">
    .popup__head{
        padding: 1.5rem 0.5rem 2rem 0.5rem;
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