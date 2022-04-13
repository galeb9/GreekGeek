<template>
  <div class="daily-progress">
      <h3>Daily Progress</h3>
      <ProgressBar />
  </div>

</template>

<script>
import ProgressBar from '@/components/home/home-stats/progress/ProgressBar'

export default {
    components: {
        ProgressBar
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

    .daily-progress{
        margin-top: 2.5rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid $secondary;
        padding: .5rem 0;
        h3{
            margin-right: .4rem;
        }
    }
</style>