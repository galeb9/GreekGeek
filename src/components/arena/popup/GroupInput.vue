<template>
    <div class="group-input">
        <label for="arenaName" class="arena-name__label" >
            <img v-if="icon ==='arena' " src="@/assets/img/groups/arena.png" alt="">

        </label>
        <input 
            class="arena-name__input" 
            id="arenaName" 
            :type="type" 
            :placeholder="placeholder"
            :value="modelValue"
            @input="updateValue"
        >
    </div>
</template>

<script>
export default {
    props:{
        placeholder: { type: String, default: "Type here..." },
        modelValue: { type: String, default: "" },
        type: { type: String, default: "text" },
        icon: { type: String, default: "" },

    }, 
    methods: {
        updateValue(event){
            this.$emit("update:modelValue", event.target.value)
        }
    },
}
</script>

<style lang="scss">
@import  '@/assets/scss/_variables.scss';

    .group-input{
        display: flex;
        align-items: center;
        gap: 1rem;
        background: white;
        border-radius: 8px;
        padding: .1rem;


        .arena-name__label{
            padding: 0 .5rem;
        }
        .arena-name__input{
            background: transparent;
            border: none;
            font-size: 20px;
            outline: none;
        }
    }
</style>