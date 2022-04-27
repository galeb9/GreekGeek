<template>
  <div class="home-section">
      <h3>{{ title }}</h3>
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
@import '@/assets/scss/_variables.scss';

    .home-section{
        margin-top: 0.5rem;
        gap: 1rem;
        padding: .5rem 0;
        border-bottom: 8px double $grey;
        h3{
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