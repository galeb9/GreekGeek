<template>
  <div class="base-dropdown container--box">
    <div @click="toggleDropdown()" class="base-dropdown__header">
      <h2 class="base-dropdown__header-heading">{{ title }}</h2>
      <font-awesome-icon
        :class="['icon-item', { rotate: isDown }]"
        :icon="['fa', 'chevron-right']"
      />
    </div>
    <div v-show="isDown" class="base-dropdown__body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseDropdown",
  props: {
    title: { type: String, default: "" },
  },
  data() {
    return {
      isDown: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.isDown = !this.isDown;
    },
  },
};
</script>

<style lang="scss">
.base-dropdown {
  .base-dropdown__header {
    padding: 14px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    .base-dropdown__header-heading {
      font-size: 1.1em;
    }
    .icon-item {
      transition: transform 0.2s ease-out;
      font-size: 14px;
      transform: rotate(0deg);
    }
    .rotate {
      transform: rotate(90deg);
    }
  }
  .base-dropdown__body {
    padding: 14px 16px;
    border-top: 1px solid $lightGrey;
  }
}
</style>
