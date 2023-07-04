<template>
  <div
    class="user-card"
    tabindex="0"
    @click="$emit('getFriendData', this.name, this.img, this.goal)"
  >
    <img class="user-card__img" :src="getImgUrl(userImg)" alt="profile image" />
    <div class="user-card__info">
      <p class="user-card__name">{{ name }}</p>
      <!-- <button class="user-card__add-btn">
        <font-awesome-icon class="fa-eye" :icon="['fa', 'eye']" />
      </button> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: { type: String, default: "user" },
    userImg: { type: String, default: "greek-geek.png" },
    goal: { type: Number, default: 100 },
  },
  data() {
    return {
      popupVisible: false,
      username: null,
      img: null,
    };
  },
  methods: {
    getImgUrl(pic) {
      return require("@/assets/img/avatars/" + pic);
    },
  },
  created() {
    this.username = this.name;
    this.img = this.userImg;
  },
};
</script>

<style lang="scss">
.user-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  max-height: 100px;
  padding: 1rem;
  margin: 0 15px 0 5px;
  border-radius: var(--radius);
  box-shadow: var(--boxShadow);
  cursor: pointer;
  &:hover {
    background: var(--complementary);
    color: white;
    transition: 0.2s ease-in;
  }
  &__img {
    max-width: 100%;
    width: 3.5rem;
    border-radius: 50%;
  }
  &__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    width: 100%;
    .user-card__name {
      font-weight: 600;
      letter-spacing: 1px;
      max-width: 30vw; // need to adjust is so it cannot have long name
    }
    .user-card__add-btn {
      width: 50px;
      height: 50px;
      align-self: center;
      background: transparent;
      border: none;
      font-size: 1.5rem;
      border-radius: 5px;
      .fa-eye {
        // color: $bg;
        width: 1.3rem;
      }
    }
  }
}
@media only screen and (max-width: 540px) {
  .user-card {
    width: 100%;
    min-width: 240px;
  }
}
</style>
