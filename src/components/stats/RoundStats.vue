<template>
    <div class="stats-item">
        <transition name="fade-in" mode="out-in">
            <div class="stats-item__round " :style="{ width: size + 'px', height: size + 'px'}">
                <Loader v-if="!amount && !goal" type="normal" /> 
                <div class="stats-item__goal-done" v-else-if="amount > goal">
                    <p class="goal-achived">+ {{ this.amount - this.goal  }} </p>
                    <font-awesome-icon class="fa-icon" :icon="['fa', 'check']" />
                </div>
                 <div class="stats-info" @click="togglePercent" v-else>
                    <h3>Goal</h3>
                    <p v-if="percentVisible" class="stats-info__percentages">{{ Math.floor(amount / goal * 100) + " %" }} </p>
                    <p v-else class="stats-info__comparison">{{ count }} / {{ goal }} </p>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>

export default {
    props:{
        amount: { type: Number, default: 0 },
        goal: { type: Number, default: 0 },
        surplus: { type: Number, default: 0 },
		count: { type: Number, default: 0},
        size: { type: Number, default: 180 }
    },
    data(){
        return {
            percentVisible: false,
        }
    },
    computed: {
        ourSurplus() {
            return  this.amount - this.goal 
        } 
    },
    methods: {
        togglePercent () {
            this.percentVisible = !this.percentVisible
        }
    }
}
</script>

<style lang="scss">


.stats-item__round {
    background: $bg;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: black;
    font-weight: 900 ;
    margin: 10px;
    h3 {
        border-bottom: 2px solid var(--complementary);
        margin-bottom: 10px;
        padding-bottom: 5px;
        margin-left: .1rem;
        text-transform: uppercase;
        font-weight: 900;
    }
    p {
        width: 100%;
        padding-left: 5px;
    }
    .goal-achived {
        padding: 0 5px 0 0;
        color: $success;
        font-size: 20px;
        border-bottom: 2px solid var(--complementary);
        margin-bottom: 15px;
        padding-bottom: 10px;
    }
    .fa-icon {
        transform: scale(1.5);
        padding-left: 2px;
        color: $success;
    }
}
</style>