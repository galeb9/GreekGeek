<template>
    <div class="past-stats">
        <div class="quote"><!-- <p>{{ message }}</p> --></div>
        <div class="current-month">
            <div class="current-month__row">
                <p class="current-month__item">{{ month }}</p>
            </div>
            <div class="current-month__row">
                <div class="current-month__item month__item--column">
                    <p>Avrage</p> 
                    <p> {{ monthAvg }} /set </p>
                </div>
                <div class="current-month__item month__item--column">
                    <p>Total</p> 
                    <p> {{ totalPushups }}</p>
                </div>

            </div>
        </div>
        <transition name="list">
            <div class="past-list" v-if="dayz.length">
                <PastStatsItem 
                    v-for="(item, index) in dayz"
                    :key="index"

                    :dateNum="item.dateNum"
                    :day="item.day"
                    :num="item.num"
                    :status="item.status"
                    :attempts="item.attempts"
                />
            </div>
            <div v-else-if="loader">
                <LoaderThingy />
            </div>
            <p class="no__past-list" v-else> <b>No days...</b> <br> Do some pushups and <b>FINISH</b> your <b>DAY</b> to see your days here.</p>
        </transition>
     </div>
</template>

<script>
import PastStatsItem from '@/components/stats/PastStatsItem'
import LoaderThingy from '@/components/UI/LoaderThingy.vue'
import { db, auth } from '@/components/firebaseInit.js'

export default {
    components: {
        PastStatsItem,
        LoaderThingy
    },
    data(){
        return{
            pastData: [],
            message: "\"Quality is not an act, It is a habit.\"",
            totalPushups: 0,
            month: null,
            monthAvg: null,
            today: new Date(),
            userId: auth.currentUser.uid,
            // days: [],
            dayz: [],
            loader: true
        }
    },
    methods: {
        getMonthByWord(month) {
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            return months[month]
        },
        getTotalPushups(){
            db.collection('days').get().then(snapshot => {
                snapshot.forEach(doc => {
                    this.totalPushups += doc.data().num
                })
            })
        },
        hideLoader() {
            setTimeout(() => {
                this.loader = false
            }, 1000);
        },
        getMonthAvrage() {
            let avgs = 0
            let count = 0
            this.dayz.forEach((item) => {
                avgs += (item.num / item.attempts)
                count++
            }) 
            this.monthAvg =  avgs / count
        },
        // new firebase code

        // getUserData(){
        //     db.collection("users").doc(this.userId).get()
        //     .then(user => {
        //         const data = user.data().days
        //         for(let key in data){
        //             this.days.push({
        //                 dateNum: data[key].dateNum,
        //                 num: data[key].num,
        //                 day: data[key].day,
        //                 status: data[key].status
        //             })
        //             this.totalPushups += data[key].num 
        //         }
        //     })
        // },
        getOtherMonthsDays() { 
            // problem when creating a document for july 
            // souliton -> must add some field to it beacause it cannot be just a placeholder
            db.collection("users")
                .doc(this.userId)
                .collection("past")
                .get()
                .then(snapshot => {
                    snapshot.forEach(month => {
                        console.log(month.id)
                    })
                })
        },
        getCurrentMonthDays(){
            db.collection("users").doc(this.userId)
                .collection("past")
                .doc(this.month)
                .collection("days")
                .orderBy("dateNum","desc")
                .limit(10) // max last 10
                .get() //get the days
                .then(snapshot => {
                snapshot.forEach((day) => {
                    // console.log(day.id, " => ", day.data());
                    this.dayz.push({
                        dateNum: day.data().dateNum,
                        num: day.data().num,
                        day: day.data().day,
                        status: day.data().status,
                        attempts: day.data().attempts
                    })
                    this.totalPushups += day.data().num
                })
            })
        },
    },
    created(){
        this.month = this.getMonthByWord(this.today.getMonth())
        this.getCurrentMonthDays()
        this.hideLoader()
        this.getOtherMonthsDays()

        setTimeout(() => {
            this.getMonthAvrage()
        }, 400);
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

.past-stats{
    padding: 0 1rem;
    min-height: 90vh;
    .no__past-list {
        max-width: 80%;
        text-align: center;
        margin: 0 auto;
        padding-top: 80px;
    }
    .past-list{
        height: 100%;
        overflow-y: scroll;
        padding: 0 0 140px;
    }
    .quote{
        color: black;
        text-align: center;
        font-size: 18px;
        letter-spacing: 1px;
    }
    .current-month {
        margin-bottom: 2rem;
        .current-month__row{
            display: flex;
            justify-content: space-around;
            gap: 10px;
            margin-bottom: 1rem;
            .current-month__item{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                flex: 1;
                font-weight: 700;
                background: black;
                color: white;
                padding:  .8rem 2rem;
                width: max-content;
                border-radius: 10px;
            }
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
  transform: translateY(40px);
}
</style>