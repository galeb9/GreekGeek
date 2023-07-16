<template>
  <div class="past-stats-month__container" v-if="monthData">
    <div class="past-stats__month">
      <div class="current-month">
        <div class="current-month__row">
          <!-- make this an select where you can pick year -->
          <div class="current-month__item">
            <select name="calendar__year" id="calendar__year">
              <option>2021</option>
              <option>2022</option>
              <option selected>2023</option>
            </select>
          </div>
        </div>

        <BaseCalendar></BaseCalendar>

        <div class="current-month__row">
          <div class="current-month__item month__item--column">
            <p>Average</p>
            <p>{{ monthAverage }} /set</p>
          </div>
          <div class="current-month__item month__item--column">
            <p>Total</p>
            <p>{{ daysSum }}</p>
          </div>
        </div>
      </div>
      <transition name="list">
        <div class="past-list">
          <PastStatsItem
            v-for="(item, index) in monthData"
            :key="index"
            :item="item"
          />
          <LoaderThingy v-if="loader" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import LoaderThingy from "@/components/UI/LoaderThingy.vue";
import PastStatsItem from "./PastStatsItem";
import BaseCalendar from "@/components/UI/BaseCalendar.vue";

export default {
  name: "PastStatsMonth",
  components: {
    PastStatsItem,
    LoaderThingy,
    BaseCalendar,
  },
  props: {
    month: { type: String, default: "" },
    monthData: { type: Array, default: () => [] },
  },
  data() {
    return {
      loader: true,
      daysSum: 0,
    };
  },
  computed: {
    monthAverage() {
      return Math.floor(this.daysSum / this.monthData.length);
    },
  },
  watch: {
    monthData() {
      this.calculateDaysSum(this.monthData);
    },
  },
  methods: {
    calculateDaysSum(data) {
      if (!data) return;
      this.daysSum = data
        .map((el) => el.num)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    },
  },
  countAnimation(val, end) {
    let counter = setInterval(
      () => (val < end ? val++ : clearInterval(counter)),
      Math.floor(1000 / end)
    );
  },
  mounted() {
    if (this.monthData) this.loader = false;
    // console.log("data", this.monthData);
  },
};
</script>

<style lang="scss">
.past-stats__month {
  width: 80vw;
  .current-month {
    margin-bottom: 2rem;
    .row--center {
      align-items: center;
    }
    .current-month__row {
      display: flex;
      justify-content: space-around;
      gap: 10px;
      margin-bottom: 1rem;
      .current-month__item {
        box-shadow: var(--boxShadow);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
        font-weight: 700;
        background: var(--complementary);
        color: white;
        padding: 0.8rem 2rem;
        width: max-content;
        border-radius: var(--radius);
        select {
          width: 100%;
          display: flex;
          justify-content: space-between;
          background: var(--complementary);
          color: white;
          outline: none;
          border: none;
        }
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
