<template>
    <div class="past-stats">
        <div
            class="quote"
        >
            <p>{{ message }}</p>
            <p>Total: <span>{{ totalPushups }}</span> </p>
        </div>
        <transition name="list">
            <div class="past-list" v-if="days.length">
                <PastStatsItem 
                    v-for="(item, index) in days"
                    :key="index"

                    :dateNum="item.dateNum"
                    :day="item.day"
                    :num="item.num"
                    :status="item.status"
                />
            </div>
        </transition>
     </div>
</template>

<script>
import PastStatsItem from '@/components/stats/PastStatsItem'
import { db, auth } from '@/components/firebaseInit.js'

export default {
    components: {
        PastStatsItem
    },
    data(){
        return{
            pastData: [],
            message: "\"Quality is not an act, It is a habit.\"",
            totalPushups: 0,

            userId: auth.currentUser.uid,
            days: []
        }
    },
    methods: {
        getTotalPushups(){
            db.collection('days').get().then(snapshot => {
                snapshot.forEach(doc => {
                    this.totalPushups += doc.data().num
                })
            })
        },
        
        // new firebase code
        getDays(){
            db.collection("users").doc(this.userId).get()
            .then(user => {
                const data = user.data().days
                for(let key in data){
                    this.days.push({
                        dateNum: data[key].dateNum,
                        num: data[key].num,
                        day: data[key].day,
                        status: data[key].status
                    })
                }
            })
        },
    },

    created(){
        this.getDays();
        console.log(this.days)
        // const sortedPast = this.days.sort((a, b) =>  b.dateNum - a.dateNum) 
    }
    
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

.past-stats{
    padding: 0 1rem;
    margin-top: 3rem;
    min-height: 90vh;
    .past-list{
        height: 100%;
        overflow-y: scroll;
        padding: 0 20px 140px 20px
    }
    .quote{
        color: black;
        text-align: center;
        margin-top: 3rem;
        font-size: 18px;
        letter-spacing: 1px;

        p:first-child{
            margin-bottom: 1rem;
            padding-bottom: 1rem;
            border-bottom: 1px dashed black;
        }
        p:last-child{
            font-weight: 700;
            background: $secondary;
            color: white;
            padding:  .8rem 2rem;
            width: max-content;
            border-radius: 10px;
            margin: 2rem auto;
        }
    }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>