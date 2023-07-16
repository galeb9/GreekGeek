<template>
  <div class="past-item" v-if="currentYear === showForCurrentYear">
    <div class="stat-items">
      <div class="date-section stats-section">
        <p>{{ item.dateNum }}</p>
        <p>{{ item.day }}</p>
      </div>
      <div class="pushups-section stats-section">
        <p>{{ item.num }}</p>
        <div class="svg">
          <svg
            width="24"
            height="22"
            viewBox="0 0 24 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 11C10.5886 11 9.2351 10.4205 8.23713 9.38909C7.23915 8.35764 6.67849 6.95869 6.67849 5.5C6.67849 4.04131 7.23915 2.64236 8.23713 1.61091C9.2351 0.579463 10.5886 0 12 0C13.4114 0 14.7649 0.579463 15.7629 1.61091C16.7609 2.64236 17.3215 4.04131 17.3215 5.5C17.3215 6.95869 16.7609 8.35764 15.7629 9.38909C14.7649 10.4205 13.4114 11 12 11ZM18.3858 16.5V20.9357C18.3858 21.5235 17.9093 22 17.3215 22V22C16.7337 22 16.2572 21.5235 16.2572 20.9357V16.5C16.2572 12.0137 18.6198 8.09731 22.1292 6.00823C22.6572 5.69391 23.3228 5.94594 23.5704 6.50834V6.50834C23.8093 7.05127 23.5676 7.68041 23.0624 7.99147C21.7946 8.77226 20.7141 9.84802 19.9102 11.139C18.9147 12.7377 18.3855 14.5988 18.3858 16.5ZM7.74279 16.5V20.9357C7.74279 21.5235 7.26629 22 6.67849 22V22C6.0907 22 5.61419 21.5235 5.61419 20.9357V16.5C5.61435 14.599 5.08505 12.7381 4.08951 11.1396C3.28573 9.84898 2.20545 8.77347 0.937915 7.9928C0.432594 7.68157 0.19063 7.05219 0.429617 6.50896V6.50896C0.677197 5.9462 1.34302 5.69382 1.87151 6.00798C3.48814 6.96901 4.86424 8.31835 5.87944 9.94846C7.09617 11.9022 7.74304 14.1766 7.74279 16.5Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
      <div class="pushups-section stats-section">
        <p>{{ Math.floor(getAvrage) }}</p>
        <p>avg.</p>
      </div>
    </div>
    <div :class="['status', item.status]"></div>
  </div>
</template>

<script>
export default {
  props: {
    item: { type: Object, default: () => {} },
    currentYear: { type: Number, default: new Date().getFullYear() },
  },
  data() {
    return {
      avrage: null,
    };
  },
  computed: {
    getAvrage() {
      return this.item.num / this.item.attempts || 0;
    },
    showForCurrentYear() {
      const dateArr = this.item.date.split("-");
      return parseInt(dateArr[dateArr.length - 1]);
    },
  },
};
</script>

<style lang="scss">
.past-item {
  margin-bottom: 1.5rem;
  padding-bottom: 0.3rem;
  display: flex;
  justify-content: space-between;
  .stat-items {
    display: flex;
    align-items: center;
    .stats-section {
      height: 100%;
      padding: 1rem;
      text-align: center;
      width: 80px;
      p:first-child {
        margin-bottom: 0.5rem;
      }
    }
    .date-section {
      background: var(--complementary);
      border-radius: 8px;
      color: white;
    }
    .pushups-section {
      color: var(--color);
    }
    p {
      font-size: 18px;
      font-weight: 700;
    }
  }
  .status {
    width: 10px;
    height: 90px;
    border-radius: 8px;

    align-self: center;
  }
  .neg {
    background: rgb(177, 89, 89);
  }
  .pos {
    background: rgb(144, 202, 144);
  }
}
</style>
