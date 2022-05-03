<template>
    <div class="notification-container">
        <transition name="move-in-bottom">
            <p :class="['notification__item', type]" v-if="notifVisible">
                {{ text }}
            </p>
        </transition>
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: ''
        },
        text: {
            type: String,
            default: ''
        },
        notifVisible: {
            type: Boolean,
            default: false
        },
    },
    data(){
        return{
            // isVisible: false,
            // message: '',  // need these three
            // type: '',
            // notifVisible: false,
        }
    },
    methods: { 
        // copy paste this method ⬇ to use the notif

        // useNotification(message, type){ 
        //     this.notifVisible = true
        //     this.message = message
            
        //     if(type === "success"){
        //         this.type = "notification__success"
        //     }else if( type === "error"){
        //         this.type = "notification__error"
        //     }else if(type === "warning"){
        //         this.type = "notification__warning"
        //     }

        //     setTimeout(() => {
        //         this.notifVisible = false
        //     },3000)
        // },
    },
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

    .notification-container{
        position: absolute;
        // bottom: 14vh;
        bottom: -15vh;
        left: 0;
        right: 0;
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        .notification__item{
            padding: 1rem 3rem;
            border-radius: 4px;
            width: max-content;
        }
        .notification__success{
            background: $success;
        }
        .notification__error{
            background: $error;
        }
        .notification__warning{
            background: $orange;
        }
    }
</style>