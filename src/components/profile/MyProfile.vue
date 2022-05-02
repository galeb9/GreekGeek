<template>
  <div class="my-profile">

    <div class="go__back" @click="goToHome" >
        <font-awesome-icon class="back-icon" :icon="['fa', 'arrow-left']"/>
    </div>
    <!-- messages -->
    <div class="go__messages" @click="toggleMessageVisibility"  >
        <font-awesome-icon v-if="!messagesVisible" class="messages-icon" :icon="['fa', 'dove']"/>
        <font-awesome-icon v-if="messagesVisible" class="messages-icon" :icon="['fa', 'xmark']"/>
        <div v-if="requests.length != 0" class="messge-status">
            <p>!</p>
        </div>
    </div>

    <transition name="move-in-bottom">
        <div class="notifications-container" v-if="messagesVisible">
            <h2>Notifications</h2>
            <transition-group tag="ul" name="fade" class="messages-list">
                <MessageItem 
                    v-for="(el,index) in requests"
                    :key="index"
                    :img="el.messagePic"
                    :username="el.username"
                    :friendID="el.friendID"

                    :data="requests"
                    @confirm="acceptFriendship(index, el.friendID, el.username, el.messagePic)"
                    @deny="denyFriendship(index, el.username)"

                />
                <div v-if="requests.length == 0">No more messages</div>
            </transition-group>
        </div>
    </transition>


    <img src="@/assets/img/profile-bg.png" alt="" class="bg-image">
    
    <ProfileInfo 
        v-if="!messagesVisible"
        :username="username"
        :goal="goal"
        :img="getImgUrl(userImg)"
        :friends="friendCount"
    />
    <BaseButton 
        text="Change Goal" 
        align="center" 
        @click="goToGoal"
    />
    <TheHeader />

  </div>

</template>

<script>
import { db, auth } from '@/components/firebaseInit.js'
import MessageItem from '@/components/profile/MessageItem.vue'
import ProfileInfo from '@/components/profile/ProfileInfo.vue'
import TheHeader from '@/components/layout/TheHeader.vue'


export default {
    components: {
        MessageItem,
        ProfileInfo, 
        TheHeader
    },
    data(){
        return{
            user: db.collection("users").doc(auth.currentUser.uid),
            userImg: 'greek-geek.png',
            username: 'user',
            goal: 100,
            requests: [],
            messagesVisible: false,
            friendCount: 0,

        }
    },
    methods: {
        getImgUrl(pic) {
            return require('@/assets/img/avatars/' + pic)
        },
        goToHome(){
            this.$router.push("/home")
        },
        goToGoal(){
            this.$router.push("/goal")
        },
        toggleMessageVisibility(){
            this.messagesVisible = !this.messagesVisible
        },
        removeOne(arr, index){
            const oldArr = arr;
            oldArr.splice(index, 1)
            return oldArr
        },
        // firebase code 
        getUserData(){ // for profile info
            db.collection("users").doc(auth.currentUser.uid).get()
            .then(user => {
                this.userImg = user.data().userImg
                this.username = user.data().username
                this.goal = user.data().goal
            })
        },
        getMessages(){
            db.collection("users").doc(auth.currentUser.uid)
                .collection("friend-requests")
                .get()
                .then(snapshot=> {
                    snapshot.forEach(doc => {
                        this.requests.push({
                            username: doc.id,
                            status: doc.data().friends,
                            messagePic: doc.data().profileImage,
                            friendID: doc.data().friendID
                        })
                    })
                })
        },
        removeFriendRequestYouSent(name){
            db.collection("users").doc(auth.currentUser.uid)
                .collection("requests-sent")
                .doc(name)
                .delete()
        },
        acceptFriendship(index, id, name, img){ // add some notification
            const user = db.collection("users").doc(auth.currentUser.uid) 
            // add to my friends collection
            user.collection("friends")
                .doc(name)
                .set({
                    friends: true,
                    profileImage: img,
                    username : name,
                    friendID: id
                })

            // add to new friend, friends collection
            db.collection("users").doc(id)
                .collection("friends")
                .doc(this.username)
                .set({
                    friends: true,
                    profileImage: this.userImg,
                    username : this.username,
                    friendID: auth.currentUser.uid
                })

            // remove from friends collection 
            user.collection("friend-requests")
                .doc(name)
                .delete()

            // removes friend request that was sent to you
            this.removeFriendRequestYouSent(name)

            this.removeOne(this.requests, index)

        },
        // remove from friends collection 
        denyFriendship(index, name){ 
            db.collection("users").doc(auth.currentUser.uid)
                .collection("friend-requests")
                .doc(name)
                .delete()

            this.removeFriendRequestYouSent(name)
            
            this.removeOne(this.requests, index)
        },
        getFriends(){
            this.user.collection("friends").get()
                .then(snapshot => {
                    snapshot.forEach(() => {
                        this.friendCount++
                    })
                })
        }
    },
    created(){
        this.getFriends();
        this.getUserData();
        this.getMessages(); 
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.router-view{
  padding:0 !important ;
}
.my-profile{
    position: relative;
    .border{
        border: 1px solid black;
    }
    .notifications-container{
        padding: 1rem;
        // height: 100%;
        min-height: 100%;
        background: $bg;
        position: absolute;
        left: 0;
        right: 0;
        top: 20vh;
        z-index: 4;
        h2{
            margin-bottom: 1rem;
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
        box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.42);
        transition: all .1s ease-in;
        &:active{
            transform: translateY(3px);
            box-shadow: 0 0 0  rgba(0, 0, 0, 0.42);
        }
        .back-icon{
            font-size: 1.1rem;
        }
    }
    .go__back{
        top: 15px;

        left: 10px;
        width: 50px;
        height: 50px;
    }
    .go__messages{
        top: 10px;
        right: 10px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        .messages-icon{
            font-size: 1.2rem;
        }
        .messge-status{
            animation: breathe 1s infinite alternate ease-in-out;
            position: absolute;
            bottom: 0;
            right: 0;
            background: $error;
            width: 22px;
            height: 22px;
            border-radius: 2px;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            p{
                transform: rotate(-45deg);
                font-size: .8rem;
            }
        }
    }
    .bg-image{
        // position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: 100vw;

    }
}


@keyframes breathe {
    from{
        transform: scale(.95) rotate(45deg);
    }
    to{
        transform: scale(1.05) rotate(45deg);
    }
}
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from{
    opacity: 0;
    transform:  translate(-30px, 0);

}
.fade-leave-to {
    opacity: 0;
    transform:  translate(30px, 0);
}
</style>