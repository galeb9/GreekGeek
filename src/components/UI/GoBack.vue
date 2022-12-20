<template>
    <div :class="['go-back', {'go-back--absolute': absolute}]">
        <div :class="['go-back__icon', type]" @click="goTo(link)" >
            <font-awesome-icon class="fa-back" :icon="['fa', 'arrow-left']"/>
        </div>
        <p class="go-back__text">{{ text }}</p>
    </div>

</template>

<script>
export default {
    props: {
        text: { type: String, default: "" },
        link: { type: String, default: "" },
        type: { type: String, default: "" },
        absolute: { type: Boolean, default: true }
    },
    methods: {
        goTo(link) {
            this.$router.push("/" + link)
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';
    .go-back{
        display: flex;
        align-items: center;
        gap: 1.2rem;
        .go-back__icon{
            width: 50px;
            height: 50px;
            border-radius: 3px;
            background: $bg;
            display: flex;
            justify-content: center;
            align-items: center;
            //box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.42);
            box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.42);
            transition: all .1s ease-in;
            &:active{
                transform: translateY(3px);
                box-shadow: 0 0 0  rgba(0, 0, 0, 0.42);
            }
            .fa-back{
                font-size: 1.1rem;
            }
        }
        .go-back__text{
            font-weight: 600;
            font-size: 20px;
            letter-spacing: 1.2px;
            //text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.42);
        }
        .dark{
            background: black;
            color: white;
        }
    }
    .go-back--absolute {
        z-index: 3;
        position: absolute;
        top: 15px;
        left: 1.4rem;
    }


</style>