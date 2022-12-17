<template>
    <div class="past-stats">
        <div class="filters">
            <div 
                v-for="(item, index) in monthsReversed" 
                :key="index"
                class="filter__item-container"
                @click="selectMonth(item)"
            >
                <div :class="['filter__item', { 'filter--active': month === item }]">{{ item }}</div>
            </div>
        </div>
        <PastStatsMonth 
            v-if="monthData"
            :month="month" 
            :monthData="monthData" 
            :daysSum="daysSum" 
        />
        <p v-else class="no__past-list"> <br> Do some pushups and <b>FINISH YOUR DAY</b> to see your days here.</p>
     </div>
</template>

<script>
import PastStatsMonth from '@/components/stats/PastStatsMonth'
import { db, auth } from '@/components/firebaseInit.js'

export default {
    components: {
        PastStatsMonth
    },
    data(){
        return{
            pastData: [],
            message: "\"Quality is not an act, It is a habit.\"",
            totalPushups: 0,
            month: null,
            monthData: [],
            daysSum: 0,
            today: new Date(),
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsReversed: ["December", "November", "October",  "September", "August", "July", "June", "May", "April", "March", "February", "January"]
        }
    },
    methods: {
        getMonthByWord(month) {
            return this.months[month]
        },
        selectMonth(month) {
            console.log(month)
            this.month = month
            this.getMonthDays()
        },
        getMonthDays(){
            db.collection("users")
                .doc(auth.currentUser.uid)
                .collection("past")
                .doc(this.month)
                .collection("days")
                .orderBy("dateNum","desc")
                .get()
                .then(snapshot => {
                    // reset and then add
                    this.monthData = []
                    this.daysSum = 0

                    snapshot.forEach((day) => {
                        this.monthData.push({
                            dateNum: day.data().dateNum,
                            num: day.data().num,
                            day: day.data().day,
                            status: day.data().status,
                            attempts: day.data().attempts
                        })
                        this.daysSum += day.data().num
                    })
            })
        },
    },
    created(){
        this.month = this.getMonthByWord(this.today.getMonth())
        this.getMonthDays()
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

.past-stats{
    padding: 0 1rem;
    min-height: 90vh;   
    .filters {
        display: flex;
        align-items: center;
        gap: 10px;
        overflow-x: auto;
        padding-bottom: 20px;
        margin-bottom: 15px;
        .filter__item {
            border: 2px solid black;
            width: max-content;
            padding: 14px;
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            .filter__item__icon {
                width: 32px;
                height: 32px;
                max-width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
        .filter--active {
            background: black;
            color: white;
        }
    }
    .past-stats__months {
        width: 100%;
        display: flex;
        gap: 30px;
        overflow-x: scroll;
        scroll-snap-type: x mandatory;
        scroll-snap-align: center;
        flex: none;
        position: relative;
        .past-stats__month {
            min-width: 100%;
            scroll-snap-stop: always;
        }
    }
    .no__past-list {
        text-align: center;
    }
}
</style>