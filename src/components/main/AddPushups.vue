<template>
    <transition name="fade-in">
        <div class="add-pushups">
            <BaseContainer text-align="center">

                <BaseNotif 
                    :text="message"
                    :type="type"
                    :notif-visible="notifVisible"
                />

                <form 
                    @submit.prevent="saveUserPushups"
                    class="add-component"
                >
                    <BaseInput 
                        class="add__input"  
                        v-model="newPushups" 
                        placeholder="Reps?" 
                        input-type="number" 
                    />
                    <BaseButton 
                        class="add__button" 
                        text="ADD" 
                        type="submit"
                        kind="kind2"
                    />
                </form>
            </BaseContainer>
            <TheHeader />
        </div>
     
    </transition>
  

</template>

<script>
import { db, auth } from '@/components/firebaseInit.js';
import TheHeader from '@/components/layout/TheHeader.vue'

export default {
    components: {
        TheHeader
    },
    data(){
        return{
            newPushups: null,
            pushupsToShow: null,

            userId: auth.currentUser.uid,

            message: '',  
            successMessage: `Done some NICE pushups`,
            warningMessage: 'Please type in some reps...',
            type: '',
            notifVisible: false,
        }
    },
    methods: {
        useNotification(message, type){
            this.notifVisible = true
            this.message = message
            this.type = type
            setTimeout(() => {
                this.notifVisible = false
            },3000)
        },
        saveUserPushups(){
            let p = Number(this.newPushups)

            if(p !== null && p !== '' && p > 0){
                db.collection("users").doc(this.userId).get()
                .then(user => {
                    user.ref.update({
                        pushupsToday: user.data().pushupsToday + p,
                        attempts: Number(user.data().attempts) + 1
                    })
                })
                this.pushupsToShow = this.newPushups
                this.useNotification(this.successMessage, "success")

                this.newPushups = null;
            }else{
                this.useNotification(this.warningMessage, "warning")
            }
        }
    }
}
</script>

<style lang="scss">
@import  '@/assets/scss/_variables.scss';

.add-pushups {
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .user-pushups{ // test purposes only
        background: black;
        padding: .3rem;
    }
    .add-component{
        //height: 50%;
        margin-top: 2rem;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .add__input{
            background: transparent;
            text-align: center;
            font-size: 26px;
            border: 5px  $secondary dashed ;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            outline: none;
            &::placeholder{
                color: $secondary;
            }
        }
        .add__button{
            margin-top: 4rem;
        }
    }
}
.notification-container{
    .notification{
        border-radius: $radius;
        font-weight: 700 ;
        padding: 1rem 2rem;
        position: absolute;
        top: -60px;
        left: 0;
        right: 0;
    }
    .notification-success{
        background: $success;
        color: white;
    }
    .notification-error{
        background: $error;
        color: white;
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