<template>
  <div class="base-calendar">
    <div class="calendar">
      <!-- <div class="calendar__opts">
        <select name="calendar__month" id="calendar__month">
          <option>Jan</option>
          <option>Feb</option>
          <option>Mar</option>
          <option>Apr</option>
          <option selected>May</option>
          <option>Jun</option>
          <option>Jul</option>
          <option>Aug</option>
          <option>Sep</option>
          <option>Oct</option>
          <option>Nov</option>
          <option>Dec</option>
        </select>

        <select name="calendar__year" id="calendar__year">
          <option>2017</option>
          <option>2018</option>
          <option>2019</option>
          <option selected>2020</option>
        </select>
      </div> -->

      <div class="calendar__body">
        <div class="calendar__days">
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </div>

        <div class="calendar__dates">
          <!-- last month days -->
          <div
            v-for="day in previous_days"
            :key="day"
            class="calendar__date calendar__date--grey"
          >
            <span>{{ day }}</span>
          </div>
          <!-- 
          <div class="calendar__date calendar__date--grey"><span>27</span></div>
          <div class="calendar__date calendar__date--grey"><span>28</span></div>
          <div class="calendar__date calendar__date--grey"><span>29</span></div>
          <div class="calendar__date calendar__date--grey"><span>30</span></div> -->
          <!-- will have to make calc to count 35 spaces - num_of_days and get previous month num_of_days and loop them here -->
          <!-- end of last month days -->
          <!-- current month days -->
          <div
            v-for="day in num_of_days"
            :key="day"
            class="calendar__date"
            @click="getDayName(2023, 7, day)"
          >
            <span>{{ day }}</span>
          </div>

          <!-- <div class="calendar__date"><span>1</span></div>
          <div class="calendar__date"><span>2</span></div>
          <div class="calendar__date"><span>3</span></div>
          <div class="calendar__date"><span>4</span></div>
          <div class="calendar__date"><span>5</span></div>
          <div class="calendar__date"><span>6</span></div>
          <div class="calendar__date"><span>7</span></div>
          <div class="calendar__date"><span>8</span></div>
          <div class="calendar__date"><span>9</span></div>
          <div class="calendar__date"><span>10</span></div>
          <div class="calendar__date"><span>11</span></div>
          <div class="calendar__date"><span>12</span></div>
          <div class="calendar__date"><span>13</span></div>
          <div class="calendar__date"><span>14</span></div>
          <div class="calendar__date"><span>15</span></div> -->
          <!-- <div
            class="calendar__date calendar__date--selected calendar__date--first-date calendar__date--range-start"
          >
            <span>16</span>
          </div>
          <div
            class="calendar__date calendar__date--selected calendar__date--last-date"
          >
            <span>17</span>
          </div>
          <div
            class="calendar__date calendar__date--selected calendar__date--first-date"
          >
            <span>18</span>
          </div>
          <div class="calendar__date calendar__date--selected">
            <span>19</span>
          </div>
          <div class="calendar__date calendar__date--selected">
            <span>20</span>
          </div>
          <div
            class="calendar__date calendar__date--selected calendar__date--last-date calendar__date--range-end"
          >
            <span>21</span>
          </div> -->
          <!-- <div class="calendar__date"><span>22</span></div>
          <div class="calendar__date"><span>23</span></div>
          <div class="calendar__date"><span>24</span></div>
          <div class="calendar__date"><span>25</span></div>
          <div class="calendar__date"><span>26</span></div>
          <div class="calendar__date"><span>27</span></div>
          <div class="calendar__date"><span>28</span></div>
          <div class="calendar__date"><span>29</span></div>
          <div class="calendar__date"><span>30</span></div>
          <div class="calendar__date"><span>31</span></div> -->
        </div>
      </div>

      <!-- <div class="calendar__buttons">
        <button class="calendar__button calendar__button--grey">Back</button>

        <button class="calendar__button calendar__button--primary">
          Apply
        </button>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseCalendar",
  props: {
    monthNum: { type: Number, default: 0 },
    monthData: { type: Array, default: () => [] },
    currentYear: { type: Number, default: 0 },
  },
  data() {
    return {
      num_of_days: 0,
      previous_days: 0,
    };
  },
  watch: {
    monthData() {
      console.log(this.monthData);
    },
  },
  methods: {
    getDaysInMonth(year, month) {
      // Month value in JavaScript is zero-based (0 for January, 1 for February, etc.)
      // So we decrement the month value by 1
      //   let date = new Date(year, month - 1, 1);
      let lastDay = new Date(year, month - 1, 0).getDate();
      return lastDay;
    },
    getDayName(year, month, day) {
      var date = new Date(year, month - 1, day);
      var options = { weekday: "long" };
      return date.toLocaleDateString(undefined, options);
    },
    getWeekIndexOfMonth(dayName) {
      const week = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];

      return week.findIndex((el) => el === dayName);
    },
    makeNumberArray(max, start = 0) {
      const arr = [];
      while (start <= max) {
        arr.push(start);
        start++;
      }
      return arr;
    },
    setCalendarValues() {
      // current days
      this.num_of_days = this.getDaysInMonth(this.currentYear, this.monthNum);

      // previous day
      let num_of_previous_days = this.getDaysInMonth(
        this.currentYear,
        this.monthNum - 1
      );

      let free_fields_count_start =
        num_of_previous_days - (35 - this.num_of_days);

      this.previous_days = this.makeNumberArray(
        num_of_previous_days,
        free_fields_count_start
      );
      //   let month = this.makeNumberArray(this.num_of_days + 1, 1);
      //   month = month.fitler((el, index) => {

      //   });

      //   for(let i = 0; i < month; i++) {
      //     let item = month[i]
      //     // for(let j
      //   }

      //   console.log(month);
    },
  },
  mounted() {
    this.setCalendarValues();
  },
};
</script>

<style lang="scss">
.base-calendar {
  display: grid;
  place-items: center;
  margin-bottom: 60px;
  .calendar {
    --side-padding: 20px; // padding to be applied to the side of the calendar
    --border-radius: var(--radius); // border-radius of the main calendar shell
    --accent-br: 15px; // border-radius for accents under dates on hover
    width: 100%;
    select {
      background-color: #f3f4f6;
      padding: 15px 20px;
    }

    // &__opts,
    // &__buttons {
    //   background-color: #fff;
    //   display: grid;
    //   grid-template-columns: 1fr 1fr;
    //   column-gap: 15px;
    // }

    // &__opts {
    //   border-top-left-radius: var(--border-radius);
    //   border-top-right-radius: var(--border-radius);
    //   padding: 20px var(--side-padding);
    // }

    &__days {
      //   background-color: #fff;
      box-shadow: var(--boxShadow);
      background: var(--complementary);
      padding: 10px var(--side-padding) 10px;
      border-radius: var(--radius);
      display: grid;
      grid-template-columns: repeat(7, 1fr);

      & > div {
        text-align: center;
        font: {
          weight: 700;
          size: 1.02rem;
        }
        color: #c5c8ca;
      }
    }

    &__dates {
      padding: 10px var(--side-padding);
      display: grid;
      grid-template-columns: repeat(7, 1fr);
    }

    &__date {
      --height: calc(400px / 6 - var(--side-padding));

      text-align: center;
      height: var(--height);
      line-height: var(--height);
      font: {
        weight: 600;
        size: 1.02rem;
      }
      cursor: pointer;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        background-color: rgba(255, 255, 255, 0);
        width: 100%;
        height: calc(var(--height) * 0.9);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: var(--accent-br);
        transition: background-color 0.3s ease;
      }

      &:not(.calendar__date--selected):not(.calendar__date--grey):hover::before {
        background-color: #ededed;
      }

      &--grey {
        color: #c5c8ca;
        cursor: not-allowed;
      }

      &--selected {
        color: #ff374b;

        &::before {
          background-color: #ffeaec;
          border-radius: 0px;
        }
      }

      &--first-date {
        &::before {
          border-top-left-radius: var(--accent-br);
          border-bottom-left-radius: var(--accent-br);
        }
      }

      &--last-date {
        &::before {
          border-top-right-radius: var(--accent-br);
          border-bottom-right-radius: var(--accent-br);
        }
      }

      &--range-start {
        &::after {
          content: "";
          position: absolute;
          bottom: 3px;
          border-radius: 24px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #ff374b;
          width: 10px;
          height: 4px;
        }
      }

      &--range-end {
        color: #fff;

        &::before {
          box-shadow: 0 15px 20px -3px rgba(255, 55, 75, 0.35);
          background-color: #ff374b;
          border-radius: var(--accent-br);
          z-index: 1;
        }

        &::after {
          content: "";
          position: absolute;
          height: calc(var(--height) * 0.9);
          background-color: #ffeaec;
          width: 50px;
          top: 50%;
          right: 50%;
          transform: translateY(-50%);
        }
      }

      span {
        position: relative;
        z-index: 1;
      }
    }

    &__buttons {
      padding: 10px var(--side-padding) 20px;
      border-bottom-left-radius: var(--border-radius);
      border-bottom-right-radius: var(--border-radius);
    }

    &__button {
      cursor: pointer;

      &--grey {
        background-color: #f3f4f6;
      }

      &--primary {
        background-color: #1752ff;
        color: #fff;
        transition: box-shadow 0.3s cubic-bezier(0.21, 0.68, 0.09, 0.27),
          transform 0.2s linear;

        &:hover {
          box-shadow: 0 20px 30px -13px rgba(23, 82, 255, 0.45);
          transform: translateY(-3px);
        }

        &:active {
          box-shadow: 0 10px 10px -6px rgba(23, 82, 255, 0.45);
          transform: translateY(-1px);
        }
      }
    }
  }

  select,
  button {
    font: {
      family: inherit;
      weight: 700;
      size: 1.02rem;
    }
    border-radius: 20px;
    outline: none;
    border: 0;
    padding: 15px 20px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  select {
    background: {
      image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='960px' height='560px' viewBox='0 0 960 560' enable-background='new 0 0 960 560' xml:space='preserve'%3E%3Cg id='Rounded_Rectangle_33_copy_4_1_'%3E%3Cpath d='M480,344.181L268.869,131.889c-15.756-15.859-41.3-15.859-57.054,0c-15.754,15.857-15.754,41.57,0,57.431l237.632,238.937 c8.395,8.451,19.562,12.254,30.553,11.698c10.993,0.556,22.159-3.247,30.555-11.698l237.631-238.937 c15.756-15.86,15.756-41.571,0-57.431s-41.299-15.859-57.051,0L480,344.181z'/%3E%3C/g%3E%3C/svg%3E");
      size: 24px;
      repeat: no-repeat;
      position: calc(100% - var(--side-padding)) center;
    }
  }
}
</style>
