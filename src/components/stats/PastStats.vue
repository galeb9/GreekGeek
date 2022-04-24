<template>
    <div class="past-stats">
        <div
            class="quote"
        >
            <p>{{ message }}</p>
            <p>Total: <span>{{ totalPushups }}</span> </p>
           
        </div>
        <transition name="list">
            <div class="past-list" v-if="pastData.length">
                <PastStatsItem 
                    v-for="(item, index) in pastData"
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
import { db } from '@/components/firebaseInit.js'

export default {
    components: {
        PastStatsItem
    },
    data(){
        return{
            pastData: [],
            message: "\"Quality is not an act, It is a habit.\"",
            totalPushups: 0
        }
    },
    methods: {
        getPast(){
            db.collection('days').orderBy('dateNum', 'desc').get().then(snapshot => {
                snapshot.forEach(doc => {
                    //console.log(doc.data())
                    const data = {
                        'dateNum': doc.data().dateNum,
                        'day': doc.data().day,
                        'num': doc.data().num,
                        'status': doc.data().status
                    }
                    this.pastData.push(data)
                })
            })
        },
        getTotalPushups(){
            db.collection('days').get().then(snapshot => {
                snapshot.forEach(doc => {
                    this.totalPushups += doc.data().num
                })
            })
        }
    },
    mounted(){
        this.getPast()
        this.getTotalPushups()
    },
    created(){
        // this.getPast()
        // this.getTotalPushups()

        //const sortedPast = this.pastData.sort((a, b) => a.num - b.num) 
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