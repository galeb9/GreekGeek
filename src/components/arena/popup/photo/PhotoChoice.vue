<template>
    <div class="photo-choice">
        <PopupHeading text="Choose Arena photo" />

        <div class="photo__list">
            <!-- <font-awesome-icon class="photo__upload" :icon="['fa', 'arrow-up-from-bracket']"/> -->
            <GroupPhoto 
                v-for="(pic, index) in pics" 
                :key="index" 
                :pic="pic" 
                @on-selected="selectImg"
            />
        </div>
        <!-- <p>Selected img: {{ selectedImg }}</p> -->
    </div>
</template>

<script>
import PopupHeading from '../PopupHeading.vue'
import GroupPhoto from './GroupPhoto.vue'

export default {
    components: {
        PopupHeading,
        GroupPhoto
    },
    data() {
        return {
            pics: ["group01.png", "group02.png","group03.png", "group04.png","group05.png", "group06.png","group08.png", "group09.png", "group10.png"],
            selectedImg: "",
            isSelected: false
        }
    },
    methods: {
      selectImg(isSelected, img){
        const pics = document.getElementsByClassName("selected")
        for(let i = 0; i < pics.length; i++){
            pics[i].classList.remove("selected")
        }
        this.selectedImg = img

        this.$emit("isSelected", this.selectedImg)
      }

    }
}
</script>

<style lang="scss">

    .photo-choice{
        margin-top: 1.5rem;
        .photo__list{
            padding: 1rem 0 1.5rem 0;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            overflow-y: scroll;
      
            .photo__upload{
                border: 3px solid black;
                color: black;
                border-radius: 50%;
                font-size: 20px;
                padding: 1.25rem
            }
            .group-photo{
                width: 4rem;
                border-radius: 50%;
            }
            
            .selected{
                border: 5px solid #6B7DAD !important;
            }
        }
    }
</style>