<template>
  <div class="select-commit-button">
    <button class="selector" @click.prevent="toggleSelection">
      <slot />
    </button>
    <commits-selection :is-selecting="isSelecting"/>
  </div>
</template>

<script>
import CommitsSelection from '~/components/CommitsSelection';

export default {
  components: {
    CommitsSelection
  },
  data() {
    return {isSelecting: false};
  },
  methods: {
    toggleSelection() {
      this.isSelecting = !this.isSelecting;
    }
  }
};
</script>

<style scoped>
.selector {
  border-radius: var(--border-radius-l);
  border: 1px solid var(--color-primary);
  cursor: pointer;
  font-size: 14px;
  padding: var(--spacing);
  padding-right: calc(var(--spacing) * 3);
  position: relative;
}

.selector::after {
  border-color: #007bff transparent transparent transparent;
  border-style: solid;
  border-width: 6.1px 3.5px 0 3.5px;
  content: " ";
  height: 0;
  position: absolute;
  right: calc(var(--spacing));
  top: calc(50% - 3px);
  width: 0;
}

.select-commit-button {
  display: inline-block;
  position: relative;
}
</style>
