<template>
  <div class="past-stats">
    <div class="filters">
      <div
        class="filter__item-container"
        v-for="(item, index) in months"
        :key="index"
        @click="selectMonth(item)"
        tabindex="0"
      >
        <div :class="['filter__item', { 'filter--active': month === item }]">
          {{ showMonth(item) }}
        </div>
      </div>
    </div>
    <PastStatsMonth v-if="monthData" :month="month" :monthData="monthData" />
    <p v-else class="no__past-list">
      <br />
      Do some pushups and <b>FINISH YOUR DAY</b> to see your days here.
    </p>
  </div>
</template>

<script>
import PastStatsMonth from "./PastStatsMonth.vue";
// import { db, auth } from "@/scripts/firebaseInit.js";

import {
  pastStatsAction,
  pastStatsState,
} from "@/mixins/pinia/past-stats/pastStats";

export default {
  name: "PastStats",
  mixins: [pastStatsAction, pastStatsState],
  components: {
    PastStatsMonth,
  },
  data() {
    return {
      pastData: [],
      message: '"Quality is not an act, It is a habit."',
      totalPushups: 0,
      month: null,
      monthData: [],
      today: new Date(),
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  },
  computed: {
    reverseMonths() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.months.reverse();
    },
  },
  methods: {
    getMonthByWord(month) {
      return this.months[month];
    },
    showMonth(item) {
      return this.month === item ? item : item.slice(0, 3);
    },
    selectMonth(month) {
      this.month = month;
      this.getMonthData();
    },
    async getMonthData() {
      await this.getPastMonthData(this.month);
      this.monthData = (await this.monthsDataObj[this.month]) || [];
    },
    monthPickScroll() {
      let item = document.querySelector(
        ".filter__item-container .filter--active"
      );
      item.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "start",
      });
    },
  },
  async created() {
    this.selectMonth(this.getMonthByWord(this.today.getMonth()));
  },
  mounted() {
    this.monthPickScroll();
  },
};
</script>

<style lang="scss">
.past-stats {
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
      border: 2px solid var(--complementary);
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
      transition: all 0.2s ease-in;
      background: var(--complementary);
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
