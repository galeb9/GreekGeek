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
            <button class="profile__btn" v-if="!isFriend" @click="sendFriendRequest">Send Friend Request</button>
            <button class="profile__btn remove-friend__btn" v-else  @click="RemoveFriend(name)">Remove Friend</button>
            <div class="notification-container">
                <transition name="move-in-bottom">
                    <p class="notification__suceess" v-if="notifVisible">
                        Friend request sent to {{ name }}
                    </p>
                </transition>
            </div>
        </div>

    </div>

</template>

<script>
import { db,auth } from '@/components/firebaseInit.js'
import ProfileInfo from '@/components/profile/ProfileInfo.vue'

export default {
    components: {
        ProfileInfo
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
            notifVisible: false,
            friendCount: 0,

            friendId: '',
            friendProfilePic: '',
            currentFriend: '',

            myName: null,
            myImg: null,
            myId: null,

            isFriend: false
        }
    },
    methods: {
        //this shuould only hold data the logic should be in the parent or we get the data to many times

        getImgUrl(pic) {
            return require('@/assets/img/avatars/' + pic)
        },
        closePopup(){
            this.$emit('close-popup')
        },
        useNotification(){
            this.notifVisible = true
            setTimeout(() => {
                this.notifVisible = false
            },3000)
        },

        removeFriend(username){
            db.collection("users")
                .doc(auth.currentUser.uid)
                .collection("friends")
                .doc(username)
                .delete()
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
        sendFriendRequest(){
            this.findFriendId()
            setTimeout(this.saveMessageToFriend, 1000)
            this.useNotification()
        },
    },
    created(){
        this.findFriendId()
        this.getUserData()
        this.username = this.name
        this.areFriends(this.name)

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
        .notification__suceess{
            width: max-content;
            background: $success;
            padding: 1rem 3rem;
            border-radius: 4px;
            // margin-left: 1rem;

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