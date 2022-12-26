<template>
  <div class="auth__input">
    <div class="input-field">
        <label :for="name">{{ label }}</label>
        <input 
            :class="inputClasses"  
            :type="type" 
            :id="name"

            @input="updateValue"
            :value="modelValue"
        >
    </div>
  </div>
</template>

<script>
export default {
    name: "AuthInput",
    props: {
        name : { type: String, default: "label"},
        type: { type: String, default: "text" },

        modelValue: { type: String, default: "" },
    },
    data() {
        return {
            label: null
        }
    },
    computed: {
        inputClasses() {
            return [
                'input--' + this.name,
                {'input-field__not-password': this.type !== 'password' },
                {'input-field__password': this.type == 'password' },
            ]
        }
    },
    methods: {
        updateValue(event){
            this.$emit("update:modelValue", event.target.value)
        },
        capitalizeFirstChar(str) {
            const firstChar = str[0].toUpperCase()
            const rest = str.toLowerCase().slice(1, str.length)
            return firstChar + rest
        }
    },
    created() {
        this.label = this.capitalizeFirstChar(this.name)
    }

}
</script>

<style lang="scss">

    .auth__input {
        .input-field{
            display: flex;
            flex-direction: column;
            margin-top: 1rem;
            label{
                font-weight: 700;
                font-size: 1rem;
                letter-spacing: 1px;
                transform: translate(15px, 16px);
                background: $bg;
                width: max-content;
                padding: 0 10px;
            }
            .input-field__not-password,
            .input-field__password {
                border: none;
                background: transparent;
                border: 2px solid var(--complementary);
                border-radius: 10px;
                margin-top: .3rem;
                padding: 1rem;
                outline: none;
                transition: all 0.3s ease-in;
            }
            .input-field__container {
                display: flex;
                align-items: center;
                border: none;
                border: 2px solid var(--complementary);
                border-radius: 10px;
                background: transparent;
                margin-top: .3rem;
                .input-field__password {
                    width: 100%;
                    border: none;
                    background: transparent;
                    border-right: 2px solid black;
                    padding: 1rem;
                    outline: none;
                    border-radius: 10px 0 0 10px;
                    transition: all 0.3s ease-in;
                }
                .fa-eye {
                    padding: 12.5px 13px;
                    border-radius:  0 5px 5px 0;
                    background: transparent;
                    color: black;
                    transition: all .2s ease-out;
                    cursor: pointer;
                    &:hover {
                        background: black;
                        color: white;
                    }

                }
                .active-fa-eye {
                    background: black;
                    color: white;
                }
            }
        }
    }
    
</style>