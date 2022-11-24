<template>
    <div 
        class="memeber-item" 
        @click="toggleSelected"
    >
        <div class="memeber-item__info">
            <img class="memeber-item__img" :src="img" alt="">
            <h3 class="memeber-item__name">{{ name }}</h3>
        </div>
        <div :class="['memeber-select', { 'selected' : isSelected }]"></div>

    </div>
</template>

<script>
export default {
    emits: ["isSelected"],
    props: {
        name: {type: String, default: "user404"},
        img: {type: String, default: "greek-geek.png"},
        isMember: {type: Boolean, default: false}
    },
    data(){
        return {
            isSelected: this.isMember
        }
    },
    methods: {
        toggleSelected(){
            this.isSelected = !this.isSelected
            this.$emit('isSelected', this.isSelected)
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

    .memeber-item{
        background: black;
        padding: .8rem;
        // margin-bottom: 1rem;
        border-radius: $main-radius;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .memeber-item__info{
            display: flex;
            align-items: center;
            gap: 1rem;
            .memeber-item__img{
                width: 40px;
                border-radius: 50%;
            }
        }
        .memeber-select{
            width: 25px;
            height: 25px;
            background: grey;
            border-radius: 50%;
            border: 2px solid white;
            animation: all .3s ease-in-out;
        }
        .selected{
            animation: all .3s ease-in-out;
            background: #6B7DAD !important;
            border: 5px solid white !important;
        }
    }
</style>