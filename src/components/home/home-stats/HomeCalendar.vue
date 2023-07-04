<template>
  <div class="calendar-list basic-container">
    <div class="calendar-item__container" v-for="(el, i) in days" :key="i">
      <div
        class="calendar-item"
        :class="{ 'calendar-item__active-item': el.active }"
      >
        <h3 class="char">{{ el.char }}</h3>
        <h3 class="num">{{ el.num }}</h3>
      </div>
      <div class="calendar-item__active" v-if="el.active">
        <div class="calendar-item__active-cube"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      char: "M",
      num: 3,
      daysChar: ["S", "M", "T", "W", "T", "F", "S"],
      days: [],
      today: null,
    };
  },
  methods: {
    daysInMonth(month, year) {
      return new Date(year, month, 0).getDate();
    },
    getChar(num) {
      return this.daysChar[num];
    },
    getDays() {
      let todayCharIndex = this.today.getDay(); // day char
      let todaysDate = this.today.getDate(); //day num
      let smaller = todayCharIndex;
      let bigger = 1;
      const lastMonthLength = this.daysInMonth(
        this.today.getMonth(),
        this.today.getFullYear()
      );
      const currentMonthLength = Number(
        this.daysInMonth(this.today.getMonth() + 1, this.today.getFullYear())
      );
      let nextMonthDay = 1;
      let lastMonthDay = lastMonthLength;

      for (let i = 0; i < this.daysChar.length; i++) {
        // nafila koledar z dummy data
        this.days.push({
          char: this.getChar(i),
          num: i,
          active: false,
        });
      }

      for (let i = 0; i < this.days.length; i++) {
        // pohendla day placement
        let day = this.days[i];
        if (i === todayCharIndex) {
          day.num = todaysDate;
          day.active = true;
        } else if (i < todayCharIndex) {
          //smaller
          day.num = todaysDate - smaller;
          smaller--;
        } else if (i > todayCharIndex) {
          day.num = todaysDate + bigger;
          bigger++;
        }
      }

      for (let i = 0; i < this.days.length; i++) {
        // nekak more dobit dneve prejšnega/naslednjega meseca da ne bo 0 ali -n
        let day = this.days[i];
        if (day.num > currentMonthLength) {
          day.num = nextMonthDay;
          nextMonthDay++;
        } else if (day.num <= 0) {
          day.num = lastMonthDay;
          lastMonthDay--;
        }
      }
    },
  },
  created() {
    this.today = new Date();
    this.getDays();
  },
};
</script>

<style lang="scss">
.calendar-list {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  .calendar-item__container {
    flex-basis: 15%;
    flex-grow: 1;
    .calendar-item {
      border: 2px solid var(--complementary);
      text-align: center;
      padding: 1.2rem 0;
      .char {
        margin-bottom: 0.2rem;
        font-weight: 900;
      }
    }
    .calendar-item__active-cube {
      background: var(--complementary);
      margin: 10px auto 0 auto;
      width: 12px;
      height: 12px;
      transform: rotate(45deg);
      background: var(--complementary);
    }
    .calendar-item__active-item {
      background: var(--complementary);
      border: none;
      .char,
      .num {
        color: white;
      }
    }
  }
}
</style>
