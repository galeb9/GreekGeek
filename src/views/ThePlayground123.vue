<template>
  <div class="playground">
    <div class="playground-card">
      <h2>{{ title }} {{ name }}</h2>
      <p>
        <b>{{ username }}</b> -> {{ pushupsToday }} / {{ goal }}
      </p>
    </div>
    <hr />
    <button @click="getUserData()">Get main data</button>
  </div>
</template>

<script>
// import { useMainStore } from "@/scripts/stores/parent-pinia";
// import { /*mapStores,*/ mapState, mapActions } from "pinia";
import {
  getUserDataAction,
  getUserDataState,
} from "@/mixins/pinia/main/getUserData";

export default {
  mixins: [getUserDataAction, getUserDataState],
  data() {
    return {
      title: "Welcome to your playground, ",
    };
  },
  created() {
    this.getUserData();
  },
};
</script>

<style></style>
