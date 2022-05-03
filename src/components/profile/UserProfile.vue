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
            :areFriends="isFriend"
        />

        <div class="profile__btns">
            <button 
                class="profile__btn" 
                v-if="isFriend == false && isRequestSent == false " 
                @click="sendFriendRequest"
            >
                Send Friend Request
            </button>

            <button 
                class="profile__btn remove-friend__btn" 
                v-if="isFriend"  
                @click="removeFriend(name)"
            >
                Remove Friend
            </button>

            <button 
                class="profile__btn sent-friend__btn" 
                v-if="isRequestSent"
                @click="cancelRequest(name)"
            >
                <span>Friend Request Sent</span> 
                <font-awesome-icon v-if="areFriends" class="sent-icon" :icon="['fa', 'circle-check']"/>
            </button>

            <!-- <div class="notification-container">
                <transition name="move-in-bottom">
                    <p :class="['notification__item', type]" v-if="notifVisible">
                        {{ message }}
                    </p>
                </transition>
            </div> -->

            <BaseNotif
                :text="message"
                :type="type"
                :notif-visible="notifVisible"
            />

        </div>

    </div>

</template>

<script>
import { db, auth } from '@/components/firebaseInit.js'
import ProfileInfo from '@/components/profile/ProfileInfo.vue'
import BaseNotif from '@/components/UI/BaseNotif.vue'

export default {
    components: {
        ProfileInfo,
        BaseNotif
    },
    props: {
        img: {
            type: String,
            default: 'greek-geek.png'
        },
        name: {
            type: String,
            default: ''
        },
        goal: {
            type: Number,
            default: 100
        }
    },
    data(){
        return{
            userImg: 'greek-geek.png',
            username: 'user',
            friendCount: 0,

            message: '',
            type: '',
            notifVisible: false,

            friendId: '',
            friendProfilePic: '',
            currentFriend: '',

            myName: null,
            myImg: null,
            myId: null,

            isFriend: false,
            isRequestSent: false,
            
        }
    },
    methods: {
        //this shuould only hold data the logic should be in the parent or we get the data to many times
        activateNotification(){
            console.log("Sure is active...")
        },
        getImgUrl(pic) {
            return require('@/assets/img/avatars/' + pic)
        },
        closePopup(){
            this.$emit('close-popup')
        },
        
        useNotification(message, type){
            this.notifVisible = true
            this.message = message
            
            if(type === "success"){
                this.type = "notification__success"
            }else if( type === "error"){
                this.type = "notification__error"
            }else if(type === "warning"){
                this.type = "notification__warning"
            }

            setTimeout(() => {
                this.notifVisible = false
            },3000)
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
        areFriends(username){
            // const friendId;
            db.collection("users")
                .doc(auth.currentUser.uid)
                .collection("friends")
                .doc(username)
                .get()
                .then(user => {
                    if(user.data() === undefined){
                        return null
                    }else{
                        // console.log(user.data())
                        this.isFriend = user.data().friends
                    }
                })
        },
        getUserData(){ //this account data
            db.collection("users").doc(auth.currentUser.uid).get()
                .then(user => {
                    this.myName = user.data().username
                    this.myImg = user.data().userImg
                    this.myId = user.id
                    // console.log(this.myName, this.myImg, this.myId)
                })
        },
        findFriendId(){
            const users = db.collection("users")
            users.where("username", "==", this.username).get()
                .then(snapshot => {
                    snapshot.forEach(user => {
                        this.friendId = user.id
                    })
                })
        },
        saveMessageToFriend(){
            db.collection("users").doc(this.friendId)
                .collection("friend-requests")
                .doc(this.myName)
                .set({
                    friends: false,
                    profileImage: this.myImg,
                    username : this.myName,
                    friendID: this.myId
                })
        },
        addFriendRequestYouSent(name){
            db.collection("users").doc(auth.currentUser.uid)
                .collection("requests-sent")
                .doc(name)
                .set({
                    friendRequst: true
                })
        },
        cancelRequest(name){
            this.findFriendId()

            // remove friend request from myself
            db.collection("users").doc(auth.currentUser.uid)
                .collection("requests-sent")
                .doc(name)
                .delete()

            // remove friend request from user
            setTimeout(() => {
                db.collection("users")
                .doc(this.friendId)
                .collection("friend-requests")
                .doc(this.myName)
                .delete()
            }, 1000)

            this.isRequestSent = false
            this.useNotification("Friend request CANCELED", "warning")
        },
        sendFriendRequest(){
            this.findFriendId()
            this.addFriendRequestYouSent(this.name)
            setTimeout(this.saveMessageToFriend, 1000)

            this.isRequestSent = true
            this.useNotification("Friend request sent to " + this.name, "success")
        },


        isFriendRequestSent(name){
            db.collection("users")
                .doc(auth.currentUser.uid)
                .collection("requests-sent")
                .doc(name)
                .get()
                .then(user => {
                    if(user.data() != undefined){
                        this.isRequestSent = true
                    }
                    else{
                        this.isRequestSent = false
                    }
                })
        },
    },
    created(){
        this.findFriendId()
        this.getUserData()
        this.username = this.name
        this.areFriends(this.name)
        this.isFriendRequestSent(this.name)
        
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
        justify-content: center;
        transform: translate(0,-90px);
        .profile__btn{
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