<template>
<div class="group-friends">
    <PopupHeading 
        color="rgba(0,0,0, 0.6)"
        text="Other Members"
    />
</div>
    <div class="friends__list">
        <div
            v-for="(friend, index) in friends"
            :key="index" 
            class="friend-item"
        >
            <img class="friend__photo" :src="getImgUrl(friend.img)" alt="friend photo">
            <p class="friend__name">{{ longStr(friend.name) }}</p>
        </div>
    </div>
</template>

<script>
import PopupHeading from '@/components/arena/popup/PopupHeading.vue'
import { db, auth } from '@/components/firebaseInit.js';

export default {
    components: {
        PopupHeading
    },
    props: {
        members: { type: Array, default: () => [] }
    },
    data() {
        return {
            friends: []
        }
    },
    methods: {
        getImgUrl(pic) {
            return require('@/assets/img/avatars/' + pic)
        },
        longStr(str){
            return str.length > 12 ? str.slice(0, 9) + '...' : str
        },
        getMembers(){ // maybe get a main getFriends function in VUEX
            db.collection("users").doc(auth.currentUser.uid)
                .collection("friends")
                .get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        for(let i = 0; i < this.members.length; i++){
                            if(doc.data().username === this.members[i]){
                                this.friends.push({
                                    img: doc.data().profileImage,
                                    name: doc.data().username,
                                    id: doc.data().friendID
                                })
                            }
                        }
                    })
                })
        }
    },
    created(){
        if(this.friends.length === 0){
            this.getMembers()
            console.log("Got your members")
        }else{
            console.log("Members already loaded")
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

 .friends__list{
    padding: 0.5rem 0 1.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    overflow-y: scroll;
    margin-bottom: 0.5rem;
    .friend-item{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        background: black;
        color: white;
        min-width: 100px;
        height: 100px;
        // filter: drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.25));
        padding: .5rem;
        border-radius: $main-radius;
        
        .friend__photo{
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
        }
        .friend__name{
            margin-top: .5rem;
            font-size: 14px;
            font-weight: 300;
            letter-spacing: 1px;
        }
    }
    
}
</style>