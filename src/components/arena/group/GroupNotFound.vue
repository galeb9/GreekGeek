<template>
    <div class="groups--not-found">
      <div class="main">
        <p>No arenas</p>
        <img src="@/assets/icons/colosseum.png" alt="">
        <p>Start an arena & add members</p>
        <font-awesome-icon class="arrow-down__icon" :icon="['fa', 'arrow-down-long']"/>
      </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
    .groups--not-found{
      color: black ;
      width: 100%;
      .main{
        max-width: 65%;
        margin: 0 auto;
        text-align: center;        
        img {
          // border: 1px solid;
        }
        .arrow-down__icon{
          font-size: 2rem;
          margin-top: 2rem;
        }
      }
      
    }
</style>