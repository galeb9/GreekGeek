<template>
  <HomeSection title="Daily Progress" @click="goToDailyStats()" >
      <ProgressBar />
  </HomeSection>

</template>

<script>
import ProgressBar from '@/components/home/home-stats/progress/ProgressBar'

export default {
    components: {
        ProgressBar,
    },
    methods: {
        goToDailyStats(){
            this.$router.push("/stats")
        }
    }
}
</script>
