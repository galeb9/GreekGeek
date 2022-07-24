<template>
    <div class="stats-item">

        <div v-if="amount > goal" class="stats-item__round">
            <p class="goal-achived">+ {{ ourSurplus }} </p>
            <font-awesome-icon class="fa-icon" :icon="['fa', 'check']" />
            <transition name="fade-in" mode="out-in">
                <Loader v-if="loadActive" type="normal" /> 
            </transition>
        </div>

        <div v-else class="stats-item__round">
            <div class="stats-info">
                <h3>Goal</h3>
                <p>{{ amount }} / {{ goal }} </p>
            </div>
        </div>
        <transition name="fade-in" mode="out-in">
            <Loader v-if="loadActive" type="normal" /> 
        </transition>

    </div>
</template>

<script>
import Loader from '@/components/UI/LoaderThingy.vue'

export default {
    components: {
        Loader
    },
    props:{
        amount: { type: Number, default: 0 },
        goal: { type: Number, default: 0 },
        surplus: { type: Number, default: 0 }
    },
    data(){
        return {
            loadActive: true,
            ourSurplus: 0
        }
    },
    created() {
        setTimeout(() => this.loadActive = false, 1000)
        setTimeout(() =>  this.ourSurplus = this.amount - this.goal ,400)
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';
.stats-item__round{
    width: 200px;
    height: 200px;
    border: 1rem solid $secondary;
    border: $secondary double 10px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    //margin: 3rem ;
    color: black;
    font-weight: 900 ;
    h3{
        border-bottom: 2px solid $secondary;
        width: 100px;
        margin-bottom: 10px;
        padding-bottom: 5px;
        margin-left: .1rem;
        text-transform: uppercase;
        font-weight: 900;
    }
    p{
        width: 100%;
        padding-left: 5px;
    }
    .goal-achived{
        padding: 0 5px 0 0;
        color: $success;
        font-size: 20px;
        border-bottom: 2px solid $secondary;
        width: 70px;
        margin-bottom: 15px;
        padding-bottom: 10px;
    }
    .fa-icon{
        transform: scale(1.5);
        padding-left: 2px;
        color: $success;
    }
}
</style>