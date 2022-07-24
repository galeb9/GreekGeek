<template>
    <div class="past-stats">
        <div class="past-stats__months" dir="ltr">
            <PastStatsMonth 
                v-for="(month, index) in monthsReversed"
                :key="index"
                :month="month"
            />
        </div>
        <p class="no__past-list"> <br> Do some pushups and <b>FINISH YOUR DAY</b> to see your days here.</p>
     </div>
</template>

<script>
import PastStatsMonth from '@/components/stats/PastStatsMonth'

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
            today: new Date(),
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsReversed: ["December", "November", "October",  "September", "August", "July", "June", "May", "April", "March", "February", "January"]
        }
    },
    methods: {
        getMonthByWord(month) {
            return this.months[month]
        },
    },
    created(){
        this.month = this.getMonthByWord(this.today.getMonth())
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

.past-stats{
    padding: 0 1rem;
    min-height: 90vh;   
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