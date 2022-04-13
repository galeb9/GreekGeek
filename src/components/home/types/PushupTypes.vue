<template>
  <div class="pushup-types">
    <div class="types__head">
      <h3>Pushup Types</h3>
    </div>
    <div class="types__list">
      <TypeItem
        v-for="item in types"
        :key="item.name"
        :img="item.src"
        :name="item.name"
       />
    </div>
  </div>
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
  .pushup-types{
    margin-top: 1rem;
    height: 35vh;
    padding-bottom: 100px;
    .types__head{
      h3{
        font-size: 1rem;
        margin-bottom: 1rem;
        padding-bottom: .5rem;
        border-bottom: 2px dotted $secondary;
        text-align: center;
      }
    }
    .types__list{
      margin-top: 1.2rem;
      height: 100%;
      overflow-y: scroll;
    }
  }
</style>