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
        gap: 1rem;
        padding: .5rem 0;
        h3{
            font-size: 1rem;
            margin-bottom: 1rem;
            padding-bottom: .5rem;
            border-bottom: 2px dotted $secondary;
            text-align: center;
        }
    }
</style>