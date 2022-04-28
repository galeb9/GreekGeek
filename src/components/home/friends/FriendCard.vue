<template>
    <div
        class="user-card"
    >
        <!-- <img 
            class="user-card__img" 
            :src="getImgUrl(userImg)" 
            alt=""
        > -->
        <img 
            class="user-card__img" 
            :src="getImgUrl(userImg)" 
            alt=""
        >

        <div class="user-card__info">
            <p class="user-card__name">{{ name }}</p>
            <button class="user-card__add-btn" @click="togglePopup" >
              <font-awesome-icon class="fa-eye" :icon="['fa', 'eye']"/>
            </button>
        </div>
        <transition name="move-in-bottom">
            <div class="user-profile__popup" v-show="popupVisible">
                <UserProfile
                    @close-popup="closePopup"
                    :img="userImg"
                    :name="name"
                    :goal="goal"
                />
            </div>
        </transition>

        <!-- <div class="add-friend-popup" v-show="popupVisible">
            <p>Send friend request to {{ name }}?</p>
            <div class="popup__btns">
                <button @click="addFriend">Yes</button>
                <button @click="closePopup">No</button>
            </div>
        </div> -->
    </div>
</template>

<script>
import { db, auth } from '@/components/firebaseInit.js'
import UserProfile from '@/components/profile/UserProfile.vue'
export default {
    components: {
        UserProfile
    },
    props: {
        name: {
            type: String,
            default: 'user'
        },
        userImg: {
            type: String,
            default: 'greek-geek.png'
        },
        goal: {
            type: Number,
            default: 100
        }
    },
    data(){
      return{
        popupVisible: false,
        username: null,
        img: null
      }
    },
    methods: {
        getImgUrl(pic) {
            return require('@/assets/img/avatars/' + pic)
        },
        togglePopup(){
            return this.popupVisible = !this.popupVisible
        },
        closePopup(){
            return this.popupVisible = false
        },
        addFriend(){
            db.collection("users").doc(auth.currentUser.uid)
                .collection("friends")
                .doc(this.username)
                .set({
                    username: this.username,
                    userImg: this.img
                })
            console.log("New Friend added!")
            this.popupVisible = false
        }
    },
    created(){
        this.username = this.name;
        this.img = this.userImg;
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

.user-card{
    display: flex;
    gap: 1rem;
    // border-radius: 3px;
    // border-bottom: 1px solid $secondary;
    max-height: 100px;
    padding-bottom: .3rem;
    .user-profile__popup{
        position: absolute;
        top: 0;
        left: 0;
    }
    .add-friend-popup{
        border: 10px double white;
        position: absolute;
        top: 50vh;

        left: 1.5rem;
        right: 5vw;

        margin: 0 auto;
        background: rgba(#000000, .9);
        color: white;
        padding: 2rem ;
        text-align: center;
        p{
            margin-bottom: 1rem;
            font-weight:600;
            letter-spacing: 1px;
        }
        .popup__btns{
            display: flex;
            justify-content: center;
            gap: 2rem;
            button{
                padding: .6rem 1.8rem;
                text-transform: uppercase;
                font-weight: 700;
                border: none;
                border: 8px double black;
                outline: none;
            }
        }

    }
    .user-card__img{
        max-width: 100%;
        width: 4rem;
        // border-radius: 50%;
    }
    .user-card__info{
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        width: 100%;
        .user-card__name{
            padding-top: .5rem;
            font-weight: 900;
            letter-spacing: 1px;
            max-width: 30vw; // need to ajust is so it cannot have long name
        }
        .user-card__add-btn{
            width: 50px;
            height: 50px;
            align-self: center;
            background: transparent;
            // border: 1px solid $secondary;
            border: none;
            font-size: 1.5rem;
            border-radius: 5px;
            .fa-eye{
                color: $secondary;
            }
        }
    }
}
@media only screen and (max-width: 540px) {
    .user-card{
        width: 90%;
        min-width: 240px;
    }
}
</style>