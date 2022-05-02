<template>
    <div class="notification-container">
        <transition name="move-in-bottom">
            <p :class="['notification__item', notificationType]" v-if="notifVisible">
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
        // notifVisible: {
        //     type: String,
        //     default: ''
        // }
    },
    data(){
        return{
            message: null,
            notificationType: null,
            notifVisible: false 
        }
    },
    methods: {
        useNotification(message, type){
            this.notifVisible = true
            this.message = message
            
            if(this.type === "success"){
                this.notificationType = "notification__success"
            }else if( type === "error"){
                this.notificationType = "notification__error"
            }

            setTimeout(() => {
                this.notifVisible = false
            }, 3000)
        },
    },
    created(){

    }
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
    }
</style>