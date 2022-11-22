<template>
<div class="past-stats-month__container" v-if="days.length">
    <div class="past-stats__month">
        <div class="current-month">
            <div class="current-month__row row--center">
                <p class="current-month__item">{{ month }}</p>
            </div>
            <div class="current-month__row">
                <div class="current-month__item month__item--column">
                    <p>Avrage</p> 
                    <p> {{ monthAverage }} /set </p>
                </div>
                <div class="current-month__item month__item--column">
                    <p>Total</p> 
                    <p> {{ total }}</p>
                </div>
            </div>
        </div>
        <transition name="list">
            <div class="past-list">
                <PastStatsItem 
                    v-for="(item, index) in days"
                    :key="index"

                    :dateNum="item.dateNum"
                    :day="item.day"
                    :num="item.num"
                    :status="item.status"
                    :attempts="item.attempts"
                />
                <div v-if="loader && false">
                    <LoaderThingy />
                </div>
            </div>
        </transition>
    </div>
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
            days: [],
            total: 0,
            loader: true,
            monthAvg: 0,
        }
    },
    computed: {
        monthAverage() {
            return Math.floor(this.total / this.days.length)
        }
    },
    methods: {
        hideLoader() {
            setTimeout(() => {
                this.loader = false
            }, 1000);
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
        this.hideLoader()
    }
}
</script>

<style lang="scss">
.past-stats__month {
    width: 80vw;
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