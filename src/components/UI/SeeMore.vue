<template>
    <router-link :to="'/' + link">
        <button class="see-more-btn">
            <font-awesome-icon class="fa-eye" :icon="['fa', 'eye']"/>
            <font-awesome-icon class="fa-angle-down" :icon="['fa', 'angle-down']"/>
        </button>
    </router-link>
</template>

<script>
export default {
    props: {
        link: {
            type: String,
            default: 'friends'
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

    .see-more-btn{
        padding: .5rem 1rem;
        display: flex;
        background: transparent;
        border: 5px double $secondary;
        gap: 1rem;
        .fa-angle-down{
            transform: rotate(-90deg);
        }
    }
</style>