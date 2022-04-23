<template>
    <router-link 
        :to="'/' + url" 
    >
        <!-- should look like this :icon="['fa', 'right-from-bracket']" -->
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
        },
    }
}
</script>