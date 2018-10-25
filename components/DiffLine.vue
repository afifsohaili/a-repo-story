<template>
  <div
    class="diff-line" :class="{addition, deletion}"
    v-html="line">
  </div>
</template>

<script>
export default {
  props: {
    addition: Boolean,
    deletion: Boolean,
    line: String
  }
};
</script>

<style scoped>
.addition {
  background: #e8f5e9;
}

.deletion {
  background: #ffebee;
}

.diff-line {
  font-family: monospace, monospace;
  font-size: 0.9rem;
  padding: 0.3rem;
}
</style>
