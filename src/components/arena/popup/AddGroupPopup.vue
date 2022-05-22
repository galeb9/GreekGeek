<template>
  <div class="add-group-popup">
    <PopupHead />
    <div class="popup-main">

        <GroupItem 
            :img="selectedImg"
            :name="arenaName === '' ? 'Group name' : arenaName "
            :members="addedFriends.length"
        />

        <GroupInput 
            icon="arena" 
            placeholder="Arena name goes here..."
            v-model="arenaName"
        />

        <PhotoChoice @is-selected="getSelectedImg"/>
        <!-- <p>Selected image: {{selectedImg}}</p> -->
        <div class="memebers-added">
            <PopupHeading 
                class="popup__heading--special"
                text="Added so far" 
            >
                <span class="added-count">{{ addedFriends.length }} / {{ memebers.length }}</span>
            </PopupHeading>
            <p class="memebers-added__list" v-if="addedFriends.length > 0">
                {{ addedFriends.join(", ") }}
            </p>
        </div>

        <GroupInput 
            icon="loupe" 
            placeholder="Search for memebers"
            v-model="memeberSearch"
        />

        <PopupHeading 
            text="Search:" 
            top-margin="1.5rem"
            bottom-margin="1.5rem"    
        />

        <div class="memebers-list">
            <MemberItem 
                v-for="(el, index) in searchForUser"
                :key="index + el.name"
                :name="el.name"
                :img="getImgUrl(el.img)"  
                :is-member="el.isMemeber"
                @is-selected="changeArray(_, this.addedFriends, el.name)"
            />
        </div>

        <div class="popup__btns">
            <BaseButton 
                text="Add Arena" 
                class="add-arena-popup__btn"
                :shadow="false"
                align="" 
                @click="CreateNewArena"
            />
            <BaseButton 
                text="cancel" 
                kind="close"
                align="" 
                @click="$emit('closePopup')" 
            />
        </div>


    </div>
   

  </div>
</template>

<script>
import PopupHead from './PopupHead.vue'
import GroupInput from './GroupInput.vue'
import PhotoChoice from './photo/PhotoChoice.vue'
import GroupItem from '../group/GroupItem.vue'
import PopupHeading from './PopupHeading.vue'
import MemberItem from './MemberItem.vue'


export default {
    components: {
        PopupHead,
        GroupInput,
        PhotoChoice,
        PopupHeading,
        MemberItem,
        GroupItem
    },
    data() {
        return {
            arenaName: "",
            memeberSearch: "",

            addedFriends: [],
            memebers: [ //dummy, later call friends from firebase
                { name: "galeb9", img: "greek-geek.png", isMemeber: false },
                { name: "medo007", img: "greek-geek2.png", isMemeber: false },
                { name: "Šaman69", img: "greek-geek3.png", isMemeber: false },
                { name: "sinjikit131", img: "greek-geek4.jpg", isMemeber: false },
                { name: "user03", img: "greek-geek5.jpg", isMemeber: false },
                { name: "user04", img: "greek-geek6.jpg", isMemeber: false },
            ],
            matchingMembers: [],
            selectedImg: 'group01.png'
        }
    },

    methods: {
        getImgUrl(pic) {
            return require('@/assets/img/avatars/' + pic)
        },
        removeFromArray(arr, el){
            var index = arr.indexOf(el);
            if (index !== -1) {
                arr.splice(index, 1);   
            }
        },
        getSelectedImg(img){
            this.selectedImg=img
        },
        changeArray(selected, arr, name){
            const notInArr = arr.every( el => el !== name) // true if current name is not yet in added friends

            if(selected && notInArr){
                arr.push(name)
            }else {
                this.removeFromArray(arr, name)
            }
        },
        CreateNewArena(){
            const data = {
                img: this.selectedImg,
                name: this.arenaName,
                memebers: this.addedFriends.length
            }
            this.$emit("newArenaData", data)
        }
    },
    computed: { //somehow do so you cannot find yourself (remove from array)
        searchForUser() {
            for(let i = 0; i < this.memebers.length; i++){
                for(let j = 0; j < this.addedFriends.length; j++){
                    if(this.memebers[i].name === this.addedFriends[j]){
                        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                        this.memebers[i].isMemeber = true // some wierd quickfix maybe not good? uppper comment stoped eslint??
                    }
                }
            }
            return this.memebers.filter(user => user.name.toLowerCase().indexOf(this.memeberSearch.toLowerCase()) != -1)
        },
    },
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

    .add-group-popup{
        min-width: 321px;
        max-height: 102vh;
        // max-height: max-height;
        background: rgba(126, 164, 220, 0.27);
        -webkit-backdrop-filter: blur(25px);
        backdrop-filter: blur(25px);
        //border-radius: 20px 20px 0 0;
        position: fixed;
        z-index: 101;
        top: 0;
        left: 0;
        right: 0;
        color: white;
        // padding: .8rem 1.8rem;

        .popup-main{
            max-height: 87vh;
            height: 100%;
            overflow-y: scroll;
            padding: .8rem 1.8rem;

            padding-bottom: 3rem;
            .memebers-added{
                background: black;
                margin: 1rem 0;
                padding: 1rem;
                border-radius: $main-radius;
                .popup__heading--special{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .added-count{
                        font-weight: 400;
                        letter-spacing: 2px;
                        font-size: 16px !important;
                    }  
                }
                .memebers-added__list{
                    margin-top: .5rem;
                }
            }
            .memebers-list{
                padding-bottom: 100px; // to have space bellow
            }
            .add-arena-popup__btn .base-button{
                border-radius: $main-radius;                
            }
            .popup__btns{
                display: flex;
                justify-content: center;
                gap: 1rem;
            }
        }
    }
    // @media only screen and (max-width: 350px) {
        
    // }
</style>