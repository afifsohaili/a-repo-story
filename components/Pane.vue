<template>
  <div class="pane">
    <slot />
  </div>
</template>

<script>
export default {
};
</script>

<style scoped>
.pane {
  padding: 1rem;
  flex: 50% 1 1;
}

.pane:not(:first-child) {
  border-left: 5px solid #ebebeb;
}

.pane:first-child:last-child {
}
</style>
