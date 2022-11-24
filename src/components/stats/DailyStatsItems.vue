<template>
  <div class="stats-row">
    <div class="stats__calories">
      <img src="@/assets/icons/fire.svg" alt="" />
      <div class="stats__info">
        <p>{{ calories }}</p>
        <h4>kcal Burnt</h4>
      </div>
    </div>
    <div class="stats-row-col">
      <div class="stats__pushups">
        <img src="@/assets/icons/Strong.svg" alt="" />
        <div class="stats__info">
          <h4>Pushups</h4>
          <p>{{ userPushups }}</p>
        </div>
      </div>
      <div class="stats-attempts">
        <img src="@/assets/icons/attempts-icon.svg" alt="" />
        <div class="stats__info">
          <h4>Attempts</h4>
          <p>{{ attempts }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    attempts: { type: Number, default: 0 },
    calories: { type: Number, default: 0 },
    userPushups: { type: Number, default: 0 }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/_variables.scss";

.stats-row {
  width: 100%;
  max-width: 350px;
  display: flex;
  justify-content: space-around;
  gap: 20px;
  .stats__calories,
  .stats__pushups,
  .stats-attempts {
    color: black;
    font-weight: 900;
    pointer-events: none;
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 1rem 0;
    padding: 1rem;
    border: 2px solid $secondary;
    img {
      width: 2rem;
    }
  }
  .stats__calories {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    p {
      margin-bottom: 0.3rem;
    }
  }
}
</style>
