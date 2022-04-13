<template>
  <div class="bg">
    <div class="lines">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
// background gradient
// .bg{
//   position: fixed;
//   top: -50%;
//   left: -50%;
//   right: -50%;
//   bottom: -50%;
//   width: 200%;
//   background: transparent url('http://assets.iceable.com/img/noise-transparent.png') repeat 0 0;

//   background-repeat: repeat;
//   animation: bg-animation .2s infinite;
//   opacity: .9;
//   visibility: visible;
// }
// @keyframes bg-animation { 
//   0% { transform: translate(0,0) }
//   10% { transform: translate(-5%,-5%) }
//   20% { transform: translate(-10%,5%) }
//   30% { transform: translate(5%,-10%) }
//   40% { transform: translate(-5%,15%) }
//   50% { transform: translate(-10%,5%) }
//   60% { transform: translate(15%,0) }
//   70% { transform: translate(0,10%) }
//   80% { transform: translate(-15%,0) }
//   90% { transform: translate(10%,5%) }
//   100% { transform: translate(5%,0) }
// }
// bg lines
/*
.lines{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  margin: auto;
  width: 90vw;
}

  
.line{
  position: absolute;
  width: 1px;
  height: 100%;
  top: 0;
  left: 50%;
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;

  &::after{
    content: '';
    display: block;
    position: absolute;
    height: 15vh;
    width: 100%;
    top: -50%;
    left: 0;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, #ffffff 75%, #ffffff 100%);
    animation: drop 7s 0s infinite;
    animation-fill-mode: forwards;
    animation-timing-function: cubic-bezier(0.4, 0.26, 0, 0.97);
  }
  &:nth-child(1){
    margin-left: -25%;
    &::after{
      animation-delay: 2s;

    }
  }
  &:nth-child(3){
    margin-left: 25%;
    &::after{
      animation-delay: 2.5s;
    }
  }
}
    
@keyframes drop{
  0%{
    top: -50%
  }
  100%{
    top: 110%
  }
}
 */
</style>