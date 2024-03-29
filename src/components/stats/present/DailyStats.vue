<template>
  <BaseContainer>
    <div class="stats__daily">
      <p class="stats__date">
        {{
          `${today.getDate()} / ${
            today.getMonth() + 1
          }  / ${today.getFullYear()}`
        }}
      </p>
      <BaseProgress :progress="progress" :circleSize="200">
        <RoundStats :pushups="pushupsToday" :goal="goal" :surplus="surplus" />
      </BaseProgress>

      <DailyStatsItems
        :attempts="attempts"
        :calories="calories"
        :userPushups="pushupsToday"
      />
    </div>
  </BaseContainer>
</template>

<script>
import RoundStats from "../RoundStats.vue";
import DailyStatsItems from "./DailyStatsItems.vue";

import { db, auth } from "@/scripts/firebaseInit.js";

import { formatLocalDate } from "@/mixins/utils/formatLocalDate";
import { getUserDataState } from "@/mixins/pinia/main/getUserData";

export default {
  name: "DailyStats",
  mixins: [/* getUserDataAction, */ getUserDataState, formatLocalDate],
  components: {
    RoundStats,
    DailyStatsItems,
  },
  data() {
    return {
      daysChar: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      today: new Date(),
      month: null,
      userId: auth.currentUser.uid,
      surplus: 0,
      rate: 0,
      calories: 0,
      popupVisible: false,
      count: 0,
      progress: 0,
      initialProgressAnimation: false,
    };
  },
  watch: {
    pushupsToday() {
      // this watcher happens when the pushups are changed
      this.circleProgressAnimation();
    },
  },
  methods: {
    circleProgressAnimation() {
      let progressPercentage = Math.floor(
        (this.pushupsToday / this.goal) * 100
      );
      // gives counting animation
      this.countPushups(this.pushupsToday);
      this.countProgress(progressPercentage);
    },
    countProgress(end) {
      let counter = setInterval(
        () => (this.progress < end ? this.progress++ : clearInterval(counter)),
        Math.floor(1000 / end)
      );
    },
    countPushups(end) {
      let counter = setInterval(
        () => (this.count < end ? this.count++ : clearInterval(counter)),
        Math.floor(1000 / end)
      );
    },
    togglePopup() {
      this.popupVisible = !this.popupVisible;
    },
    getChar(num) {
      if (num === -1) num = this.daysChar.length - 1;
      return this.daysChar[num];
    },
    isTodayWin() {
      return this.pushupsToday >= this.goal ? "pos" : "neg";
    },
    getTodaysDate() {
      return `${this.today.getDate()}-${
        this.today.getMonth() + 1
      }-${this.today.getFullYear()}`;
    },
    getYesterdayDate() {
      return `${this.today.getDate() - 1}-${
        this.today.getMonth() + 1
      }-${this.today.getFullYear()}`;
    },
    getMonthByWord(month) {
      const months = [
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
      ];
      return months[month];
    },
    // saveUserDay(){ // not used, maybe later
    //   const day = {
    //     dateNum: this.today.getDate(),
    //     day: this.getChar(this.today.getDay()),
    //     num: this.pushupsToday,
    //     status: this.isTodayWin()
    //   }

    //   db.collection("users").doc(this.userId).update({ // had to use firebase import to user .firestore.FieldValue.arrayUnion('some value')
    //     days : firebase.firestore.FieldValue.arrayUnion(day)
    //   })
    // },
    saveYesterday(day, month) {
      db.collection("users")
        .doc(this.userId)
        .collection("past")
        .doc(month)
        .collection("days")
        .doc(day)
        .set({
          dateNum: this.today.getDate() - 1,
          day: this.getChar(this.today.getDay() - 1),
          num: this.pushupsToday,
          status: this.isTodayWin(),
          attempts: this.attempts,
        })
        .then(() => this.resetDay());
    },
    resetDay() {
      this.resetTodaysPushups();

      this.pushupsToday = 0;
      this.attempts = 0;
      this.calories = 0;
      this.popupVisible = false;
      this.count = 0;
      this.progress = 0;
    },
    resetTodaysPushups() {
      db.collection("users")
        .doc(this.userId)
        .get()
        .then((user) => {
          user.ref.update({
            pushupsToday: 0,
            attempts: 0,
          });
        });
    },
    finishDay() {
      let today = this.formatLocalDate(new Date());
      let localStorageToday = localStorage.getItem("today");

      if (localStorageToday == null) {
        localStorage.setItem("today", today);
        localStorageToday = localStorage.getItem("today");
      }

      if (today !== localStorageToday && this.pushupsToday > 0) {
        this.saveYesterday(this.getYesterdayDate(), this.month);
        localStorage.setItem("today", today);
      } else console.log("Still the same day.");
    },
  },
  created() {
    this.month = this.getMonthByWord(this.today.getMonth());
    this.finishDay();
    // console.log(this.goal, this.attempts, this.pushupsToday);
    this.circleProgressAnimation();
  },
};
</script>

<style lang="scss">
.stats__daily {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 5rem;
  gap: 20px;

  .stats__date {
    color: black;
    font-weight: 900;
    letter-spacing: 5px;
    margin-bottom: 20px;
  }
  .stats-item {
    position: relative;
    &__button {
      padding: 1.5rem 3rem;
      background: none;
      border: 5px double var(--complementary);
      color: black;
      outline: none;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 900;
      margin-top: 1rem;
      transition: all 0.3s ease-in-out;
      &:hover {
        background: $black;
        color: white;
      }
    }
  }
  .popup-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem 1rem;
    position: absolute;
    z-index: 100;
    bottom: 30vh;
    height: 50vh;
    left: 10%;
    right: 10%;
    border: 10px double var(--complementary);
    backdrop-filter: blur(8px);
    text-align: center;
    .popup {
      h2 {
        margin-bottom: 1rem;
        font-weight: 900;
      }
      p {
        margin: 1rem 0;
        font-weight: 900;
      }
    }
  }
  .popup-bg {
    position: absolute;
    top: -150px;
    width: 100vw;
    height: 120vh;
    z-index: 2;
    opacity: 0.3;
    background: repeating-linear-gradient(
      45deg,
      var(--complementary),
      black 2px,
      $bg 2px,
      $bg 10px
    );
  }
}
@media only screen and (max-width: 340px) {
  .stats-row {
    .stats__info h4 {
      display: none;
    }
    .stats__calories {
      flex-grow: 1;
    }
  }
}
</style>
