<template>
  <div class="base-dropdown container--box">
    <div 
      @click="toggleDropdown()" class="base-dropdown__header" 
      :style="{ borderRadius: isDown ? '10px 10px 2px 2px' : '10px'}"
    >
      <h2 class="base-dropdown__header-heading">{{ title }}</h2>
      <font-awesome-icon
        :class="['icon-item', { rotate: isDown }]"
        :icon="['fa', 'chevron-right']"
      />
    </div>

    <Transition name="move-in-top">
      <div v-show="isDown" class="base-dropdown__body">
        <slot></slot>
      </div>
    </Transition>
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
    -webkit-tap-highlight-color: transparent; 
    padding: 12px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    border-radius: 10px;
    box-shadow: var(--shadowSmall);
    transition: all 0.2s ease-in;

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
    padding: 18px 20px;
    margin-top: 10px;
    border-radius: 2px 2px 10px 10px;
    box-shadow: var(--shadowSmall);

  }
}
</style>
