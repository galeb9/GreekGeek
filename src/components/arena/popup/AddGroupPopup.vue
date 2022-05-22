<template>
  <div class="add-group-popup">
    <PopupHead />

    <div class="popup-main">
        <GroupInput 
            icon="arena" 
            placeholder="Arena name goes here..."
            v-model="arenaName"
        />

        <PhotoChoice />

        <div class="memebers-added">
            <PopupHeading text="Added so far:" />
            <p class="memebers-added__list">
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
                :is-member="el.isMember"
                @is-selected="changeArray(_, this.addedFriends, el.name)"
            />

        </div>
    </div>
   

  </div>
</template>

<script>
import PopupHead from './PopupHead.vue'
import GroupInput from './GroupInput.vue'
import PhotoChoice from './PhotoChoice.vue'
import PopupHeading from './PopupHeading.vue'
import MemberItem from './MemberItem.vue'


export default {
    components: {
        PopupHead,
        GroupInput,
        PhotoChoice,
        PopupHeading,
        MemberItem
    },
    data() {
        return {
            arenaName: "",
            memeberSearch: "",

            memeberSelected: false,
            addedFriends: [],
            memeberName : "galeb9",
            memebers: [ //dummy, later call friends from firebase
                { name: "galeb9", img: "greek-geek.png", isMember: false },
                { name: "medo007", img: "greek-geek2.png", isMember: false },
                { name: "Šaman69", img: "greek-geek3.png", isMember: false },
                { name: "sinjikit131", img: "greek-geek4.jpg", isMember: false },
                { name: "user03", img: "greek-geek5.jpg", isMember: false },
                { name: "user04", img: "greek-geek6.jpg", isMember: false },
            ],
            matchingMembers: []
            // adding does not work properly... but it works somehow... 
            // have to figure out maybe add prop to memebers array added: true or false and toggle it like you toggle now 
            // do on seperate branch
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
        changeArray(selected, arr, name){
            const inArr = arr.every( el => el !== name)
            if(selected && inArr){
                arr.push(name)
            }else {
                this.removeFromArray(arr, name)
            }

        },
 
    },
    computed: { //somehow do so you cannot find yourself (remove from array)
        searchForUser(){
            return this.memebers.filter(user => user.name.toLowerCase().indexOf(this.memeberSearch.toLowerCase()) != -1)
        },
    },
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

    .add-group-popup{
        min-width: 321px;
        max-height: 90vh;
        // height: 100%;
        // overflow-y: scroll;
        background: rgba(126, 164, 220, 0.27);
        backdrop-filter: blur(25px);
        border-radius: 20px 20px 0 0;
        position: fixed;
        z-index: 101;
        bottom: -10px;
        left: 0;
        right: 0;
        color: white;
        padding: .8rem 1.8rem;

        .popup-main{
            max-height: 70vh;
            height: 100%;
            overflow-y: scroll;
            .memebers-added{
                background: black;
                margin: 1rem 0;
                padding: 1rem ;
                border-radius: $main-radius;
                .memebers-added__list{
                    margin-top: .5rem;
                }
            }

            .memebers-list{
                padding-bottom: 100px; // to have space bellow
            }
        }



    }
    @media only screen and (max-width: 350px) {
        
    }
</style>