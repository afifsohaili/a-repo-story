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
.diff-line /deep/ .addition {
  background: #c8e6c9;
  border-radius: 3px;
  min-width: 100%;
}

.diff-line /deep/ .deletion {
  background: #ffebee;
  border-radius: 3px;
}

.diff-line {
  font-family: 'Source Code Pro', monospace, sans-serif;
  padding: 0.3rem;
  white-space: nowrap;
}

.diff-line.addition {
  background: #e8f5e9;
}

.diff-line.deletion {
  background: #ffebee;
}
</style>
