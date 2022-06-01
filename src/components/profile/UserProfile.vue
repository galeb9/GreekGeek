<template>
    <div class="user-profile">

        <div class="go__back" @click="closePopup" >
            <font-awesome-icon class="back-icon" :icon="['fa', 'arrow-left']"/>
        </div>
        
        <img src="@/assets/img/profile-bg.png" alt="" class="bg-image">

        <ProfileInfo 
            :username="name"
            :goal="goal"
            :img="getImgUrl(img)"
            :friends="friendCount"

            :areFriends="areWeFriends"
        />


        <div class="profile__btns">

            <button 
                class="profile__btn" 
                v-if="canSendRequest " 
                @click="sendFriendRequest"
            >
                Send Friend Request
            </button>

         

            <button 
                class="profile__btn sent-friend__btn" 
                v-if="haveSentRequest"
                @click="cancelRequest(name)"
            >
                <span>Friend Request Sent</span> 
                <font-awesome-icon 
                    class="sent-icon" 
                    :icon="['fa', 'circle-check']"
                />
            </button>


            <button 
                class="profile__btn remove-friend__btn" 
                v-if="weAreFriends"  
                @click="removeFriend(name)"
            >
                Remove Friend
            </button>


            <BaseNotif
                :text="message"
                :type="type"
                :notif-visible="notifVisible"
            />

        </div>

        <!-- <div style="text-align: center">
            <p >{{ id }}</p>
            <p>Request sent? {{ requestSent }} : {{ isRequestSent }}</p>
            <p>Friends? {{ areWeFriends }} : {{ isFriend }} </p>
        </div> -->

    </div>

</template>

<script>
import { db, auth } from '@/components/firebaseInit.js'
import ProfileInfo from '@/components/profile/ProfileInfo.vue'

export default {
    components: {
        ProfileInfo,
    },
    props: {
        img: {
            type: String,
            default: 'greek-geek.png'
        },
        id: {
            type: String,
            default: ""
        },
        name: {
            type: String,
            default: ''
        },
        goal: {
            type: Number,
            default: 100
        },
        requestSent: {
            type: Boolean,
            default: false
        },
        areWeFriends: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return{
            userImg: 'greek-geek.png',
            username: 'user404',
            friendCount: 0,

            message: '',
            type: '',
            notifVisible: false,

            myName: null, 

            friendProfilePic: '',
            currentFriend: '',

            isFriend: false,
            isRequestSent: this.requestSent,


        }
    },
    watch: {
        requestSent(){
            this.isRequestSent = this.requestSent
            console.log("is request sent? " + this.isRequestSent)

        },
        areWeFriends(){
            this.isFriend = this.areWeFriends
            console.log("Are friends? " + this.areWeFriends)
        
        }
    },
    computed: {
        myUsername(){
            return this.$store.getters.myUsername
        },
        myAvatarImg(){
            return this.$store.getters.myAvatar;
        },
        myGoal(){
            return this.$store.getters.myGoal
        },
        canSendRequest(){
            if(!this.isFriend  && !this.isRequestSent){
                return true
            } 
            return false
        },
        haveSentRequest(){
            return this.isRequestSent ? true : false
        },
        weAreFriends(){
            return this.isFriend ? true : false
        },
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
        activateNotification(){
            console.log("Sure is active...")
        },
        getImgUrl(pic) {
            return require('@/assets/img/avatars/' + pic)
        },
        closePopup(){
            this.$emit('close-popup')
        },

        addFriendRequestYouSent(name){
            db.collection("users").doc(auth.currentUser.uid)
                .collection("requests-sent")
                .doc(name)
                .set({
                    friendRequst: true
                })
                console.log("friend Request gets sent")
        },
        saveMessageToFriend(){
            db.collection("users").doc(this.id)
                .collection("friend-requests")
                .doc(this.myName)
                .set({
                    friends: false,
                    profileImage: this.myUsername,
                    username : this.myAvatarImg,
                    friendID: auth.currentUser.uid
                })
        },
        sendFriendRequest(){
            this.addFriendRequestYouSent(this.name)
            setTimeout(this.saveMessageToFriend, 2000)
            this.isRequestSent = true
            this.useNotification("Friend request sent to " + this.name, "success")
        },
        removeFriend(name){
            db.collection("users")
                .doc(auth.currentUser.uid)
                .collection("friends")
                .doc(name)
                .delete()

            this.useNotification(this.name + " removed from friend list.", "error")
            this.isFriend = false
        },

        cancelRequest(name){ // cancels friend request

            // remove friend request from myself
            db.collection("users").doc(auth.currentUser.uid)
                .collection("requests-sent")
                .doc(name)
                .delete()

            // remove friend request from user
            setTimeout(() => {
                db.collection("users")
                .doc(this.id)
                .collection("friend-requests")
                .doc(this.myUsername)
                .delete()
            }, 1000)
            this.isRequestSent = false
            this.useNotification("Friend request CANCELED", "warning")
        },
    },
    created(){
        this.myName = this.myUsername;
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.router-view{
  padding:0 !important ;
}
.user-profile{
    background: $bg;
    width: 100vw;
    min-height: 100vh;
    overflow: hidden;
    position: relative;
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
    .profile__btns{
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1rem;
        transform: translate(0,-90px);
        .profile__btn{
            width: 80%;
            align-self: center;
            padding: 1rem 3rem;
            // margin-left: 1rem;
            border: none;
            outline: none;
            color: white;
            background: black;
            border-radius: 4px;
            box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.42);
            transition: all .1s ease-in;
            &:active{
                transform: translateY(3px);
                box-shadow: 0 0 0  rgba(0, 0, 0, 0.42);
            }
        }
        .remove-friend__btn{
            background: $error;
            color: white;
        }
        .sent-friend__btn{
            background: $success;
            .sent-icon{
                margin-left: 1rem;
            }
        }
    }
    .go__back,
    .go__messages{
        position: absolute;
        border-radius: 3px;
        background: $bg;
        z-index: 3;
        display: flex;
        justify-content: center;
        align-items: center;
        .back-icon{
            font-size: 1.1rem;
            color: black;
        }
    }
    .go__back{
        top: 15px;
        left: 10px;
        width: 50px;
        height: 50px;
        box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.42);
        transition: all .1s ease-in;
        &:active{
            transform: translateY(3px);
            box-shadow: 0 0 0  rgba(0, 0, 0, 0.42);
        }
    }
    .bg-image{
        top: 0;
        left: 0;
        z-index: 1;
        width: 100vw;
    }
    .user-profile__info{
        display: flex;
        justify-content: space-around;
        align-items: flex-end;
        text-align: center;
        z-index: 2;
        transform: translateY(-100px);
        .user-profile__info-item{
            padding-bottom: 1.5rem;
            .info-item__name{
                padding-top: 1rem;
            }
            .info-item__num{
                color: black;
            }
        }
        .user-profile__info-avatar{
            padding-top: 1rem;

            .avatar__img{
                width: 8rem;
                border: 4px solid white;
                box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.42);
            }
            .avatar__name{
                padding-top: 1rem;
                color: black;
            }
        }
    }
}
</style>