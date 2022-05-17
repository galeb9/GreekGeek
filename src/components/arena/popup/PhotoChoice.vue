<template>
    <div class="photo-choice">
        <h3 class="popup__heading">Choose Arena photo</h3>
        <div class="photo__list">
            <font-awesome-icon class="photo__upload" :icon="['fa', 'arrow-up-from-bracket']"/>
            <img
                class="group-photo"
                v-for="(pic, index) in pics" 
                :key="index" 
                :src="getImgUrl(pic)" 
                alt="group-photo"
            >
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pics: ["group01.png", "group02.png","group01.png", "group02.png","group01.png", "group02.png","group01.png", "group02.png"]
        }
    },
    methods: {
      getImgUrl(pic) {
        return require('@/assets/img/groups/' + pic)
      },

    }
}
</script>

<style lang="scss">

    .photo-choice{
        margin-top: 1.5rem;
        .popup__heading{
            font-weight: 700;
            font-size: 18px;
            line-height: 22px;
            color: rgba(255, 255, 255, 0.97);
        }
        .photo__list{
            padding: 1rem 0 1.5rem 0;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            overflow: scroll;
            .group-photo{
                width: 4rem;
                border-radius: 50%;
            }
            .photo__upload{
                border: 3px solid black;
                color: black;
                border-radius: 50%;
                font-size: 20px;
                padding: 1.25rem
            }
        }
    }
</style>