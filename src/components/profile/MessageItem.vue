<template>
    <div 
        class="message__item"
        @click="togglemessageBtnsVisible"
    >
        <div 
            class="message__main" 
            v-if="type === 'friend-request'"
        >
            <img 
                class="message__img" 
                :src="getAvatarUrl(data.messagePic)" 
                alt="user image"
            >
            <div>
                <p>
                    <span>{{ data.username }}</span> sent you a friend request. 
                </p>
                <transition name="move-in-bottom">
                    <div class="message__btns" v-if="messageBtnsVisible">
                        <BaseButton text="Confirm" @click="confirmRequset" />
                        <BaseButton text="Deny" @click="denyRequest"/>
                    </div>
                </transition>
            </div>
        </div>


        <div 
            class="message__main" 
            v-if="type === 'arena-request'"
        >
            <img 
                class="message__img" 
                :src="getArenaUrl(data.img)" 
                alt="user image"
            >
            <div>
                <p>
                    Would you like to join <span>{{ data.name }}</span> arena from <span>{{ data.admin }}</span>?
                </p>
                <!-- <p v-for="(el, index) in data.members" :key="index">{{ el }}</p> -->
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
        img: { type: String, default: "greek-geek.png" },
        username: { type: String, default: "user#404" },
        type: { type: String, default: "friend-request"},
        data: { type: Object, default: () => {} }
    },
    data(){
        return{
            messageBtnsVisible: false,
        }
    },
    methods: {
        getAvatarUrl(pic) {
            return require('@/assets/img/avatars/' + pic)
        },
        getArenaUrl(pic) {
            return require('@/assets/img/groups/' + pic)
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
            .base-button{
                border-radius: 8px;
            }
        }
    }
</style>