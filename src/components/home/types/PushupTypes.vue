<template>
  <div class="pushup-types">
    <div class="types__head">
      <h4>Pushup Types</h4>
      <router-link class="types__link" to="/">View All ></router-link>
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
  .pushup-types{
    margin-top: 2rem;
    height: 60vh;
    .types__head{
      display: flex;
      justify-content: space-between;
    }
    .types__list{
      margin-top: 1.2rem;
      height: 100%;
      overflow-y: scroll;
    }
  }
</style>