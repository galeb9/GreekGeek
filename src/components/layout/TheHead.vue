<template>
    <div class="home__head">
      <h2>{{ getToday() }}</h2>
      <div>
        <BaseIconLink 
          :icon="['fa', 'gear']" 
          url="settings"
          size="lg"
        />
      </div>
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
@import '@/assets/scss/_variables.scss';

    .home__head{
      display: flex;
      justify-content: space-between;
      align-items: center;
      h2{
        letter-spacing: 1px;
        font-weight: 400;
      }
      .fa-icon{
        transform: scale(2);
        padding-right: 0.4rem;
        color: $fontColor;
        opacity: .7;
        transition: all .3s ease-in ;
        &:hover{
          opacity: 1;
        }
      }
    }

</style>