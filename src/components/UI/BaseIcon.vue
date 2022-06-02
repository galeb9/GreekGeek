<template>
    <div :class="['base-icon', aligment]">
        <div :class="['base-icon__icon', type]" @click="goTo(link)" >
            <font-awesome-icon class="fa-arrow-left" :icon="getIcon()"/>
        </div>
    </div>

</template>

<script>
export default {
    props: {
        link: { type: String, default: "" },
        type: { type: String, default: "" },
        aligment: { type: String, default: "top-left" },
        icon: { type: String, default: "arrow-left" }
    },
    methods: {
        goTo(link) { // maybe will break for go backs that go home => solution: give the link /home
            if(link !== ""){
                this.$router.push("/" + link)
            }
        },
        getIcon(){
            if(this.icon === "arrow-left"){
                return ['fa', 'arrow-left']
            }else if(this.icon === "trash"){
                return ['fa', 'trash-can']
            }

        }
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';
    .base-icon{
        z-index: 3;
        position: absolute;
        

        display: flex;
        align-items: center;
        gap: 1.2rem;
        .base-icon__icon{
            width: 50px;
            height: 50px;
            border-radius: 3px;
            background: $bg;
            display: flex;
            justify-content: center;
            align-items: center;
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
        //types
        .dark{
            background: black;
            color: white;
        }
        .alert{
            background: $purple;
            color:white;
        }
    }
    //aligment
    .top-left{
        top: 15px;
        left: 1.4rem;
    }
    .top-right{
        top: 15px;
        right: 1.4rem;
    }


</style>