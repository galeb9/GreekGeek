<template>
  <div class="past-stats__month" v-if="days.length">
    <div class="current-month">
        <div class="current-month__row row--center">
            <p class="current-month__item">{{ month }}</p>
        </div>
        <div class="current-month__row">
            <div class="current-month__item month__item--column">
                <p>Avrage</p> 
                <p> {{ Math.floor(monthAvg) }} /set </p>
            </div>
            <div class="current-month__item month__item--column">
                <p>Total</p> 
                <p> {{ total }}</p>
            </div>
        </div>
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
                :attempts="item.attempts"
            />
            <div v-if="loader">
                <LoaderThingy />
            </div>
        </div>

    </transition>
  </div>
</template>

<script>
import LoaderThingy from '@/components/UI/LoaderThingy.vue'
import PastStatsItem from '@/components/stats/PastStatsItem'
import { db, auth } from '@/components/firebaseInit.js'

export default {
    components: {
        PastStatsItem,
        LoaderThingy
    },
    props: {
        month: { tpye: String, default: '' },
    },
    data() {
        return {
            monthAvg: 0,
            days: [],
            total: 0,
            loader: true
        }
    },
    methods: {
        hideLoader() {
            setTimeout(() => {
                this.loader = false
            }, 1000);
        },
        getMonthAvrage() {
            let avgs = 0
            let count = 0
            this.days.forEach((item) => {
                avgs += (item.num / item.attempts)
                count++
            }) 
            this.monthAvg =  avgs / count
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
                    snapshot.forEach((day) => {
                        this.days.push({
                            dateNum: day.data().dateNum,
                            num: day.data().num,
                            day: day.data().day,
                            status: day.data().status,
                            attempts: day.data().attempts
                        })
                        this.total += day.data().num
                    })
            })
        },
    },
    created() {
        this.getMonthDays()
        setTimeout(() => {
            this.getMonthAvrage()
        }, 400);
        this.hideLoader()
    }
}
</script>

<style lang="scss">
.past-stats__month {
    .no__past-list {
        max-width: 80%;
        text-align: center;
        margin: 0 auto;
        padding-top: 80px;
    }
    .past-list{
        // height: 100%;
        // overflow-y: scroll;
        // padding: 0 0 40px;
    }
    .current-month {
        margin-bottom: 2rem;
        .row--center {
            align-items: center;
        }
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
    .list-enter-active,
    .list-leave-active {
        transition: all 0.5s ease;
    }
    .list-enter-from,
    .list-leave-to {
        opacity: 0;
        transform: translateY(40px);
    }
}
</style>