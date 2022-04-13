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
        margin-top: 0.5rem;
        gap: 1rem;
        padding: .5rem 0;
        border-bottom: 8px double $grey;

        h3{
            color: $secondary;
            font-size: 1rem;
            padding-bottom: .5rem;
            // border-bottom: 2px dashed $secondary;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 1rem;
            text-align: center;
        }
    }
</style>