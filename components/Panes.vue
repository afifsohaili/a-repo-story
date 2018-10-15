<template>
  <div v-if="shouldRenderPanes" class="panes">
    <slot/>
  </div>
</template>

<script>
export default {
  computed: {
    shouldRenderPanes() {
      return this.$slots.default.every(slot => {
        return slot.componentOptions && slot.componentOptions.tag === 'pane';
      });
    }
  }
};
</script>

<style scoped>
.panes {
  display: flex;
}
</style>
