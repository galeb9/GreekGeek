<template>
  <div class="my-arenas">
    <h1 ref="h" @click="handleClick">{{ message }}</h1>
    <h2>Writes: {{ writes }}</h2>
    <input type="text" v-model="message">
    <button @click="writes++">Finish input</button>
    <h2>Person {{ person.name}}</h2>
    <p>Age: {{ person.age }}</p>
    <button @click="updateAge">Increase age</button>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
export default {
  name: 'MyArenas',
  setup(){ // runs before created, mounted
    //const h= ref(null)

    const message = ref("This are your arenas") // reactive
    const writes = ref(0)

    const handleClick = () => { //need to use .value
      message.value =  "some other message" // for ref value
    }


    const person = reactive({ name: "Matej", age: 25 })
    const updateAge = () => { // do not need .value
      person.age++
    }



    return { message, handleClick, writes, person, updateAge }

  }
}
</script>

<style>

</style>