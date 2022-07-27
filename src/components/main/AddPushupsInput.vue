<template>
    <div class="add-pushups__btn circle">
        <span class="circle__btn">
          <slot></slot>
        </span>
        <span class="circle__back-1"></span>
        <span class="circle__back-2"></span>
    </div>
</template>

<script>
export default {
  methods: {
    toggleAnimation(e) {

      // goes on <span class="circle__btn" @click="toggleAnimation">
      this.$emit('toggleAnimation')
      e.preventDefault();
      const playBtn = document.querySelector('.circle__btn');
      const wave1 = document.querySelector('.circle__back-1');
      const wave2 = document.querySelector('.circle__back-2');

      playBtn.classList.toggle('shadow');
      wave1.classList.toggle('paused');
      wave2.classList.toggle('paused');
    }
  }
}
</script>

<style lang="scss">
:root {
    --primary: #6d5dfc;

    
    --white: #FFFFFF;
    --greyLight-1: #E4EBF5;
    --greyLight-2: #c8d0e7;
    --greyDark: #9baacf;
  }
  
  $shadow: .3rem .3rem .6rem var(--greyLight-2), 
  -.2rem -.2rem .5rem var(--white);
  $inner-shadow: inset .2rem .2rem .5rem var(--greyLight-2), 
  inset -.2rem -.2rem .5rem var(--white);
  
  
//   .container {
//     min-height: 100vh;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     background: var(--greyLight-1);
//   }
  
  /*  PLAY BUTTON  */
  .circle {
    grid-column: 2 / 3;
    grid-row: 4 / 6;
    width: 12rem;
    height: 100%;
    justify-self: center;
    border-radius: 1rem;
    display: grid;
    grid-template-rows: 1fr;
    justify-items: center;
    align-items: center;
  
    &__btn {
      grid-row: 1 / 2;
      grid-column: 1 / 2;
      width: 9rem;
      height: 9rem;
      display: flex;
      margin: .6rem;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      font-size: 3.2rem;
      color: var(--primary);
      z-index: 300;
      background: var(--greyLight-1);
      box-shadow: $shadow;
      cursor: pointer;
      position: relative;
      &.shadow {box-shadow: $inner-shadow;}
  
      .play {
        position: absolute;
        opacity: 0;
        transition: all .2s linear;
        &.visibility {
          opacity: 1;
        }
      }
      .pause {
        position: absolute;
        transition: all .2s linear;
        &.visibility {
          opacity: 0;
        }
      }
    }
  
    &__back-1, &__back-2 {
      grid-row: 1 / 2;
      grid-column: 1 / 2;
      width: 9rem;
      height: 9rem;
      border-radius: 50%;
      filter: blur(1px);
      z-index: 100;
    }
  
    &__back-1 {
      box-shadow: .4rem .4rem .8rem var(--greyLight-2), 
      -.4rem -.4rem .8rem var(--white);
      background: linear-gradient(to bottom right, var(--greyLight-2) 0%, var(--white) 100%);
      animation: waves 4s linear infinite;
  
      &.paused { 
      animation-play-state: paused;
      }
    }
  
    &__back-2 {
      box-shadow: .4rem .4rem .8rem var(--greyLight-2), 
      -.4rem -.4rem .8rem var(--white);
      animation: waves 4s linear 2s infinite;
      
      &.paused { 
        animation-play-state: paused;
      }
    }
  }
  
  
  
  @keyframes waves {
    0% {
      transform: scale(1);
      opacity: 1;
    }
  
    50% {
      opacity: 1;
    }
  
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }
  

</style>