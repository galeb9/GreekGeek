<template>
  <div class="welcome-container">
    <div class="welcome__item">
      <div class="img-container">
        <img
          class="welcome__img"
          :src="getImgUrl(avatarImg)"
          alt="avatar-img"
        />
        <!-- <div :class="['dot', { 'online' : isLoggedIn }]"></div> -->
      </div>
      <div class="welcome__greet">
        <h3>Hello {{ username || "" }} 🌿</h3>
        <h2>Welcome Back!</h2>
      </div>
    </div>
  </div>
</template>

<script>
// import { auth } from "@/scripts/firebaseInit.js";
import { useMainStore } from "@/scripts/stores/parent-pinia";
import { mapState } from "pinia";

export default {
  name: "TheWelcome",
  components: {},
  data() {
    return {
      isLoggedIn: false,
    };
  },
  computed: {
    ...mapState(useMainStore, ["username", "avatarImg"]),
  },
  methods: {
    getImgUrl(pic) {
      return require("@/assets/img/avatars/" + pic);
    },
  },
  // created() {
  // if (auth.currentUser) this.isLoggedIn = true;
  // },
};
</script>

<style lang="scss">
.welcome-container {
  margin-top: 2rem;
  padding-bottom: 1rem;
  border-bottom: 8px double var(--complementary);
  .welcome__item {
    display: flex;
    gap: 1.5rem;
    .img-container {
      position: relative;
      .welcome__img {
        max-width: 100%;
        width: 6rem;
        border-radius: 5px;
      }
      // .dot {
      //   width: 15px;
      //   height: 15px;
      //   position: absolute;
      //   bottom: 3px;
      //   right: -3px;
      //   transform: rotate(45deg);
      // }
      // .online {
      //   background: rgb(48, 199, 43);
      //   animation: rotate 10s infinite alternate ease-in-out;
      // }
    }
    .welcome__greet {
      margin-top: 1rem;
      h2 {
        margin: 0.2rem 0;
      }
    }
  }
}

// @keyframes rotate {
//   from {
//     transform: rotate(45deg);
//   }
//   to {
//     transform: rotate(410deg);
//   }
// }
</style>
