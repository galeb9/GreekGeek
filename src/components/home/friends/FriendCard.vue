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
            <button class="user-card__add-btn">+</button>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        name: {
            type: String,
            default: ''
        },
        userImg: {
            type: String,
            default: 'greek-geek.png'
        }
    },
    data(){
      return{
          dummyImg: 'greek-geek5.jpg'
      }
    },
    methods: {
        getImgUrl(pic) {
            return require('@/assets/img/avatars/' + pic)
        },
        setProp(prop, val){
            console.log(val)
            val = prop
        }
    },
    created(){
        // setTimeout( this.setProp(this.userImg, this.dummyImg) , 1000) 
        
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

.user-card{
    display: flex;
    gap: 1rem;
    // width: 45%;
    // max-width: 45%;
    border: 5px double $secondary;
    padding: .5rem;
    max-height: 100px;
    .user-card__img{
        max-width: 100%;
        width: 4rem;
        border-radius: 5px;
    }
    .user-card__info{
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        width: 100%;
        .user-card__name{
            font-weight: 700;
            max-width: 30vw; // need to ajust is so it cannot have long name
        }
        .user-card__add-btn{
            width: 50px;
            height: 50px;
            align-self: center;
            // padding: .5rem 1rem;
            // margin-top: .2rem;
            color: white;
            border-radius: 5px;
            background: $secondary;
            border: none;
            font-size: 1.5rem;
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