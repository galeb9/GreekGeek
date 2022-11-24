<template>
    <router-link 
        :to="'/' + url" 
        class="base-icon-link"
    >
        <!-- should look like this :icon="['fa', 'right-from-bracket']" -->
        <font-awesome-icon class="fa-icon" :icon="icon" :size="size"/>
        <div v-if="areProfileNotifications && this.icon[1] === 'user'" class="profile-notification__alert"></div>
    </router-link>
</template>

<script>
export default {
    props: {
        url: { type: String,  default: '' },
        icon: { type: Array, default: ()=>{} },
        size: { type: String, default: () => {} },
    },
    data() {
        return {
            profileIcon: ['fa','']

        }
    },
    computed: {
        areProfileNotifications() {
            return this.$store.getters.areProfileNotifications
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';
    .base-icon-link {
        position: relative;
        display: flex;
        .profile-notification__alert{
            animation: breathe 1s infinite alternate ease-in-out;
            position: absolute;
            bottom: 30px;
            background: $error;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            p{
                transform: rotate(-45deg);
                font-size: 10px;
            }
            @keyframes breathe {
                from{
                    transform: scale(.95) rotate(45deg);
                }
                to{
                    transform: scale(1.05) rotate(45deg);
                }
            }
        }
    }

</style>