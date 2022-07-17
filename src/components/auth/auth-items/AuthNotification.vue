<template>
    <div :class="['notification__auth']">
        <p v-if="text" class="notification__text">{{ trimFirebaseError(text) }}</p>
    </div>
</template>

<script>
export default {
    name: "AuthNotification",
    props: {
        text: { type: String, default: ''}
    },
    data() {
        return {
            incorrectPasswordMessage: "Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).",
            incorrectEmailMessage: "Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found)."
        }
    },
    methods: {
        trimFirebaseError(str) {
            if(str === this.incorrectPasswordMessage) {
                return "The password is incorrect, please try again."
            } else if (str === this.incorrectEmailMessage) {
                return "Email is incorrect, Please try again."
            } else {
                if(str.split(":")[0] === "firebase") {
                    let firstFilter = str.split(":")[1]
                    return firstFilter.slice(0, firstFilter.indexOf(" ("))
                } else {
                    return str
                }
            }
     
        },
    }
}
</script>

<style lang="scss">
    @import '@/assets/scss/_variables.scss';

    .notification__auth {
        margin: 0.5rem 1rem 0 ;
        min-height: 40px;
        color: $error;
        .notification__text {
            font-weight: 700;
            animation: fade-in-top 0.3s ease-in ;
        }

        @keyframes fade-in-top {
            0% {
                opacity: 0;
                transform: translateY(-20%);
            }
            100% {              
                opacity: 1;
                transform: translateY(0);
            }
        }
    }
    .notification__auth--success {
        color: $success; 
    }
</style>