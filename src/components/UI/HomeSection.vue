<template>
  <div class="home-section">
      <h3 v-if="title" class="home-section__title">{{ title }}</h3>
      <slot></slot>
  </div>

</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ""
        }
    }
}
</script>



<style lang="scss">


    .home-section{
        margin-top: 0.5rem;
        gap: 1rem;
        padding: .5rem 0;
        border-bottom: 8px double $grey;
        .home-section__title{
            color: $secondary;
            font-size: 1rem;
            padding-bottom: .5rem;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 1rem;
            text-align: center;
        }
    }
</style>