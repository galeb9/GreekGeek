<template>
    <router-link 
        :to="'/' + url" 
    >
        <font-awesome-icon class="fa-icon" :icon="icon" :size="size"/>
    </router-link>
</template>

<script>
export default {
    props: {
        url: {
            type: String, 
            default: ''
        },
        icon: {
            type: Array,
            default: ()=>{}
        },
        size: {
            type: String,
            default: () => {}
        }
    }
}
</script>