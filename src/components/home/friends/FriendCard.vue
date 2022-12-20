<template>
    <div class="user-card" @click="$emit('getFriendData', this.name, this.img, this.goal)">
        <img 
            class="user-card__img" 
            :src="getImgUrl(userImg)" 
            alt="profile image"
        >
        <div class="user-card__info">
            <p class="user-card__name">{{ name }}</p>
            <button class="user-card__add-btn">
              <font-awesome-icon class="fa-eye" :icon="['fa', 'eye']"/>
            </button>
        </div>
    </div>
</template>

<script>
// import UserProfile from '@/components/profile/UserProfile.vue'
export default {
    components: {
        // UserProfile
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
        // togglePopup(){
        //     return this.popupVisible = !this.popupVisible
        // },
        // closePopup(){
        //     return this.popupVisible = false
        // },
    },
    created(){
        this.username = this.name;
        this.img = this.userImg;
    }
}
</script>

<style lang="scss">


.user-card{
    display: flex;
    align-items: center;
    background: black;
    color: white;
    gap: 1rem;
    max-height: 100px;
    padding: 1rem;
    border-radius: $main-radius;
    box-shadow: 0px 8px 14px rgba(0, 0, 0, 0.22);
    .user-card__img{
        max-width: 100%;
        width: 3.5rem;
        border-radius: 50%;
    }
    .user-card__info{
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        width: 100%;
        .user-card__name{
            font-weight: 600;
            letter-spacing: 1px;
            max-width: 30vw; // need to adjust is so it cannot have long name
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
                color: $bg;
                width: 1.3rem;
            }
        }
    }
}
@media only screen and (max-width: 540px) {
    .user-card{
        width: 100%;
        min-width: 240px;
    }
}
</style>