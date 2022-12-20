<template>
  <div class="killstreak">
      <div class="circle">
        <p class="streak">{{ streak }}</p>
        <div class="icon">
            <font-awesome-icon class="fa-icon" :icon="['fa', 'fire-flame-curved']" />
        </div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            streak: 5
        }
    }
}
</script>

<style lang="scss">

    .killstreak{
        height: 150px;
        background: $dark;
        border-radius: $radius;
        display: flex;
        justify-content: center;
        align-items: center;
        .circle{
            width: 100px;
            height: 100px;
            border-radius: 50%;
            border: 5px solid $purple;
            border-bottom: 5px solid transparent;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            .streak{
                margin-top: 10px;
                font-size: 1.2rem;
                font-weight: 700;
            }
            .icon{
                transform: translateY(20px);
                .fa-icon{
                    transform: scale(2.5);
                    color: $purple;
                    padding-bottom: .8em;
                }
            }

        }
    }
</style>