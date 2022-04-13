<template>
    <input 
        class="input-item"
        :type="inputType" 
        :placeholder="placeholder"
        :value="modelValue"
        @input="updateValue"
    >
</template>

<script>
export default {   
    props:{
        placeholder: {
            type: String,
            default: "Type here..."
        },
        modelValue: {
            type: String,
            default: ""
        },
        inputType: {
            type: String,
            default: "text"
        }
    }, 
    methods: {
        updateValue(event){
            this.$emit("update:modelValue", event.target.value)
        }
    },

}
</script>

<style lang="scss">
@import  '../../assets/scss/_variables.scss';
    .input-item{
        input{
            outline: none;
            padding: .8rem 1rem;
            border: none;
            color: white;
            border-radius: $radius;
            background: transparent;
            &::placeholder{
                color: white;
            }
            &[type=text]{
                border: 2px solid $secondary;
                text-align: center;
            }
            &[type=number]{
                width: max-content;
                margin: auto;
                margin-top: 2rem;
                text-align: center;
                border: 2px solid $secondary;

            }
        }
    }
</style>