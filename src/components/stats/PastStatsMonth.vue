<template>
<div class="past-stats-month__container" v-if="monthData">
    <div class="past-stats__month">
        <div class="current-month">
            <div class="current-month__row">
                <div class="current-month__item month__item--column">
                    <p>Avrage</p> 
                    <p> {{ monthAverage }} /set </p>
                </div>
                <div class="current-month__item month__item--column">
                    <p>Total</p> 
                    <p> {{ daysSum }}</p>
                </div>
            </div>
        </div>
        <transition name="list">
            <div class="past-list">
                <PastStatsItem 
                    v-for="(item, index) in monthData"
                    :key="index"
                    :dateNum="item.dateNum"
                    :day="item.day"
                    :num="item.num"
                    :status="item.status"
                    :attempts="item.attempts"
                />
                <!-- <LoaderThingy v-if="loader"/> -->
            </div>
        </transition>
    </div>
</div>
 
</template>

<script>
// import LoaderThingy from '@/components/UI/LoaderThingy.vue'
import PastStatsItem from '@/components/stats/PastStatsItem'

export default {
    components: {
        PastStatsItem,
        // LoaderThingy
    },
    props: {
        month: { type: String, default: '' },
        daysSum: { type: Number, default: 0 },
        monthData: { type: Array, default: () => [] }
    },
    data() {
        return {
            loader: true,
        }
    },
    computed: {
        monthAverage() {
            console.log(this.monthData)
            return Math.floor(this.daysSum / this.monthData.length)
        }
    },
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
    .past-list {
        padding-bottom: 100px;
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