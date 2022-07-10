<template>
  <div class="calendar-list">
    <div class="calendar-item"
      v-for="(el, i) in days"
      :key="i"
      :class="{active : el.active}"
    >
      <h3 class="char">{{ el.char }}</h3>
      <h3 class="num">{{ el.num }}</h3>
    </div>
  </div>

</template>

<script>
export default {
  data(){
    return{
      char: "M",
      num: 3,
      daysChar: ["S", "M", "T","W", "T", "F", "S"],
      days: [],
      today: null
    }
  },
  methods: {
    daysInMonth (month, year) {
      return new Date(year, month, 0).getDate();
    },
    getChar(num){
      return this.daysChar[num]
    },
    getDays(){
        let todayCharIndex = this.today.getDay(); // day char
        let todaysDate = this.today.getDate(); //day num
        let smaller = todayCharIndex;
        let bigger = 1;
        const lastMonthLength = this.daysInMonth(this.today.getMonth() , this.today.getFullYear());
        const currentMonthLength = Number(this.daysInMonth(this.today.getMonth() + 1 , this.today.getFullYear()));
        let nextMonthDay = 1;
        let lastMonthDay = lastMonthLength;

        for(let i = 0; i < this.daysChar.length; i++){ // nafila koledar z dummy data
            this.days.push({
              char: this.getChar(i),
              num: i,
              active: false
            })
        }


        for(let i = 0; i < this.days.length; i++){ // pohendla day placement
            let day = this.days[i];
            if(i === todayCharIndex){
                day.num = todaysDate 
                day.active = true;
            }
            else if(i < todayCharIndex){ //smaller
                day.num = todaysDate  - smaller;
                smaller--;
            }else if(i > todayCharIndex){
                day.num = todaysDate  + bigger;
                bigger++;
            }
        }

        for(let i = 0; i < this.days.length; i++){ // nekak more dobit dneve prejšnega/naslednjega meseca da ne bo 0 ali -n
            let day = this.days[i];
            if(day.num > currentMonthLength){
                day.num = nextMonthDay;
                nextMonthDay++;
            }else if(day.num <= 0){
                day.num = lastMonthDay;
                lastMonthDay--;
            }
        }
    }
  },
  created(){
    this.today = new Date();
    this.getDays()
  }

}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';
.calendar-list{
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;  
  gap: 8px;
  border-bottom: 8px double $grey;
  padding-bottom: 3rem;
  .calendar-item{
    flex-basis: 15%;
    flex-grow: 1;
    border: 2px solid $secondary;
    text-align: center;
    padding: 1.2rem 0;
    color: $secondary;
    .char{
      margin-bottom: .2rem;
      font-weight: 900;
    }
  
  }
  .active{
    background: black;
    position: relative;
    .char,.num{
      color: white;
    }
    &::after{
      content: '';
      width: 12px;
      height: 12px;
      transform: rotate(45deg);
      background: black;
      position: absolute;
      bottom: -20px;
      left: 38.5%
    }
  }
}

</style>