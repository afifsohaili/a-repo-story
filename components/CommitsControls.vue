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
          class="previous-commit"
          @click.prevent="goToPreviousCommit">
          &lt;
        </button>
        <button
          :disabled="hasNoNextCommit"
          class="next-commit"
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
    previousCommit() {
      const {revision1, revision2, commits} = this.$store.state.git;
      const newRevision = getPreviousCommit(revision1, revision2, commits);
      return newRevision && newRevision.hash;
    },
    nextCommit() {
      const {revision1, revision2, commits} = this.$store.state.git;
      const newRevision = getNextCommit(revision1, revision2, commits);
      return newRevision && newRevision.hash;
    },
    hasNoPreviousCommit() {
      return !this.previousCommit;
    },
    hasNoNextCommit() {
      return !this.nextCommit;
    }
  },
  filters: {
    getLastElevenChars(string) {
      return string.substring(0, 11);
    }
  },
  methods: {
    goToPreviousCommit() {
      const newRevision = this.previousCommit;
      if (this.rev2 === undefined) {
        return this.$store.commit('git/setSingleRevision', newRevision);
      }
      return this.$store.commit('git/setMultiRevision', newRevision);
    },
    goToNextCommit() {
      const newRevision = this.nextCommit;
      if (this.rev2 === undefined || newRevision === this.rev1) {
        return this.$store.commit('git/setSingleRevision', newRevision);
      }
      return this.$store.commit('git/setMultiRevision', newRevision);
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

.controls {
  padding-top: var(--spacing);
}

.previous-commit,
.next-commit {
  --width: 40px;

  background: var(--color-white);
  border-radius: var(--width);
  border: 1px solid var(--color-blue-7);
  color: var(--color-blue-7);
  cursor: pointer;
  font-weight: bold;
  height: var(--width);
  width: var(--width);
}

.previous-commit {
  margin-right: var(--spacing);
}

.previous-commit:hover,
.next-commit:hover {
  background: var(--color-blue-6);
  color: var(--color-white);
}

.previous-commit:disabled,
.next-commit:disabled {
  background: var(--color-light-gray-2);
}
</style>
