<template>
    <img
        :class="['group-photo', { selected : isSelected }]"
        :src="getImgUrl(pic)" 
        alt="group-photo"
        @click="toggleSelected"
    >
</template>

<script>
export default {
    emits: ["onSelected"],
    props: {
        pic: { type: String, default: 'greek-geek.png'},
        // isSelected: { type: Boolean, default: false}
    },
    data() {
        return {
            isSelected: false,
            img: this.pic
        }
    },
    methods: {
        getImgUrl(pic) {
            return require('@/assets/img/groups/' + pic)
        },
        toggleSelected(){
            this.isSelected = !this.isSelected
            this.$emit("onSelected", this.isSelected, this.img)
        }
    }
}
</script>

<style lang="scss">
    .group-photo{
        width: 4rem;
        border-radius: 50%;
    }
    .selected{
        border: 5px solid #6B7DAD !important;
    }
</style>