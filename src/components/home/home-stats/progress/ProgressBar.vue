<template>
  <div class="progress">
    <div class="bar-container">
      <div class="progress-bar">
        <div class="progress-state" :style="{ width: rate + '%' }"></div>
      </div>
      <p>{{ rate }} %</p>
    </div>
  </div>
</template>

<script>
import {
  getUserDataAction,
  getUserDataState,
} from "@/mixins/pinia/main/getUserData";

export default {
  name: "ProgressBar",
  mixins: [getUserDataAction, getUserDataState],
  data() {
    return {
      rate: 0,
      userPushups: 0,
      userGoal: 100,
    };
  },
  methods: {
    calculateSuccessRate() {
      this.rate = Math.floor((this.userPushups / this.userGoal) * 100);
      this.rate = this.rate > 100 ? 100 : this.rate;
    },
  },
  created() {
    this.userPushups = this.pushupsToday;
    this.userGoal = this.goal;

    this.calculateSuccessRate();
  },
};
</script>

<style lang="scss">
.progress {
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
  .bar-container {
    display: flex;
    align-items: center;
    flex-direction: column-reverse;
    flex: 1;
    gap: 1rem;

    .progress-bar {
      display: flex;
      max-width: 70%;
      width: 160px;
      height: 10px;
      background: rgba($grey, 0.3);
      border-radius: 30px;
      margin-right: 0.5rem;
      .progress-state {
        width: 0;
        border-radius: 30px;
        height: 100%;
        background: black;
      }
    }
  }

  .progress__btn {
    padding: 0.5rem 1.5rem;
    border: 4px double var(--complementary);
    font-weight: 900;
    letter-spacing: 1px;
    font-size: 18px;
    text-transform: uppercase;
    color: rgba(black, 0.9);
  }
}
@media only screen and (max-width: 540px) {
  .progress {
    .bar-container {
      .progress-bar {
        margin-right: 0;
        max-width: 400px;
      }
      p {
        transform: translateX(0.5rem);
      }
    }
  }
}
</style>
