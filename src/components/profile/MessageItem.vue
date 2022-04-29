<template>
    <div 
        class="message__item"
        @click="togglemessageBtnsVisible"
    >
        <div class="message__main">
            <img 
                class="message__img" 
                :src="getImgUrl(img)" 
                alt=""
            >
            <div>
                <p>
                    <span>{{ username }}</span> sent you a friend request. 
                </p>
                <transition name="move-in-bottom">
                    <div class="message__btns" v-if="messageBtnsVisible">
                        <BaseButton text="Confirm" @click="confirmRequset" />
                        <BaseButton text="Deny" @click="denyRequest"/>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        img: {
            type: String,
            default: "greek-geek.png"
        },
        username: {
            type: String,
            default: "user#404"
        },
        friendID: {
            type: String,
            default: ''
        }
    },
    data(){
        return{
            messageBtnsVisible: false,
        }
    },
    methods: {
        getImgUrl(pic) {
            return require('@/assets/img/avatars/' + pic)
        },
        togglemessageBtnsVisible(){
            this.messageBtnsVisible = !this.messageBtnsVisible
        },

        confirmRequset(){
            this.$emit("confirm")
        },
        denyRequest(){
            this.$emit("deny")
        }
    }


}
</script>

<style lang="scss">
    .message__item{
        margin-bottom: 1.5rem;
        .message__main{
            display: flex;
            align-items: center;
            gap: 2rem;
            span{
                font-weight: 700;
            }
            .message__img{
                width: 4rem;
                height: 4rem;
                border-radius: 50%;
                box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.42);
            }
        }
        .message__btns{
            // padding: 1rem 0;
            padding-top: .8rem;
            display: flex;
            gap: 1rem;
            // border-bottom: 1px solid black;
        }
    }
</style>