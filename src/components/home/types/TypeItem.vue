<template>
  <div class="type-item">
    <img :src="require('@/assets/img/pushups/' + img)" alt="pushup variation" />
    <h3>{{ name }}</h3>
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      default: "wide.png",
    },
    name: {
      type: String,
      default: "Type",
    },
  },
};
</script>

<style lang="scss">
.type-item {
  height: 110px;
  display: flex;
  color: white;
  align-items: center;
  padding: 0 0.8rem;
  margin: 25px 8px;
  background: rgba(82, 75, 75, 0.4);
  border-radius: $radius;
  box-shadow: var(--boxShadow);
  img {
    width: 110px;
  }
  h3 {
    margin-left: 10px;
  }
}
</style>
