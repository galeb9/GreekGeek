<template>
  <HomeSection title="Arenas">
    <div class="home-arenas">
      <BaseButton @click="$router.push('/arena')" text="See your Arenas" />
    </div>
  </HomeSection>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .home-arenas{
      padding-bottom: 2rem;
  }
</style>