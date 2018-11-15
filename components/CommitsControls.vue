<template>
  <div class="wrapper">
    <div class="control-center">
      <span class="rev-1" v-if="rev1 && rev1.length">
        {{rev1 | getLastElevenChars}}
      </span>
      <span class="rev-2" v-if="rev2 && rev2.length">
        {{rev2 | getLastElevenChars}}
      </span>
      <div class="controls"></div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    rev1() {
      return this.$store.state.git.revision1;
    },
    rev2() {
      return this.$store.state.git.revision2;
    }
  },
  filters: {
    getLastElevenChars(string) {
      return string.substring(0, 11);
    }
  }
};
</script>

<style scoped>
.wrapper {
  background: var(--color-white);
  border-top: 1px solid var(--color-light-gray-2);
  bottom: 0;
  padding: var(--spacing);
  position: fixed;
  z-index: 500;
  width: 100%;
}

.control-center {
  margin: 0 auto;
  text-align: center;
  width: 43%;
}
</style>
