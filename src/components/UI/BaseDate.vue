<template>
  <div class="base-date">
    <h2>{{ getToday() }}</h2>
  </div>
</template>

<script>
export default {
    data(){
        return{
        today: new Date()
        }
    },
    methods: {
        getDayStr(num){
            const days = ["Sun", "Mon", "Tue","Sat", "Wed", "Fri", "Sat"];
            return days[num];
        },
        getMonthStr(num){
            const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            return months[num]
        },
        getToday(){
            let day = this.today;
            let dayStr = this.getDayStr(day.getDay());
            let dayNum = this.today.getDate();
            let monthStr = this. getMonthStr(day.getMonth())
            return `${dayStr} ${dayNum} ${monthStr} `;
        },
    }
}
</script>

<style lang="scss">
    .base-date{
      h2{
        letter-spacing: 1px;
        font-weight: 400;
      }
    }
</style>