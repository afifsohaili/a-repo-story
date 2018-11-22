<template>
  <div class="wrapper">
    <div class="control-center">
      <span class="rev-1" v-if="rev1 && rev1.length">
        {{rev1 | getLastElevenChars}}
      </span>
      <span class="rev-2" v-if="rev2 && rev2.length">
        {{rev2 | getLastElevenChars}}
      </span>
      <div class="controls">
        <button
          :disabled="hasNoPreviousCommit"
          @click.prevent="goToPreviousCommit">
          &lt;
        </button>
        <button
          :disabled="hasNoNextCommit"
          @click.prevent="goToNextCommit">
          &gt;
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {getNextCommit, getPreviousCommit} from '~/src/git/traverse-commits';

export default {
  computed: {
    rev1() {
      return this.$store.state.git.revision1;
    },
    rev2() {
      return this.$store.state.git.revision2;
    },
    hasNoPreviousCommit() {
      const {revision1, revision2, commits} = this.$store.state.git;
      if (revision1 && !revision2) {
        const indexRevision1 = commits.findIndex(({hash}) => hash === revision1);
        return !commits[indexRevision1 + 1];
      }
    },
    hasNoNextCommit() {
      const {revision1, revision2, commits} = this.$store.state.git;
      if (revision1 && !revision2) {
        const indexRevision1 = commits.findIndex(({hash}) => hash === revision1);
        return !commits[indexRevision1 - 1];
      }
    }
  },
  filters: {
    getLastElevenChars(string) {
      return string.substring(0, 11);
    }
  },
  methods: {
    goToPreviousCommit() {
      const {revision1, commits} = this.$store.state.git;
      const newRevision = getPreviousCommit(revision1, null, commits);
      this.$store.commit('git/setSingleRevision', newRevision && newRevision.hash);
    },
    goToNextCommit() {
      const {revision1, commits} = this.$store.state.git;
      const newRevision = getNextCommit(revision1, null, commits);
      this.$store.commit('git/setSingleRevision', newRevision && newRevision.hash);
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
