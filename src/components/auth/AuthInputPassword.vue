<template>
    <div class="input-field">
        <label for="password">{{ text }}</label>
        <div class="input-field__container input--password">
            <!-- put v-model="password" onto Component-->
            <input 
                class="input-field__password password" 
                type="password" 
                id="password" 
                @input="updateValue"
                :value="modelValue"
            >
            <font-awesome-icon 
                @click="changeInputType()" 
                class="fa-eye" 
                :icon="['fa', 'eye']"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: "AuthInputPassword",
    props: {
        modelValue: { type: String, default: "" },
        text: { type: String, default: "Password" },
    },
    methods: {
        updateValue(event){
            this.$emit("update:modelValue", event.target.value)
        },
        changeInputType() {
            const passwords = document.querySelectorAll(".password")
            document.querySelector(".fa-eye").classList.toggle("active-fa-eye")

            for(let i = 0; i < passwords.length; i++) {
                let password = passwords[i]
                if(password.getAttribute("type") === "password") {
                    password.setAttribute("type", "text")
                }else {
                    password.setAttribute("type", "password")
                }
            }
        },
    }
}
</script>

<style lang="scss">


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
    .input-field__password-confirm{
        border: none;
        background: transparent;
        border: 2px solid $secondary;
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
        border: 2px solid $secondary;
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
            padding: 17px 15px;
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
</style>