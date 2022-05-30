<template>
      <div class="my-profile__info">
        <div class="my-profile__info-item">
            <h3 class="info-item__num">{{ friends }}</h3>
            <p class="info-item__name">
                Friends 
            </p>
        </div>
        <div class="my-profile__info-avatar">
            <img 
                class="avatar__img" 
                :src="img" 
                alt=""
            >
            <h2 :class="['avatar__name',  { 'success' : areFriends }]">
                <span>{{ username }}</span>
                <font-awesome-icon v-if="areFriends" class="friends-icon" :icon="['fa', 'circle-check']"/>
                
            </h2>
        </div>
        <div class="my-profile__info-item">
            <h3 class="info-item__num">{{ goal }}</h3>
            <p class="info-item__name">Goal</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        username: {
            type: String,
            default: 'user#404'
        },
        img: {
            type: String,
            default: 'greek-geek.png'
        },
        goal: {
            type: Number,
            default: 100
        },
        friends: {
            type: Number,
            default: 69
        },
        areFriends: {
            type: Boolean,
            default: false
        },

    },
    methods: {

    }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

    .my-profile__info{
        display: flex;
        justify-content: space-around;
        align-items: flex-end;
        text-align: center;
        z-index: 2;
        color: black;
        transform: translate(0,-100px);
        
        .my-profile__info-item{
            padding-bottom: 1.5rem;
            min-width: 3rem;
            .info-item__name{
                padding-top: 1rem;
            }
            .info-item__num{
                color: black;
            }
 
        }
        .my-profile__info-avatar{
            padding-top: 1rem;
            .avatar__img{
                width: 8rem;
                border: 4px solid white;
                border-radius: 4px;
                box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.42);
                // transition: all .3s ease-in;
                // &:hover{
                //     transform: skew(20deg, 20deg);
                // }
            }
            .avatar__name{
                padding-top: 1rem;
                color: black;

 
            }
            .success{
                color: $success;
                display: flex;
                align-items: center;
                gap: .8rem;
            }
        }
    }
</style>