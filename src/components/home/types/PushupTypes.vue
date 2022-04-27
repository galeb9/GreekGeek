<template>
  <HomeSection title="Pushup Types">
    <div class="types__list">
      <TypeItem
        v-for="item in types"
        :key="item.name"
        :img="item.src"
        :name="item.name"
      />
    </div>
  </HomeSection>
</template>

<script>
import TypeItem from '@/components/home/types/TypeItem'

export default {
  components: {
    TypeItem
  },
  data(){
    return{
      types: [
        { src: 'clapping.png', name: "Clapping"},
        { src: 'wide.png', name: "Wide"},
        { src: 'legUp.png', name: "Raised Leg"},
        { src: 'power.png', name: "Power"},
        { src: 'close-grip.png', name: "Close Grip"},
        { src: 'decline.png', name: "Decline"}
      ]
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';
  .types__list{
    margin-top: 1.2rem;
    padding-bottom: 50px;
  }
</style>