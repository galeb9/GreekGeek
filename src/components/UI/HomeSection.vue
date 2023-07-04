<template>
  <div class="home-section basic-container">
    <h3 v-if="title" class="home-section__title">{{ title }}</h3>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss">
.home-section {
  .home-section__title {
    color: var(--color);
    font-size: 1rem;
    padding-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 1rem;
    text-align: center;
  }
}
</style>
