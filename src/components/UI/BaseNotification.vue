<template>
    <transition name="fade-in">
        <p v-if="showNotification" :class="'notification-' + type">{{ message }}</p>
    </transition>
</template>

<script>
export default {
    props:{
        type: {
            type: String,
            default: 'success'
        },
        message: {
            type: String,
            default: 'Your message goes here...'
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/scss/_variables.scss';
.notification{
    font-weight: 700;
    padding: 1rem 0;
    margin-top: 2rem;
    border-radius: $radius;
    color: white;
    &-success{
        background: $success;
    }
    &-error{
        background: $error;
    }
}

.fade-in-enter-active,
.fade-in-leave-active {
  transition: opacity 0.3s ease;
}

.fade-in-enter-from,
.fade-in-leave-to {
  opacity: 0;
}
</style>