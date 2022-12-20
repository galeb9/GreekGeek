<template>
   <div 
        class="ranked__item"
    >
        <div class="ranked__img-container">
            <img 
                class="ranked__img"
                :src="getImgUrl(img)" 
                alt="user-image"
            >
        </div>
        <p class="ranked__name">{{ checkName() }}</p>

    </div>
</template>

<script>
export default {
    props: {
        img: { type: String, default:"greek-geek.png"},
        name: { type: String, default:""}
    },
    computed: {
        myUsername(){
            return this.$store.getters.myUsername
        }
    },
    methods: {
        getImgUrl(pic) {
            return require('@/assets/img/avatars/' + pic)
        },
        checkName(){
            if(this.name === this.myUsername){
                return "You"
            } else if(this.name.length > 9){
                return this.name.slice(0, 7) + "..."
            }
            return this.name
        }
    }
}
</script>

<style lang="scss">

    .ranked__item{
        text-align: center;
        .ranked__img-container{
            position: relative;
            .ranked__img{
                width: 6rem;
                height: 6rem;
                border-radius: 50%;
                border: 5px solid black;
            }
    
            &::after{
                content: "";
                width: 30px;
                height: 30px;
                background: black;
                color: black;
                font-weight: 700;
                border-radius: 50%;
                border: 4px solid $bg;
                display: flex;
                justify-content: center;
                align-items: center;

                position: absolute;
                bottom: -3px;
                right: -4px;

            }
        }
        .ranked__name{
            margin-top: .5rem;
        }
        &:nth-child(1){
            .ranked__img-container::after{
                content: 'I';
                background: $gold;
            }
            .ranked__img{
                border-color: $gold;
                min-width: 6rem;
                width: 6rem;
                height: 6rem;
            }
        }
        &:nth-child(2) {
            .ranked__img-container::after{
                content: 'II';
                background: $silver;
            }
            .ranked__img{
                border-color: $silver;
                min-width: 5.3rem;
                width: 5.3rem;
                height: 5.3rem;
            }
        }
        &:nth-child(3) {
            .ranked__img-container::after{
                content: 'III';
                background: $bronze;
            }  
            .ranked__img{
                border-color: $bronze;
                min-width: 4.5rem;
                width: 4.5rem;
                height: 4.5rem;
            }
        } 
    }

</style>